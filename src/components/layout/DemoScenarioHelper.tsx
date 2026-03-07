"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge";

export default function DemoScenarioHelper() {
    const [open, setOpen] = useState(false);

    const beats = [
        { icon: "🟢", label: "Session starts at 87% engagement", detail: "21 students, 6 slides, Neural Networks Deep Dive" },
        { icon: "🔴", label: "Slide 4 dip: engagement drops to 45%", detail: "Backpropagation math causes confusion spike (62%)" },
        { icon: "💭", label: "Students select 'too fast' and 'unclear explanation'", detail: "43% report confusion — reflections feed the AI" },
        { icon: "✨", label: "AI generates simplified recap + 3 review questions", detail: "Personalized to each student, private — teacher never sees individual responses" },
        { icon: "🎓", label: "Teacher receives aggregated recommendation", detail: "Theory-heavy content → 35% avg drop. Suggestion: add visual scaffolding before math" },
        { icon: "🧠", label: "Memory flags 3rd occurrence of this pattern", detail: "Backboard projects 48%+ drop next session without intervention" },
    ];

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Toggle */}
            <button
                onClick={() => setOpen(!open)}
                className="w-12 h-12 rounded-full bg-accent/90 hover:bg-accent text-white shadow-lg shadow-accent/30 flex items-center justify-center text-lg transition-all hover:scale-110"
                aria-label="Demo scenario"
                title="Demo Scenario"
            >
                🎬
            </button>

            {/* Panel */}
            {open && (
                <div className="absolute bottom-16 right-0 w-[380px] glass-card p-5 animate-fade-in-up shadow-2xl" style={{ animationDuration: "0.2s" }}>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h4 className="text-sm font-bold text-foreground">Demo Scenario</h4>
                            <p className="text-[10px] text-muted">Session 5 — Neural Networks Deep Dive</p>
                        </div>
                        <Badge variant="default" size="sm">Mock Data</Badge>
                    </div>

                    <div className="space-y-2.5">
                        {beats.map((beat, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                                <span className="text-sm flex-shrink-0 mt-0.5">{beat.icon}</span>
                                <div>
                                    <p className="text-xs font-semibold text-foreground leading-snug">{beat.label}</p>
                                    <p className="text-[10px] text-muted leading-relaxed">{beat.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/5">
                        <p className="text-[10px] text-muted text-center">
                            💡 This entire loop runs in under 60 seconds — click through the pages to see it
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
