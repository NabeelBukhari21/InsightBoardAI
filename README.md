# InsightBoard AI

**Privacy-first classroom learning copilot** — detect confusion, help students learn, help teachers teach.

Built for the **Google Antigravity Hackathon**.

---

## What It Does

InsightBoard AI closes the feedback loop between student engagement and teaching:

1. **Detect** — Real-time engagement analysis spots when students disengage (Presage)
2. **Map** — Dips are mapped to the specific slide and topic causing confusion
3. **Reflect** — Students are asked why they disengaged (not assumed)
4. **Recap** — AI generates a personalized simpler explanation + review questions (Gemini)
5. **Improve** — Teachers receive aggregated class-level insights and teaching suggestions
6. **Remember** — Recurring patterns are tracked across sessions (Backboard)
7. **Verify** — Every data access is logged with tamper-evident proofs (Solana)

---

## Category Mapping

| Technology | Role | What It Does |
|---|---|---|
| **Google Antigravity** | Hackathon Track | Competition framework |
| **Gemini API** | Content Intelligence | AI recaps, simpler explanations, worked examples, quiz generation, teaching recommendations |
| **Presage** | Engagement Detection | On-device real-time engagement analysis from camera feeds — raw media never stored |
| **Backboard** | Session Memory | Persistent cross-session memory — recurring confusion patterns, intervention tracking |
| **Solana** | Audit Verification | Tamper-evident hash proofs for data access, consent receipts, deletion confirmations (hashes only, no content on-chain) |

---

## Architecture

```
Student Device (Presage)
    ↓ engagement scores (raw media deleted immediately)
API Server (encrypted, AES-256)
    ↓ dip detection + student reflections
Gemini API
    ↓ personalized recap (student-private) + aggregated insights (teacher)
Backboard
    ↓ cross-session pattern memory
Solana
    ↓ audit proofs (SHA-256 hashes only)
```

**Privacy boundaries:**
- Teachers **only** see aggregated, anonymized class-level data
- Students **own** their data — view, export, or delete any time
- Raw media is **deleted immediately** after on-device processing
- Every access is **logged** with tamper-evident verification

---

## Features

### Teacher Dashboard (`/teacher`)
- Classroom engagement overview with 4 summary stats
- Slide-by-slide engagement chart with Slide 4 dip highlighted
- Aggregated student feedback reasons
- Zone-based engagement heatmap
- AI teaching recommendations (Gemini-powered)
- Post-Slide-4 behavioral shift analysis
- Top weak topic and best intervention cards

### Student Dashboard (`/student`)
- Personal engagement timeline
- Focus moments and drop-off highlights
- Topic-by-topic breakdown
- 3-step reflection flow with reason selection
- AI recap with simpler explanation
- Worked example card
- Interactive mini quiz (3 questions, no grades)
- Personal study advice and learning pattern insights

### Session Timeline (`/session`)
- 6-slide interactive timeline with engagement and confusion bars
- Engagement curve with dip zone and threshold
- 5-beat story card (narrative of the session)
- Detailed slide panel with transcript, metrics, and recommendations

### Memory Insights (`/memory`)
- Recurring confusion topics with cross-session trend indicators
- Disengagement windows analysis
- Cross-session trend charts (engagement vs. confusion, support needs)
- Class-wide and student-level pattern examples
- Teaching format analysis (best vs. weakest formats)
- Memory timeline: how the system learned across sessions
- Multi-agent insight convergence (Presage + Gemini + Backboard)

### Privacy & Audit (`/privacy`)
- 6 privacy-by-design principles
- Data flow lifecycle (6 stages with retention policies)
- Minimal retention policy for 6 data types
- 5-layer consent architecture
- Encrypted off-chain storage diagram
- Solana audit proofs with verified entries
- Tamper-evident access log with chained hashes

### Landing Page (`/`)
- One-line pitch with 5-step workflow
- Teacher and student value cards
- Technology category mapping
- Demo scenario walkthrough
- Privacy trust section
- Navigation to all dashboards

---

## Demo Scenario

> **Session 5 — Neural Networks Deep Dive** (21 students, 6 slides)

1. Session opens with **87% engagement**
2. **Slide 4** (Backpropagation Math) hits — engagement crashes to **45%**, confusion spikes to **62%**
3. **43% of students** report "too fast" and "unclear example"
4. Gemini generates a **personalized recap** with simpler explanation, worked example, and 3 review questions — **private to each student**
5. Teacher receives **aggregated insight**: theory-heavy content → 35% avg engagement drop. Suggestion: add visual scaffolding
6. **Backboard memory** flags this as the **3rd occurrence** of this pattern — projects **48%+ drop next session** without change

