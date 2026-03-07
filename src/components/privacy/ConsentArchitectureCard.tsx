"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/MotionKit";

export default function ConsentArchitectureCard() {
    const consentLayers = [
        {
            layer: "Institutional Consent",
            description: "University or institution opts into InsightBoard AI with a data processing agreement. Defines scope, permitted uses, and retention limits.",
            status: "Active",
            icon: "🏛️",
        },
        {
            layer: "Teacher Consent",
            description: "Teachers consent to receiving aggregated insights and agree to the terms of use — including the commitment to use data only for teaching improvement.",
            status: "Active",
            icon: "🎓",
        },
        {
            layer: "Student Consent",
            description: "Students opt in at the start of each session. They can opt out at any time without penalty. Opting out disables engagement detection but still allows access to shared materials.",
            status: "Active",
            icon: "🧑‍🎓",
        },
        {
            layer: "Per-Feature Consent",
            description: "Individual features (camera analysis, reflection prompts, quiz participation) each require separate consent. Students can enable/disable features independently.",
            status: "Granular",
            icon: "⚙️",
        },
        {
            layer: "Data Export & Deletion",
            description: "Students can request a full export of their data or permanent deletion at any time. Deletion is confirmed via Solana audit proof with a tamper-evident hash.",
            status: "Available",
            icon: "📦",
        },
    ];

    return (
        <Reveal delay={0.2} duration={0.6}>
            <Card className="relative overflow-hidden h-full">
                <div className="absolute bottom-0 right-0 w-36 h-36 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="relative">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-xl bg-blue-500/15 ring-1 ring-blue-500/20 flex items-center justify-center text-lg">✅</div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-foreground">Consent-Aware Architecture</h3>
                            <p className="text-xs text-muted">Layered consent — from institution to individual feature</p>
                        </div>
                    </div>

                    <StaggerContainer delay={0.3} stagger={0.1}>
                        <div className="space-y-2.5">
                            {consentLayers.map((cl, i) => (
                                <StaggerItem key={i}>
                                    <div className="glass-card p-4 bg-white/[0.01] border-white/5 hover:bg-white/[0.03] transition-all">
                                        <div className="flex items-start gap-3">
                                            <span className="text-xl flex-shrink-0 mt-0.5">{cl.icon}</span>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="text-sm font-bold text-foreground">{cl.layer}</h4>
                                                    <Badge variant="success" size="sm">{cl.status}</Badge>
                                                </div>
                                                <p className="text-xs text-muted leading-relaxed">{cl.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </StaggerItem>
                            ))}
                        </div>
                    </StaggerContainer>

                    <Reveal delay={0.6}>
                        <div className="mt-3 glass-card p-3 bg-accent/5 border-accent/10">
                            <p className="text-[11px] text-muted">
                                <span className="font-semibold text-accent-light">Key principle:</span> Consent is always opt-in, never assumed. Students can participate in the class without participating in engagement tracking. No consent = no data collection.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </Card>
        </Reveal>
    );
}
