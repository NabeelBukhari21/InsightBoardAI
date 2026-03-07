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

## Important Notes

- This is an MVP demo with mock data — no real backend or API calls
- All student data shown is simulated
- Presage, Gemini, Backboard, and Solana integrations are represented as placeholders
- The focus is on demonstrating the product concept, UX, and privacy architecture

---

*Built for the Google Antigravity Hackathon 2026.*
