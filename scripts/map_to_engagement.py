#!/usr/bin/env python3
"""
Maps raw Presage HR/RR data to engagement scores (0-100).

Mapping formula:
  - HR variability (HRV/RMSSD): moderate HRV → focused and engaged
  - RR regularity (low variance): regular breathing → calm and alert
  - Combined → normalized 0-100 engagement score
  - Thresholds: <50 disengaged, 50-70 low, 70-85 good, 85+ excellent

Usage:
    python map_to_engagement.py --input raw_presage.json --output src/data/presageData.json
    python map_to_engagement.py --input raw_presage.json --slides 6
"""

import argparse
import json
import math
import sys
import time

# Default slide durations (minutes) — matches the Neural Networks session in mockData
DEFAULT_SLIDE_DURATIONS = [8, 10, 12, 15, 10, 8]


def compute_hrv(hr_samples):
    """RMSSD-style HRV from successive HR sample differences."""
    if len(hr_samples) < 2:
        return 0.0
    diffs = [abs(hr_samples[i + 1] - hr_samples[i]) for i in range(len(hr_samples) - 1)]
    return math.sqrt(sum(d * d for d in diffs) / len(diffs))


def rr_regularity(rr_samples):
    """
    Breathing regularity score (0-1).
    Lower variance = more regular = calmer and more alert.
    """
    if len(rr_samples) < 2:
        return 0.5
    mean = sum(rr_samples) / len(rr_samples)
    variance = sum((x - mean) ** 2 for x in rr_samples) / len(rr_samples)
    std = math.sqrt(variance)
    # std=0 → 1.0 (very regular), std≥5 → 0.0 (irregular)
    return max(0.0, 1.0 - std / 5.0)


def hr_focus_score(hr_samples):
    """
    Focus indicator from HRV. Moderate HRV (5-10 RMSSD) → engaged.
    Returns 0-1.
    """
    hrv = compute_hrv(hr_samples)
    # Scale: RMSSD of 8+ = well-engaged; cap at 15
    return min(1.0, hrv / 8.0)


def compute_engagement(hr_slice, rr_slice, baseline_hr=None):
    """
    Combine HR variability and RR regularity into a 0-100 engagement score.

    Weights:
      50% — HR variability (focus indicator)
      40% — RR regularity (calm/alert indicator)
      10% — baseline constant (floor)
    Optional: slight boost if HR is modestly elevated above resting baseline
    """
    if not hr_slice and not rr_slice:
        return 70  # neutral fallback

    focus = hr_focus_score(hr_slice) if hr_slice else 0.5
    calm = rr_regularity(rr_slice) if rr_slice else 0.5

    # Small boost for elevated-but-not-anxious HR (active thinking signal)
    hr_boost = 0.0
    if hr_slice and baseline_hr:
        mean_hr = sum(hr_slice) / len(hr_slice)
        deviation = mean_hr - baseline_hr
        # +5 to +15 BPM above resting → slight positive; below resting → slight negative
        hr_boost = max(-0.08, min(0.12, deviation / 120.0))

    raw = (0.50 * focus) + (0.40 * calm) + 0.10 + hr_boost
    return int(max(10, min(100, raw * 100)))


def slice_samples(samples, start_frac, end_frac):
    """Extract samples by fractional position in the full array."""
    n = len(samples)
    return samples[int(n * start_frac) : int(n * end_frac)]


def engagement_label(score):
    if score < 50:
        return "DISENGAGED"
    if score < 70:
        return "LOW"
    if score < 85:
        return "GOOD"
    return "EXCELLENT"


def main():
    parser = argparse.ArgumentParser(
        description="Map Presage HR/RR data to engagement scores"
    )
    parser.add_argument(
        "--input",
        required=True,
        help="Raw Presage JSON file from presage_process.py",
    )
    parser.add_argument(
        "--output",
        default="src/data/presageData.json",
        help="Output engagement JSON (default: src/data/presageData.json)",
    )
    parser.add_argument(
        "--slides",
        type=int,
        default=6,
        help="Number of slides (default: 6)",
    )
    parser.add_argument(
        "--durations",
        nargs="+",
        type=int,
        help="Per-slide durations in minutes (default: 8 10 12 15 10 8)",
    )
    args = parser.parse_args()

    with open(args.input) as f:
        raw = json.load(f)

    hr_all = raw.get("hr", [])
    rr_all = raw.get("rr", [])

    if not hr_all and not rr_all:
        print("WARNING: No HR or RR data found in input — using neutral defaults", file=sys.stderr)

    slide_durations = (args.durations or DEFAULT_SLIDE_DURATIONS)[: args.slides]
    total_duration = sum(slide_durations)

    # Build per-slide fractional ranges
    slide_fractions = []
    cumulative = 0
    for d in slide_durations:
        start_f = cumulative / total_duration
        end_f = (cumulative + d) / total_duration
        slide_fractions.append((start_f, end_f))
        cumulative += d

    # Resting baseline from first ~10% of recording
    baseline_hr = None
    if hr_all:
        baseline_slice = hr_all[: max(1, len(hr_all) // 10)]
        baseline_hr = sum(baseline_slice) / len(baseline_slice)
        print(f"Baseline HR: {baseline_hr:.1f} BPM")

    # Per-slide engagement
    slide_engagement = []
    for i, (start_f, end_f) in enumerate(slide_fractions):
        hr_slice = slice_samples(hr_all, start_f, end_f)
        rr_slice = slice_samples(rr_all, start_f, end_f)
        eng = compute_engagement(hr_slice, rr_slice, baseline_hr)
        slide_engagement.append({"id": i + 1, "engagement": eng})

    # Build 2-minute resolution timeline (matches mockData EngagementPoint shape)
    timeline = []
    minute = 0
    for slide_idx, (start_f, end_f) in enumerate(slide_fractions):
        duration_min = slide_durations[slide_idx]
        num_points = max(1, duration_min // 2)
        for p in range(num_points):
            frac = start_f + (p / num_points) * (end_f - start_f)
            window = 0.03  # ±3% window around this point
            hr_slice = slice_samples(hr_all, max(0.0, frac - window), min(1.0, frac + window))
            rr_slice = slice_samples(rr_all, max(0.0, frac - window), min(1.0, frac + window))
            eng = compute_engagement(hr_slice, rr_slice, baseline_hr)
            timeline.append({"time": f"{minute}:00", "engagement": eng, "slide": slide_idx + 1})
            minute += 2

    output = {
        "source": "presage",
        "apiVersion": "1.4.2",
        "processedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "timeline": timeline,
        "slideEngagement": slide_engagement,
        "rawMetrics": {
            # Store first 50 samples only — raw biometrics are never surfaced to users
            "hr": hr_all[:50],
            "rr": rr_all[:50],
        },
    }

    with open(args.output, "w") as f:
        json.dump(output, f, indent=2)

    print(f"\nEngagement data written to: {args.output}")
    print(f"{'Slide':<8} {'Engagement':>10} {'Label':<12}")
    print("-" * 32)
    for s in slide_engagement:
        print(f"  S{s['id']:<6} {s['engagement']:>8}%   {engagement_label(s['engagement'])}")
    print(f"\nTimeline points: {len(timeline)}")


if __name__ == "__main__":
    main()
