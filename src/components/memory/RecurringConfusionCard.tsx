"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { confusionPatterns } from "@/data/mockData";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/MotionKit";

export default function RecurringConfusionCard() {
    return (
        <Reveal delay={0.2} duration={0.6}>
            <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-danger/5 rounded-full blur-3xl pointer-events-none" />
                <div className="relative">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-xl bg-danger/15 ring-1 ring-danger/20 flex items-center justify-center text-danger text-lg">🔄</div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-foreground">Recurring Confusion Topics</h3>
                            <p className="text-xs text-muted">Topics that cause repeated engagement drops</p>
                        </div>
                        <Badge variant="danger">{confusionPatterns.length} patterns</Badge>
                    </div>

                    <StaggerContainer delay={0.3}>
                        <div className="space-y-3">
                            {confusionPatterns.map((p, index) => (
                                <StaggerItem key={p.id}>
                                    <div className={`glass-card p-4 ${p.trend === "increasing" ? "bg-danger/5 border-danger/15" : "bg-warning/5 border-warning/10"}`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-sm font-bold text-foreground">{p.topic}</h4>
                                            <div className="flex items-center gap-2">
                                                <Badge variant={p.trend === "increasing" ? "danger" : p.trend === "stable" ? "warning" : "success"} size="sm">
                                                    {p.trend === "increasing" ? "↗ Worsening" : p.trend === "stable" ? "→ Stable" : "↘ Improving"}
                                                </Badge>
                                                <span className="text-sm font-extrabold text-danger">-{p.avgEngagementDrop}%</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="text-[10px] text-muted">
                                                <span className="font-semibold text-foreground">{p.occurrences}×</span> across: {p.sessions.join(", ")}
                                            </div>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden mb-2">
                                            <div className={`h-full rounded-full ${p.trend === "increasing" ? "bg-danger" : "bg-warning"}`} style={{ width: `${p.avgEngagementDrop}%` }} />
                                        </div>
                                        <div className="glass-card p-2 bg-white/[0.02] border-white/5">
                                            <p className="text-[11px] text-muted"><span className="font-semibold text-accent-light">💡 Suggestion:</span> {p.suggestedAction}</p>
                                        </div>
                                    </div>
                                </StaggerItem>
                            ))}
                        </div>
                    </StaggerContainer>
                </div>
            </Card>
        </Reveal>
    );
}
