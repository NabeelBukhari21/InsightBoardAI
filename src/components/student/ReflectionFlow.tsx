"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/MotionKit";

const reasons = [
    { id: "fast", label: "Content moved too fast", icon: "⏩", category: "Pacing" },
    { id: "unclear", label: "Unclear example or analogy", icon: "🤔", category: "Clarity" },
    { id: "math", label: "Too much math notation", icon: "📐", category: "Content" },
    { id: "context", label: "Lost context from before", icon: "🔗", category: "Flow" },
    { id: "fatigue", label: "Felt tired or distracted", icon: "😴", category: "Energy" },
    { id: "visual", label: "Needed a visual or diagram", icon: "🖼️", category: "Format" },
];

export default function ReflectionFlow() {
    const [step, setStep] = useState<"prompt" | "select" | "detail" | "done">("prompt");
    const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
    const [detail, setDetail] = useState("");

    const toggleReason = (id: string) => {
        setSelectedReasons((prev) =>
            prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
        );
    };

    if (step === "done") {
        return (
            <Reveal delay={0.2} duration={0.6}>
                <Card className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent pointer-events-none" />
                    <div className="relative text-center py-6">
                        <div className="w-16 h-16 rounded-2xl bg-success/15 ring-1 ring-success/20 flex items-center justify-center text-3xl mx-auto mb-4">
                            ✅
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">Thanks for sharing!</h3>
                        <p className="text-sm text-muted max-w-md mx-auto mb-4">
                            Your feedback helps us create a better learning experience for you. We&apos;ve personalized your AI recap below based on what you told us.
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                            {selectedReasons.map((id) => {
                                const reason = reasons.find((r) => r.id === id);
                                return reason ? (
                                    <Badge key={id} variant="success" size="md">
                                        <span className="mr-1">{reason.icon}</span>{reason.label}
                                    </Badge>
                                ) : null;
                            })}
                        </div>
                        <p className="text-xs text-muted italic">🔒 Your response is private and anonymous to your teacher</p>
                    </div>
                </Card>
            </Reveal>
        );
    }

    return (
        <Reveal delay={0.2} duration={0.6}>
            <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-accent/15 ring-1 ring-accent/20 flex items-center justify-center text-accent-light text-lg">
                            💭
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-foreground">Help Us Help You</h3>
                            <p className="text-xs text-muted">Share what made Slide 4 challenging — it&apos;s 100% private</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge>Step {step === "prompt" ? "1" : step === "select" ? "2" : "3"}/3</Badge>
                            <Badge variant="success" size="sm">🔒 Private</Badge>
                        </div>
                    </div>

                    {/* Step 1: Prompt */}
                    {step === "prompt" && (
                        <div className="space-y-4">
                            <div className="glass-card p-5 bg-accent/[0.03] border-accent/10">
                                <p className="text-sm text-foreground leading-relaxed">
                                    We noticed your engagement dipped during <strong>Slide 4: Backpropagation Explained</strong>.
                                    This is totally normal — it&apos;s one of the hardest topics in the course! 🧠
                                </p>
                                <p className="text-sm text-muted mt-2">
                                    Sharing why helps us create a <strong className="text-foreground">personalized recap</strong> just for you.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={() => setStep("select")} variant="primary" size="md">
                                    ✨ Yes, personalize my recap
                                </Button>
                                <Button onClick={() => setStep("done")} variant="ghost" size="md">
                                    Skip for now
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Reason selection */}
                    {step === "select" && (
                        <div className="space-y-4">
                            <p className="text-sm text-muted">What made it challenging? <span className="text-foreground font-medium">Pick all that apply</span></p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {reasons.map((reason) => {
                                    const isSelected = selectedReasons.includes(reason.id);
                                    return (
                                        <button
                                            key={reason.id}
                                            onClick={() => toggleReason(reason.id)}
                                            className={`text-left p-4 rounded-xl border transition-all duration-200 group ${isSelected
                                                ? "border-accent bg-accent/10 ring-1 ring-accent/20"
                                                : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={`text-xl transition-transform duration-200 ${isSelected ? "scale-110" : "group-hover:scale-105"}`}>
                                                    {reason.icon}
                                                </span>
                                                <div className="flex-1">
                                                    <span className={`text-sm font-medium ${isSelected ? "text-foreground" : "text-muted"}`}>
                                                        {reason.label}
                                                    </span>
                                                    <span className="text-[10px] text-muted block mt-0.5">{reason.category}</span>
                                                </div>
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "border-accent bg-accent text-white" : "border-white/20"
                                                    }`}>
                                                    {isSelected && (
                                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={() => setStep("detail")} variant="primary" size="sm" disabled={selectedReasons.length === 0}>
                                    Continue →
                                </Button>
                                <Button onClick={() => setStep("prompt")} variant="ghost" size="sm">← Back</Button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Detail */}
                    {step === "detail" && (
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2 mb-1">
                                {selectedReasons.map((id) => {
                                    const r = reasons.find((x) => x.id === id);
                                    return r ? (
                                        <Badge key={id} variant="default" size="md">
                                            <span className="mr-1">{r.icon}</span>{r.label}
                                        </Badge>
                                    ) : null;
                                })!}
                            </div>
                            <p className="text-sm text-muted">Anything else you&apos;d like to add? <span className="text-foreground/60">(Optional)</span></p>
                            <textarea
                                value={detail}
                                onChange={(e) => setDetail(e.target.value)}
                                placeholder="E.g., I wish there was a visual diagram showing how errors flow backward..."
                                className="w-full h-24 bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-foreground placeholder-muted/40 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 resize-none transition-all"
                            />
                            <div className="flex items-center justify-between">
                                <div className="flex gap-3">
                                    <Button onClick={() => setStep("done")} variant="primary" size="sm">
                                        ✨ Submit & Get Recap
                                    </Button>
                                    <Button onClick={() => setStep("select")} variant="ghost" size="sm">← Back</Button>
                                </div>
                                <p className="text-[10px] text-muted italic">
                                    🔒 Anonymous to your teacher
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </Reveal>
    );
}
