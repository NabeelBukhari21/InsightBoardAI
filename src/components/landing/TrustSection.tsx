"use client";

import React from "react";
import Badge from "@/components/ui/Badge";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/MotionKit";

export default function TrustSection() {
    const guarantees = [
        { icon: "🔒", title: "Privacy by design", detail: "Raw media is processed on-device and never stored or shown to teachers" },
        { icon: "📊", title: "Aggregated by default", detail: "Teachers only see class-level patterns — never individual data" },
        { icon: "💭", title: "Student voice matters", detail: "Students validate detections and control their own data" },
        { icon: "⛔", title: "No grades from engagement", detail: "Data is for learning support, never evaluation or discipline" },
        { icon: "⛓️", title: "Every access is logged", detail: "Tamper-evident Solana audit proofs verify all data access" },
        { icon: "🗑️", title: "Minimal retention", detail: "Raw media: deleted immediately. Scores: 48h. You control the rest." },
    ];

    return (
        <section className="py-16 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-foreground mb-3">
                        Privacy <span className="gradient-text">Isn&apos;t a Feature</span> — It&apos;s the Architecture
                    </h2>
                    <p className="text-muted max-w-xl mx-auto">
                        We designed InsightBoard AI so that privacy violations are architecturally impossible, not just policy-restricted.
                    </p>
                </div>
            </SectionReveal>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto" stagger={0.1}>
                {guarantees.map((g, i) => (
                    <StaggerItem key={i}>
                        <div className="glass-card p-5 text-center transition-all group h-full hover:bg-white/[0.03]">
                            <div className="w-12 h-12 rounded-xl bg-success/10 ring-1 ring-success/15 flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform">
                                {g.icon}
                            </div>
                            <h4 className="text-sm font-bold text-foreground mb-1">{g.title}</h4>
                            <p className="text-xs text-muted leading-relaxed">{g.detail}</p>
                        </div>
                    </StaggerItem>
                ))}
            </StaggerContainer>

            <SectionReveal delay={0.4}>
                <div className="text-center mt-8">
                    <Badge variant="success" size="md">
                        <a href="/privacy" className="hover:underline">Read the full privacy breakdown →</a>
                    </Badge>
                </div>
            </SectionReveal>
        </section>
    );
}
