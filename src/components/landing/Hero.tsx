"use client";

import React from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Reveal, StaggerContainer, StaggerItem, TextReveal, GlowPulse } from "@/components/motion/MotionKit";

export default function Hero() {
    const steps = [
        { step: "1", label: "Detect", desc: "Engagement dip spotted", icon: "📉", color: "bg-accent/20 text-accent-light ring-accent/20" },
        { step: "2", label: "Map", desc: "Linked to Slide 4", icon: "📍", color: "bg-warning/20 text-warning ring-warning/20" },
        { step: "3", label: "Reflect", desc: "Student says why", icon: "💭", color: "bg-blue-500/20 text-blue-400 ring-blue-500/20" },
        { step: "4", label: "Recap", desc: "AI explains simpler", icon: "✨", color: "bg-success/20 text-success ring-success/20" },
        { step: "5", label: "Improve", desc: "Teacher gets insights", icon: "🎯", color: "bg-accent/20 text-accent-light ring-accent/20" },
    ];

    return (
        <section className="relative pt-12 pb-16 overflow-hidden">
            {/* Ambient blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="ambient-blob w-96 h-96 bg-accent/8 top-20 left-1/4" />
                <div className="ambient-blob ambient-blob-2 w-80 h-80 bg-success/5 top-40 right-1/4" />
                <div className="ambient-blob ambient-blob-3 w-[600px] h-40 bg-accent/3 bottom-0 left-1/2 -translate-x-1/2" />
            </div>

            <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Badges */}
                <Reveal delay={0} duration={0.5}>
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Badge variant="default" size="md">🏆 Google Antigravity Hackathon</Badge>
                        <Badge variant="success" size="md">Privacy-First</Badge>
                    </div>
                </Reveal>

                {/* Headline with typewriter */}
                <Reveal delay={0.15} duration={0.6} blur>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.1] mb-5">
                        Detect confusion.{" "}
                        <span className="gradient-text-animated">
                            <TextReveal text="Help students learn." speed={40} delay={600} />
                        </span>
                        <br />
                        Help teachers teach.
                    </h1>
                </Reveal>

                <Reveal delay={0.35} duration={0.5}>
                    <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
                        InsightBoard AI spots when students disengage, asks them why, generates a personalized AI recap, and gives teachers aggregated insights to improve — all with privacy built in.
                    </p>
                </Reveal>

                {/* CTAs */}
                <Reveal delay={0.5} duration={0.5} scale>
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <GlowPulse>
                            <Button href="/teacher" variant="primary" size="lg">
                                🎓 Teacher Dashboard
                            </Button>
                        </GlowPulse>
                        <Button href="/student" variant="secondary" size="lg">
                            🧑‍🎓 Student View
                        </Button>
                        <Button href="/session" variant="ghost" size="lg">
                            📊 Live Session →
                        </Button>
                    </div>
                </Reveal>

                {/* 5-step workflow with stagger */}
                <Reveal delay={0.65} duration={0.6}>
                    <div className="max-w-4xl mx-auto">
                        <StaggerContainer className="grid grid-cols-5 gap-0 relative" stagger={0.12} delay={0.2}>
                            {/* Connector line */}
                            <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-accent/30 via-success/30 to-accent/30 hidden sm:block" />

                            {steps.map((item) => (
                                <StaggerItem key={item.step}>
                                    <div className="text-center relative z-10">
                                        <div className={`w-12 h-12 rounded-xl ${item.color} ring-1 flex items-center justify-center text-xl mx-auto mb-2`}>
                                            {item.icon}
                                        </div>
                                        <p className="text-xs font-bold text-foreground">{item.label}</p>
                                        <p className="text-[10px] text-muted mt-0.5">{item.desc}</p>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
