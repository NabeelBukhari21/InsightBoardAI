"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import { Reveal, StaggerContainer, StaggerItem, AnimatedCounter } from "@/components/motion/MotionKit";

export default function SolanaAuditCard() {
    const auditEntries = [
        {
            action: "Session 5 engagement data accessed by teacher",
            type: "access",
            hash: "7f3a...c2d1",
            timestamp: "Mar 6, 2026 · 14:32 UTC",
            block: "281,492,017",
            verified: true,
        },
        {
            action: "Student consent for Session 5 recorded",
            type: "consent",
            hash: "a1b2...e9f0",
            timestamp: "Mar 6, 2026 · 13:00 UTC",
            block: "281,491,842",
            verified: true,
        },
        {
            action: "Session 4 raw media deletion confirmed",
            type: "deletion",
            hash: "d4c5...b8a3",
            timestamp: "Feb 28, 2026 · 02:00 UTC",
            block: "280,892,103",
            verified: true,
        },
        {
            action: "Aggregated class report generated for Session 4",
            type: "access",
            hash: "e5f6...c7d8",
            timestamp: "Feb 27, 2026 · 15:10 UTC",
            block: "280,891,456",
            verified: true,
        },
        {
            action: "Student Gamma data deletion request processed",
            type: "deletion",
            hash: "9a8b...1e2f",
            timestamp: "Feb 20, 2026 · 09:45 UTC",
            block: "280,321,789",
            verified: true,
        },
    ];

    const typeConfig: Record<string, { badge: "success" | "info" | "warning" | "default"; label: string }> = {
        access: { badge: "info", label: "Access" },
        consent: { badge: "success", label: "Consent" },
        deletion: { badge: "warning", label: "Deletion" },
    };

    return (
        <Reveal delay={0.1} duration={0.6}>
            <Card className="relative overflow-hidden h-full" glow>
                <div className="absolute top-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="relative">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-xl bg-emerald-500/15 ring-1 ring-emerald-500/20 flex items-center justify-center text-lg">⛓️</div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-foreground">Solana Audit Proofs</h3>
                            <p className="text-xs text-muted">Tamper-evident verification — hashes only, no student content on-chain</p>
                        </div>
                        <Badge variant="success">All verified</Badge>
                    </div>

                    {/* What goes on-chain */}
                    <div className="glass-card p-4 bg-emerald-500/[0.03] border-emerald-500/10 mb-4">
                        <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">What Solana stores (and doesn&apos;t store)</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <p className="text-[10px] text-success font-semibold mb-1">✓ On-chain (hashes only)</p>
                                <ul className="text-xs text-muted space-y-1">
                                    <li>• Audit proof hashes (SHA-256)</li>
                                    <li>• Consent receipt timestamps</li>
                                    <li>• Data deletion confirmations</li>
                                    <li>• Access event verification</li>
                                </ul>
                            </div>
                            <div>
                                <p className="text-[10px] text-danger font-semibold mb-1">✗ Never on-chain</p>
                                <ul className="text-xs text-muted space-y-1">
                                    <li>• Student media (video, audio)</li>
                                    <li>• Engagement scores or reflections</li>
                                    <li>• Personal identifiers</li>
                                    <li>• Session content or transcripts</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Audit log entries */}
                    <StaggerContainer delay={0.3} stagger={0.08}>
                        <div className="space-y-2">
                            {auditEntries.map((entry, i) => {
                                const cfg = typeConfig[entry.type];
                                return (
                                    <StaggerItem key={i}>
                                        <div className="glass-card p-3 bg-white/[0.01] border-white/5 hover:bg-white/[0.03] transition-all">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant={cfg.badge} size="sm">{cfg.label}</Badge>
                                                    <span className="text-xs text-foreground">{entry.action}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-2 h-2 rounded-full bg-success" />
                                                    <span className="text-[10px] text-success font-medium">Verified</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 text-[10px] text-muted ml-1">
                                                <span className="font-mono">Hash: {entry.hash}</span>
                                                <span>Block: {entry.block}</span>
                                                <span>{entry.timestamp}</span>
                                            </div>
                                        </div>
                                    </StaggerItem>
                                );
                            })}
                        </div>
                    </StaggerContainer>

                    <Reveal delay={0.6}>
                        <div className="mt-3 flex items-center gap-3">
                            <span className="text-xs text-muted">Audit integrity</span>
                            <ProgressBar value={100} size="sm" className="flex-1 max-w-40" />
                            <span className="text-xs font-bold text-success"><AnimatedCounter value={100} />%</span>
                        </div>
                    </Reveal>
                </div>
            </Card>
        </Reveal>
    );
}
