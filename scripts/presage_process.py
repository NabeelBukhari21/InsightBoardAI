#!/usr/bin/env python3
"""
Presage video processor — extracts HR and RR from a video file using the Presage SDK.

Usage:
    python presage_process.py --video sample.mp4 --key $PRESAGE_API_KEY
    python presage_process.py --video sample.mp4 --output raw_presage.json

Prerequisites:
    pip install Presage-Technologies Presage-Physiology-Preprocessing
"""

import argparse
import json
import os
import sys
import time


def main():
    parser = argparse.ArgumentParser(description="Process video with Presage SDK")
    parser.add_argument("--video", required=True, help="Path to input video file")
    parser.add_argument(
        "--key",
        default=os.environ.get("PRESAGE_API_KEY"),
        help="Presage API key (or set PRESAGE_API_KEY env var)",
    )
    parser.add_argument(
        "--output",
        default="raw_presage.json",
        help="Output JSON file path (default: raw_presage.json)",
    )
    parser.add_argument(
        "--poll-interval",
        type=int,
        default=15,
        help="Polling interval in seconds (default: 15)",
    )
    parser.add_argument(
        "--timeout",
        type=int,
        default=600,
        help="Max wait time in seconds (default: 600)",
    )
    args = parser.parse_args()

    if not args.key:
        print(
            "ERROR: Presage API key required. Set PRESAGE_API_KEY env var or use --key",
            file=sys.stderr,
        )
        sys.exit(1)

    if not os.path.exists(args.video):
        print(f"ERROR: Video file not found: {args.video}", file=sys.stderr)
        sys.exit(1)

    try:
        from presage_technologies import queue_processing_hr_rr, retrieve_result
    except ImportError:
        print(
            "ERROR: Presage SDK not installed.\n"
            "Run: pip install Presage-Technologies Presage-Physiology-Preprocessing",
            file=sys.stderr,
        )
        sys.exit(1)

    print(f"Submitting video for processing: {args.video}")
    video_id = queue_processing_hr_rr(args.video, api_key=args.key)
    print(f"Video queued. Processing ID: {video_id}")

    # Poll for completion
    result = None
    elapsed = 0
    while elapsed < args.timeout:
        print(f"  Polling for result... ({elapsed}s elapsed)")
        result = retrieve_result(video_id, api_key=args.key)
        if result and result.get("status") == "complete":
            print("  Processing complete.")
            break
        if result and result.get("status") == "error":
            print(f"ERROR: Presage processing failed: {result.get('message')}", file=sys.stderr)
            sys.exit(1)
        time.sleep(args.poll_interval)
        elapsed += args.poll_interval

    if not result or result.get("status") != "complete":
        print("ERROR: Processing timed out", file=sys.stderr)
        sys.exit(1)

    output = {
        "video_id": video_id,
        "video_path": args.video,
        "status": "complete",
        "hr": result.get("heart_rate", []),
        "rr": result.get("breathing_rate", []),
        "duration_seconds": result.get("duration_seconds"),
        "sample_rate_hz": result.get("sample_rate_hz"),
        "processed_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }

    with open(args.output, "w") as f:
        json.dump(output, f, indent=2)

    hr_count = len(output["hr"])
    rr_count = len(output["rr"])
    print(f"\nOutput saved to: {args.output}")
    print(f"  HR samples: {hr_count}")
    print(f"  RR samples: {rr_count}")
    print(f"  Duration:   {output['duration_seconds']}s")


if __name__ == "__main__":
    main()
