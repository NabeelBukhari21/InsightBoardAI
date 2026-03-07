"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import { enrichedSlides, type EnrichedSlide } from "@/data/mockData";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/MotionKit";
import { useTeacherInsight } from "@/components/teacher/TeacherInsightProvider";

const statusConfig: Record<string, { variant: "success" | "warning" | "danger" | "info" | "default"; label: string }> = {
    strong: { variant: "success", label: "✦ Strong" },
    moderate: { variant: "warning", label: "Moderate" },
    dip: { variant: "danger", label: "⚠ Breakdown" },
    recovery: { variant: "info", label: "↗ Recovery" },
    peak: { variant: "success", label: "★ Peak" },
};

interface Props {
    selectedSlide: number;
}

export default function SlideDetailPanel({ selectedSlide }: Props) {
    const slide = enrichedSlides.find((s) => s.id === selectedSlide) || enrichedSlides[0];
    const cfg = statusConfig[slide.status];
    const { data, isLoading } = useTeacherInsight();

    // If we're on Slide 4, use the live Gemini recommendation (if available)
    const isLiveSlide = selectedSlide === 4;
    const recommendationText = isLiveSlide && data?.recommendation?.title
        ? `${data.recommendation.title}: ${data.recommendation.description}`
        : slide.recommendation;

    return (
        <Reveal key={slide.id} delay={0.2} duration={0.6}>
            <div className="space-y-4">
                {/* Slide Header */}
                <Card className="relative overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-1 ${slide.status === "dip" ? "bg-danger" :
                        slide.status === "peak" ? "bg-success" :
                            slide.status === "recovery" ? "bg-blue-400" :
                                slide.status === "moderate" ? "bg-warning" : "bg-accent"
                        }`} />

                    <div className="pt-3">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-xl font-extrabold text-foreground">Slide {slide.id}</h3>
                                    <Badge variant={cfg.variant}>{cfg.label}</Badge>
                                    {slide.marker && (
                                        <Badge variant={slide.status === "dip" ? "danger" : "success"} size="sm">{slide.marker.label}</Badge>
                                    )}
                                </div>
                                <p className="text-sm text-muted">{slide.title} · {slide.timeRange} · {slide.duration} min</p>
                            </div>
                        </div>

                        {/* Key metrics */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="glass-card p-3 bg-white/[0.02] border-white/5">
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs text-muted">Engagement</span>
                                    <span className={`text-lg font-extrabold ${slide.engagement >= 80 ? "text-success" : slide.engagement >= 60 ? "text-warning" : "text-danger"
                                        }`}>{slide.engagement}%</span>
                                </div>
                                <ProgressBar value={slide.engagement} size="sm" />
                            </div>
                            <div className="glass-card p-3 bg-white/[0.02] border-white/5">
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs text-muted">Confusion</span>
                                    <span className={`text-lg font-extrabold ${slide.confusion <= 15 ? "text-success" : slide.confusion <= 30 ? "text-warning" : "text-danger"
                                        }`}>{slide.confusion}%</span>
                                </div>
                                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                                    <div className={`h-full rounded-full ${slide.confusion <= 15 ? "bg-success" : slide.confusion <= 30 ? "bg-warning" : "bg-danger"
                                        }`} style={{ width: `${slide.confusion}%` }} />
                                </div>
                            </div>
                        </div>

                        {/* Transcript */}
                        <div className="glass-card p-4 bg-white/[0.02] border-white/5 mb-4">
                            <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1.5">Topic Snippet</p>
                            <p className="text-sm text-foreground/80 leading-relaxed italic">&ldquo;{slide.transcript}&rdquo;</p>
                        </div>

                        {/* Feedback themes */}
                        {slide.feedbackThemes.length > 0 && (
                            <div className="mb-4">
                                <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-2">Student Feedback Themes</p>
                                <div className="flex flex-wrap gap-2">
                                    {slide.feedbackThemes.map((theme, i) => (
                                        <Badge key={i} variant={slide.status === "dip" ? "danger" : "warning"} size="md">
                                            {theme}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Two-panel: Teacher + Student */}
                <StaggerContainer delay={0.4}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Teacher insight */}
                        <StaggerItem>
                            <Card className="relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
                                <div className="relative">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-accent/15 ring-1 ring-accent/20 flex items-center justify-center text-sm">
                                            🎓
                                        </div>
                                        <h4 className="text-sm font-bold text-foreground">Teacher Insight</h4>
                                    </div>
                                    <p className="text-xs text-muted leading-relaxed">{slide.teacherNote}</p>
                                </div>
                            </Card>
                        </StaggerItem>

                        {/* Student voice */}
                        <StaggerItem>
                            <Card className="relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-success/5 rounded-full blur-2xl pointer-events-none" />
                                <div className="relative">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-success/15 ring-1 ring-success/20 flex items-center justify-center text-sm">
                                            💬
                                        </div>
                                        <h4 className="text-sm font-bold text-foreground">Student Voice</h4>
                                        <Badge variant="success" size="sm">Aggregated</Badge>
                                    </div>
                                    <p className="text-xs text-muted leading-relaxed italic">&ldquo;{slide.studentNote}&rdquo;</p>
                                </div>
                            </Card>
                        </StaggerItem>
                    </div>
                </StaggerContainer>

                {/* Recommendation */}
                <Reveal delay={0.6}>
                    <Card className={`relative overflow-hidden ${slide.status === "dip" ? "border-danger/15" : "border-accent/10"
                        }`}>
                        <div className={`absolute top-0 left-0 right-0 h-0.5 ${slide.status === "dip" ? "bg-danger/50" : "bg-accent/30"
                            }`} />
                        <div className="pt-2">
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${slide.status === "dip" ? "bg-danger/15 ring-1 ring-danger/20" : "bg-accent/15 ring-1 ring-accent/20"
                                    }`}>
                                    💡
                                </div>
                                <h4 className="text-sm font-bold text-foreground">AI Recommendation</h4>
                                {isLiveSlide && <Badge size="sm" variant="success">✦ Live Gemini</Badge>}
                                {!isLiveSlide && <Badge size="sm">Gemini</Badge>}
                            </div>

                            {isLiveSlide && isLoading ? (
                                <div className="animate-pulse space-y-2 mt-2">
                                    <div className="h-4 bg-white/10 rounded w-full" />
                                    <div className="h-4 bg-white/10 rounded w-3/4" />
                                </div>
                            ) : (
                                <p className="text-sm text-foreground/80 leading-relaxed">{recommendationText}</p>
                            )}
                        </div>
                    </Card>
                </Reveal>
            </div>
        </Reveal>
    );
}
