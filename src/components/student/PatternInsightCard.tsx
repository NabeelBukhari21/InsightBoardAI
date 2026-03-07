"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import { personalPattern } from "@/data/mockData";
import { Reveal } from "@/components/motion/MotionKit";

export default function PatternInsightCard() {
    return (
        <Reveal delay={0.6} duration={0.6}>
            <Card className="relative overflow-hidden" glow>
                <div className="absolute top-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-success/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-xl bg-accent/15 ring-1 ring-accent/20 flex items-center justify-center text-accent-light text-lg">
                            🔮
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-foreground">Your Learning Pattern</h3>
                            <p className="text-xs text-muted">Insight from your last 3 sessions</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="default" size="md">
                                {personalPattern.confidence}% match
                            </Badge>
                            <Badge>Gemini</Badge>
                        </div>
                    </div>

                    {/* Pattern statement */}
                    <div className="glass-card p-5 bg-accent/[0.03] border-accent/15 mb-4">
                        <p className="text-base font-bold text-foreground leading-relaxed mb-2">
                            &ldquo;{personalPattern.pattern}&rdquo;
                        </p>
                        <p className="text-sm text-muted leading-relaxed">{personalPattern.description}</p>

                        <div className="flex items-center gap-3 mt-3">
                            <span className="text-xs text-muted">Pattern confidence</span>
                            <ProgressBar value={personalPattern.confidence} size="sm" className="flex-1 max-w-40" />
                            <span className="text-xs font-semibold text-accent-light">{personalPattern.confidence}%</span>
                        </div>
                    </div>

                    {/* Evidence */}
                    <div className="mb-4">
                        <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2.5">Evidence from Your Sessions</p>
                        <div className="space-y-2">
                            {personalPattern.evidence.map((ev, i) => (
                                <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                                    <div className="w-5 h-5 rounded-full bg-accent/15 ring-1 ring-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-accent-light text-[10px] font-bold">{i + 1}</span>
                                    </div>
                                    <span className="text-xs text-muted leading-relaxed">{ev}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Suggestion */}
                    <div className="glass-card p-4 bg-success/5 border-success/15">
                        <div className="flex items-start gap-2">
                            <span className="text-base mt-0.5">💡</span>
                            <div>
                                <p className="text-xs font-semibold text-success mb-1">What This Means For You</p>
                                <p className="text-sm text-foreground leading-relaxed">{personalPattern.suggestion}</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-[10px] text-muted mt-3 italic text-center">
                        This insight is private to you. It&apos;s here to help you understand your learning style, not to evaluate you.
                    </p>
                </div>
            </Card>
        </Reveal>
    );
}