**The entire intelligence loop runs in under 60 seconds.**

---

## Pitch Bullets

- **"Detect confusion. Help students learn. Help teachers teach."**
- Privacy-first: raw media never stored, teachers never see individual data
- Reflection-driven: students validate AI detections, not the other way around
- Persistent memory: the system learns and improves across sessions
- Explainable: every insight shows its source data, confidence, and reasoning
- On-chain audit: tamper-evident proofs for every data access — verifiable by anyone
- No grades, no discipline, no ranking — learning support only

---

## Setup

### Prerequisites
- Node.js 18+
- npm

### Install & Run

```bash
git clone https://github.com/NabeelBukhari21/LegendaryIdea.git
cd LegendaryIdea
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Design**: Glassmorphism, dark theme, custom animations

---

## Integration Status

| Integration | Status | Notes |
|---|---|---|
| **Gemini API** | Done | Student recap, teacher recommendations, worked examples, quiz generation |
| **Presage** | Done | Full physiological signal pipeline — HR/RR → engagement scores → live charts |
| **Backboard** | Pending | Cross-session memory and multi-agent orchestration |
| **Solana** | Pending | Tamper-evident audit proofs on Privacy page |

---

## Presage Integration (completed this session)

Presage is now wired in end-to-end as the real engagement signal source.

### What was built

**Python pipeline (`scripts/`)**

| Script | Purpose |
|---|---|
| `presage_process.py` | Calls the Presage SDK to extract HR and RR data from a classroom video file. Outputs raw biometric JSON. |
| `map_to_engagement.py` | Maps raw HR/RR samples to 0–100 engagement scores per slide and per 2-minute timeline point. Uses HRV (RMSSD) for focus signal and breathing regularity for calm/alert signal. |
| `process_videos.sh` | End-to-end orchestration: runs `presage_process.py` on each slide video, merges outputs, then runs `map_to_engagement.py`. Writes final `src/data/presageData.json`. |

**API route (`src/app/api/presage/route.ts`)**

- Serves `src/data/presageData.json` to the frontend
- Graceful fallback: if the file is missing (no real Presage run yet), returns mock data shaped identically — the demo always works

**Chart components updated**

All four engagement charts now fetch from `/api/presage` on mount and update dynamically:
- `src/components/teacher/EngagementChart.tsx`
- `src/components/teacher/SlideBySlideChart.tsx`
- `src/components/session/SessionEngagementChart.tsx`
- `src/components/session/SessionTimeline.tsx`

### Engagement scoring formula

```
score = 0.50 × HRV_focus + 0.40 × RR_regularity + 0.10 (floor)
        + optional HR_boost (elevated-but-not-anxious active thinking signal)
```

Labels: `<50 DISENGAGED` · `50–70 LOW` · `70–85 GOOD` · `85+ EXCELLENT`

### Running the full Presage pipeline

```bash
# Prerequisites
export PRESAGE_API_KEY=your_key_here
pip install Presage-Technologies Presage-Physiology-Preprocessing

# Place per-slide video clips (sorted alphabetically) in ./videos/
# then run the full pipeline:
./scripts/process_videos.sh

# Output: src/data/presageData.json
# Start the app and open /teacher or /session to see live data
npm run dev
```

### Privacy preserved

- Raw HR/RR samples are never surfaced to UI components or sent to Gemini
- Only first 50 raw samples stored in `presageData.json` for debugging; the rest are discarded
- Charts show only derived engagement scores (0–100), never biometric readings

---

## Important Notes

- Gemini and Presage integrations are real; Backboard and Solana are still placeholder/concept
- All student identity data shown is simulated — no real student data is collected
- The focus is on demonstrating the product concept, UX, and privacy architecture

---

## What Still Needs to Be Done

### 1. Backboard integration

Turn the memory page into real persistent cross-session intelligence.

- Use Backboard for recurring confusion topics, disengagement patterns, and at-risk retrieval
- Multi-agent structure: Engagement Agent, Content Agent, Reflection Agent, Intervention Agent, Student Support Agent, Memory Agent
- Connect to: Memory page, teacher dashboard recommendations, student pattern card, at-risk alert

### 2. Solana audit layer

Add lightweight tamper-evident audit proofs (last step).

- Tamper-evident hashes for data access events
- Consent receipt proofs
- Show on Privacy & Audit page
- No raw media or content stored on-chain — hashes only

### 3. Final polish

- Unify all integration loading/fallback states
- Confirm privacy framing stays: learning support, not surveillance
- Demo prep and final README pass

---

*Built for the Google Antigravity Hackathon 2026.*