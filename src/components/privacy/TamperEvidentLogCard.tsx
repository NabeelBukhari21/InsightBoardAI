"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/MotionKit";

export default function TamperEvidentLogCard() {
    const logEntries = [
        {
            timestamp: "14:32:18 UTC",
            event: "Teacher viewed aggregated Session 5 insights",
            actor: "Teacher (Dr. Patel)",
            hashPrev: "7f3a...c2d1",
            hashCurrent: "b4e9...a1f3",
            verified: true,
            type: "view",
        },
        {
            timestamp: "14:15:04 UTC",
            event: "AI recap generated for Student Gamma (private)",
            actor: "System (Gemini)",
            hashPrev: "a1b2...e9f0",
            hashCurrent: "7f3a...c2d1",
            verified: true,
            type: "generate",
        },
        {
            timestamp: "13:48:22 UTC",
            event: "Engagement data aggregated for teacher dashboard",
            actor: "System (Pipeline)",
            hashPrev: "d4c5...b8a3",
            hashCurrent: "a1b2...e9f0",
            verified: true,
            type: "aggregate",
        },
        {
            timestamp: "13:00:00 UTC",
            event: "21 students granted session consent",
            actor: "Students (batch)",
            hashPrev: "e5f6...c7d8",
            hashCurrent: "d4c5...b8a3",
            verified: true,
            type: "consent",
        },
        {
            timestamp: "12:55:30 UTC",
            event: "Session 5 parameters configured by teacher",
            actor: "Teacher (Dr. Patel)",
            hashPrev: "9a8b...1e2f",
            hashCurrent: "e5f6...c7d8",
            verified: true,
            type: "config",
        },
    ];

    const typeIcons: Record<string, string> = {
        view: "👁️",
        generate: "✨",
        aggregate: "📊",
        consent: "✅",
        config: "⚙️",
    };

    return (
        <Reveal delay={0.2} duration={0.6}>
            <Card className="relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="relative">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-xl bg-emerald-500/15 ring-1 ring-emerald-500/20 flex items-center justify-center text-lg">📋</div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-foreground">Tamper-Evident Access Log</h3>
                            <p className="text-xs text-muted">Every data access is logged with a chained hash — any tampering is immediately detectable</p>
                        </div>
                    </div>

                    {/* Chain visualization header */}
                    <div className="glass-card p-3 bg-emerald-500/[0.03] border-emerald-500/10 mb-4">
                        <div className="flex items-center gap-2 text-xs text-muted">
                            <span className="text-emerald-400 font-semibold">Chain integrity:</span>
                            <span>Each entry&apos;s hash includes the previous entry&apos;s hash — if any log is modified, all subsequent hashes break.</span>
                        </div>
                    </div>

                    {/* Log entries */}
                    <StaggerContainer delay={0.3} stagger={0.08}>
                        <div className="space-y-0 font-mono text-xs">
                            {logEntries.map((entry, i) => {
                                const isLast = i === logEntries.length - 1;
                                return (
                                    <StaggerItem key={i}>
                                        <div className="relative">
                                            {!isLast && (
                                                <div className="absolute left-[15px] top-[40px] w-0.5 h-[calc(100%-16px)] bg-emerald-500/20" />
                                            )}
                                            <div className="flex gap-3 p-2.5 rounded-lg hover:bg-white/[0.02] transition-colors relative z-10">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20 flex items-center justify-center text-sm flex-shrink-0 bg-background">
                                                    {typeIcons[entry.type]}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <span className="text-[10px] text-muted">{entry.timestamp}</span>
                                                        <span className="text-xs text-foreground font-sans font-medium">{entry.event}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-[10px] text-muted">
                                                        <span>Actor: <span className="text-foreground/60">{entry.actor}</span></span>
                                                        <span>Prev: <span className="text-emerald-400/60">{entry.hashPrev}</span></span>
                                                        <span>Hash: <span className="text-emerald-400">{entry.hashCurrent}</span></span>
                                                        <span className="flex items-center gap-1 ml-auto">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-success" />
                                                            <span className="text-success">Valid</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </StaggerItem>
                                );
                            })}
                        </div>
                    </StaggerContainer>

                    <Reveal delay={0.6}>
                        <p className="text-[10px] text-muted mt-3 text-center">
                            Hash chain anchored to Solana block 281,492,017 — independently verifiable
                        </p>
                    </Reveal>
                </div>
            </Card>
        </Reveal>
    );
}
