#!/usr/bin/env bash
# process_videos.sh — End-to-end Presage pipeline
#
# Usage:
#   ./scripts/process_videos.sh [VIDEO_DIR]
#   VIDEO_DIR defaults to ./videos
#
# Each video file in VIDEO_DIR = one slide's footage (sorted alphabetically).
# Outputs: src/data/presageData.json
#
# Prerequisites:
#   export PRESAGE_API_KEY=your_key_here
#   pip install Presage-Technologies Presage-Physiology-Preprocessing

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

VIDEO_DIR="${1:-$ROOT_DIR/videos}"
OUTPUT="$ROOT_DIR/src/data/presageData.json"
TMP_DIR="$(mktemp -d)"
PYTHON="${PYTHON:-python3}"

cleanup() {
    rm -rf "$TMP_DIR"
}
trap cleanup EXIT

echo "==================================================="
echo "  Presage Processing Pipeline — InsightBoard AI"
echo "==================================================="
echo "  Video directory : $VIDEO_DIR"
echo "  Output          : $OUTPUT"
echo ""

# Validate prerequisites
if [ -z "${PRESAGE_API_KEY:-}" ]; then
    echo "ERROR: PRESAGE_API_KEY is not set."
    echo "  Run: export PRESAGE_API_KEY=your_key_here"
    exit 1
fi

if ! command -v "$PYTHON" &>/dev/null; then
    echo "ERROR: Python not found at '$PYTHON'. Set PYTHON= or install python3."
    exit 1
fi

if [ ! -d "$VIDEO_DIR" ]; then
    echo "ERROR: Video directory not found: $VIDEO_DIR"
    echo "  Create the directory and add video clips (one per slide, sorted by name)."
    exit 1
fi

# Collect video files
mapfile -t VIDEO_FILES < <(find "$VIDEO_DIR" -maxdepth 1 \( -name "*.mp4" -o -name "*.mov" -o -name "*.avi" \) | sort)

if [ ${#VIDEO_FILES[@]} -eq 0 ]; then
    echo "ERROR: No video files (*.mp4, *.mov, *.avi) found in: $VIDEO_DIR"
    exit 1
fi

echo "Found ${#VIDEO_FILES[@]} video file(s):"
for f in "${VIDEO_FILES[@]}"; do
    echo "  - $(basename "$f")"
done
echo ""

# Step 1: Process each video through Presage
SLIDE=1
for VIDEO in "${VIDEO_FILES[@]}"; do
    echo "--- Slide $SLIDE: $(basename "$VIDEO") ---"
    RAW_OUT="$TMP_DIR/slide_${SLIDE}_raw.json"

    "$PYTHON" "$SCRIPT_DIR/presage_process.py" \
        --video "$VIDEO" \
        --key "$PRESAGE_API_KEY" \
        --output "$RAW_OUT"

    echo "  Raw output: $RAW_OUT"
    SLIDE=$((SLIDE + 1))
done

echo ""
echo "--- Combining raw outputs ---"

# Step 2: Merge all per-slide raw JSON files
COMBINED_RAW="$TMP_DIR/combined_raw.json"
"$PYTHON" - "$TMP_DIR" "$COMBINED_RAW" <<'PYEOF'
import json, glob, sys, os, time

tmp_dir = sys.argv[1]
out_path = sys.argv[2]

raw_files = sorted(glob.glob(os.path.join(tmp_dir, "slide_*_raw.json")))
if not raw_files:
    print("ERROR: No raw slide files found", file=sys.stderr)
    sys.exit(1)

combined_hr = []
combined_rr = []
for path in raw_files:
    with open(path) as f:
        data = json.load(f)
    combined_hr.extend(data.get("hr", []))
    combined_rr.extend(data.get("rr", []))

output = {
    "video_id": "combined",
    "video_path": "multiple",
    "status": "complete",
    "hr": combined_hr,
    "rr": combined_rr,
    "processed_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
}
with open(out_path, "w") as f:
    json.dump(output, f, indent=2)

print(f"  Combined: {len(combined_hr)} HR samples, {len(combined_rr)} RR samples")
PYEOF

# Step 3: Map physiological data to engagement scores
echo ""
echo "--- Mapping to engagement scores ---"

"$PYTHON" "$SCRIPT_DIR/map_to_engagement.py" \
    --input "$COMBINED_RAW" \
    --output "$OUTPUT" \
    --slides "${#VIDEO_FILES[@]}"

echo ""
echo "==================================================="
echo "  Done! Results: $OUTPUT"
echo "  Start Next.js and open /teacher to verify."
echo "==================================================="
