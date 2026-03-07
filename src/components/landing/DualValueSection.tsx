"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { SectionReveal, Reveal } from "@/components/motion/MotionKit";

export default function DualValueSection() {
    const teacherBenefits = [
        { icon: "📊", text: "See which slides caused confusion" },
        { icon: "🧠", text: "Understand why students disengaged" },
        { icon: "💡", text: "Get AI teaching suggestions" },
        { icon: "📈", text: "Track improvement across sessions" },
        { icon: "🔒", text: "Only aggregated data — never individual" },
    ];

    const studentBenefits = [
        { icon: "✨", text: "Get simpler AI explanations" },
        { icon: "📝", text: "Worked examples for hard topics" },
        { icon: "🧪", text: "Quick self-check quizzes" },
        { icon: "🔮", text: "Personal learning pattern insights" },
        { icon: "🤝", text: "Your data is private to you" },
    ];

    return (
        <section className="py-16 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-foreground mb-3">
                        Built for <span className="gradient-text">Both Sides</span> of the Classroom
                    </h2>
                    <p className="text-muted max-w-xl mx-auto">
                        Teachers get teaching insights. Students get learning support. Neither sees the other&apos;s raw data.
                    </p>
                </div>
            </SectionReveal>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Teacher */}
                <Reveal direction="right" delay={0.2} duration={0.6}>
                    <Card className="relative overflow-hidden h-full">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="relative">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-12 h-12 rounded-xl bg-accent/15 ring-1 ring-accent/20 flex items-center justify-center text-2xl">🎓</div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">For Teachers</h3>
                                    <p className="text-xs text-muted">Aggregated class-level insights</p>
                                </div>
                            </div>
                            <div className="space-y-2.5">
                                {teacherBenefits.map((b, i) => (
                                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                                        <span className="text-base">{b.icon}</span>
                                        <span className="text-sm text-muted">{b.text}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <Badge variant="default">View →  /teacher</Badge>
                            </div>
                        </div>
                    </Card>
                </Reveal>

                {/* Student */}
                <Reveal direction="left" delay={0.3} duration={0.6}>
                    <Card className="relative overflow-hidden h-full">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="relative">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-12 h-12 rounded-xl bg-success/15 ring-1 ring-success/20 flex items-center justify-center text-2xl">🧑‍🎓</div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">For Students</h3>
                                    <p className="text-xs text-muted">Private, personalized learning support</p>
                                </div>
                            </div>
                            <div className="space-y-2.5">
                                {studentBenefits.map((b, i) => (
                                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                                        <span className="text-base">{b.icon}</span>
                                        <span className="text-sm text-muted">{b.text}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <Badge variant="success">View →  /student</Badge>
                            </div>
                        </div>
                    </Card>
                </Reveal>
            </div>
        </section>
    );
}
