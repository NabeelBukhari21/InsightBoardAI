"use client";

import React from "react";
import Badge from "@/components/ui/Badge";
import { SectionReveal, StaggerContainer, StaggerItem, Reveal } from "@/components/motion/MotionKit";

export default function DemoScenarioSection() {
    const beats = [
        {
            time: "0:00",
            event: "Session starts",
            detail: "21 students, 6 slides, Neural Networks Deep Dive. Engagement opens at 87%.",
            icon: "🟢",
            color: "border-success/15 bg-success/[0.03]",
        },
        {
            time: "30:00",
            event: "Slide 4 dip detected",
            detail: "Backpropagation math hits. Engagement crashes to 45%. Confusion spikes to 62%.",
            icon: "🔴",
            color: "border-danger/15 bg-danger/[0.03]",
        },
        {
            time: "30:15",
            event: "Students are asked why",
            detail: "43% report 'too fast' and 'unclear example'. Reflections feed the AI.",
            icon: "💭",
            color: "border-blue-500/15 bg-blue-500/[0.03]",
        },
        {
            time: "30:30",
            event: "AI generates personalized recap",
            detail: "Simpler explanation, worked example, and 3 self-check questions — private to each student.",
            icon: "✨",
            color: "border-success/15 bg-success/[0.03]",
        },
        {
            time: "31:00",
            event: "Teacher gets aggregated insights",
            detail: "Class pattern: theory-heavy content → 35% avg drop. Suggestion: add visual scaffolding.",
            icon: "🎓",
            color: "border-accent/15 bg-accent/[0.03]",
        },
        {
            time: "After",
            event: "Memory remembers this pattern",
            detail: "Backboard flags this as the 3rd occurrence. Projects 48%+ drop next session without change.",
            icon: "🧠",
            color: "border-warning/15 bg-warning/[0.03]",
        },
    ];

    return (
        <section className="py-16 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-foreground mb-3">
                        See It in <span className="gradient-text">Action</span>
                    </h2>
                    <p className="text-muted max-w-xl mx-auto">
                        One session. One engagement dip. The entire intelligence loop.
                    </p>
                </div>
            </SectionReveal>

            <div className="max-w-3xl mx-auto">
                <StaggerContainer className="space-y-0" stagger={0.15}>
                    {beats.map((beat, i) => {
                        const isLast = i === beats.length - 1;
                        return (
                            <StaggerItem key={i} direction="up">
                                <div className="relative">
                                    {!isLast && (
                                        <div className="absolute left-[25px] top-[52px] w-0.5 h-[calc(100%-28px)] bg-white/8" />
                                    )}
                                    <div className={`flex gap-4 p-4 rounded-xl glass-card ${beat.color} mb-2 hover:scale-[1.01] transition-transform`}>
                                        <div className="w-[50px] h-12 rounded-xl bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-xl flex-shrink-0">
                                            {beat.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className="text-[10px] font-mono text-muted bg-white/5 px-1.5 py-0.5 rounded">{beat.time}</span>
                                                <span className="text-sm font-bold text-foreground">{beat.event}</span>
                                            </div>
                                            <p className="text-xs text-muted leading-relaxed">{beat.detail}</p>
                                        </div>
                                    </div>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>

                <Reveal delay={0.8} direction="up" distance={10}>
                    <div className="text-center mt-8">
                        <Badge variant="success" size="md">← This entire loop runs in under 60 seconds</Badge>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
