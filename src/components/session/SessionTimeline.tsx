"use client";

import React, { useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";
import { enrichedSlides, type EnrichedSlide } from "@/data/mockData";
import { StaggerContainer, StaggerItem } from "@/components/motion/MotionKit";

const statusConfig: Record<string, { color: string; bg: string; border: string; ring: string; label: string }> = {
    strong: { color: "text-success", bg: "bg-success/15", border: "border-success/20", ring: "ring-success/20", label: "Strong" },
    moderate: { color: "text-warning", bg: "bg-warning/15", border: "border-warning/20", ring: "ring-warning/20", label: "Moderate" },
    dip: { color: "text-danger", bg: "bg-danger/15", border: "border-danger/25", ring: "ring-danger/20", label: "Dip" },
    recovery: { color: "text-blue-400", bg: "bg-blue-500/15", border: "border-blue-500/20", ring: "ring-blue-500/20", label: "Recovery" },
    peak: { color: "text-emerald-400", bg: "bg-emerald-500/15", border: "border-emerald-500/20", ring: "ring-emerald-500/20", label: "Peak" },
};

const markerConfig: Record<string, { color: string; bg: string; pulse: boolean }> = {
    dip: { color: "text-danger", bg: "bg-danger", pulse: true },
    spike: { color: "text-warning", bg: "bg-warning", pulse: true },
    recovery: { color: "text-blue-400", bg: "bg-blue-400", pulse: false },
    peak: { color: "text-emerald-400", bg: "bg-emerald-400", pulse: false },
};

interface Props {
    selectedSlide: number;
    onSelectSlide: (id: number) => void;
}

export default function SessionTimeline({ selectedSlide, onSelectSlide }: Props) {
    const [slides, setSlides] = useState<EnrichedSlide[]>(enrichedSlides);

    useEffect(() => {
        fetch("/api/presage")
            .then((r) => r.json())
            .then((data) => {
                if (Array.isArray(data.slideEngagement) && data.slideEngagement.length > 0) {
                    const engMap: Record<number, number> = {};
                    for (const s of data.slideEngagement) {
                        engMap[s.id] = s.engagement;
                    }
                    setSlides(
                        enrichedSlides.map((slide) => {
                            const eng = engMap[slide.id];
                            if (eng === undefined) return slide;
                            return { ...slide, engagement: eng };
                        })
                    );
                }
            })
            .catch(() => {
                // silently keep mock fallback
            });
    }, []);

    return (
        <StaggerContainer delay={0.4} stagger={0.06} className="space-y-0">
            {slides.map((slide, i) => {
                const cfg = statusConfig[slide.status];
                const isSelected = selectedSlide === slide.id;
                const isLast = i === slides.length - 1;

                return (
                    <StaggerItem key={slide.id}>
                        <div className="relative">
                            {/* Connector line */}
                            {!isLast && (
                                <div className={`absolute left-[23px] top-[56px] w-0.5 h-[calc(100%-32px)] ${slide.status === "dip" ? "bg-gradient-to-b from-danger/40 to-danger/10" : "bg-white/8"
                                    }`} />
                            )}

                            <button
                                onClick={() => onSelectSlide(slide.id)}
                                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex gap-4 group relative ${isSelected
                                    ? `${cfg.border} ${cfg.bg.replace('/15', '/8')} ring-1 ${cfg.ring}`
                                    : "border-transparent hover:bg-white/[0.03]"
                                    }`}
                            >
                                {/* Timeline node */}
                                <div className="flex-shrink-0 relative">
                                    <div className={`w-12 h-12 rounded-xl ${cfg.bg} ring-1 ${cfg.ring} flex items-center justify-center transition-all ${isSelected ? "scale-110" : "group-hover:scale-105"
                                        }`}>
                                        <span className={`text-xl font-extrabold ${cfg.color}`}>{slide.id}</span>
                                    </div>
                                    {/* Marker dot */}
                                    {slide.marker && (
                                        <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${markerConfig[slide.marker.type].bg} flex items-center justify-center ${markerConfig[slide.marker.type].pulse ? "animate-pulse-dot" : ""
                                            }`}>
                                            <span className="text-[8px] text-white font-bold">
                                                {slide.marker.type === "dip" ? "!" : slide.marker.type === "peak" ? "★" : "↗"}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h4 className={`text-sm font-bold truncate ${isSelected ? "text-foreground" : "text-foreground/80"}`}>
                                            {slide.title}
                                        </h4>
                                    </div>
                                    <p className="text-[11px] text-muted mb-2 truncate">{slide.topic} · {slide.timeRange}</p>

                                    {/* Engagement + confusion mini bars */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1.5 flex-1">
                                            <span className="text-[10px] text-muted w-4 flex-shrink-0">E</span>
                                            <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                                                <div className={`h-full rounded-full ${slide.engagement >= 80 ? "bg-success" : slide.engagement >= 60 ? "bg-warning" : "bg-danger"
                                                    }`} style={{ width: `${slide.engagement}%` }} />
                                            </div>
                                            <span className={`text-[10px] font-bold w-8 text-right ${slide.engagement >= 80 ? "text-success" : slide.engagement >= 60 ? "text-warning" : "text-danger"
                                                }`}>{slide.engagement}%</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 flex-1">
                                            <span className="text-[10px] text-muted w-4 flex-shrink-0">C</span>
                                            <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                                                <div className={`h-full rounded-full ${slide.confusion <= 15 ? "bg-success/60" : slide.confusion <= 30 ? "bg-warning/60" : "bg-danger/60"
                                                    }`} style={{ width: `${slide.confusion}%` }} />
                                            </div>
                                            <span className={`text-[10px] font-bold w-8 text-right ${slide.confusion <= 15 ? "text-success" : slide.confusion <= 30 ? "text-warning" : "text-danger"
                                                }`}>{slide.confusion}%</span>
                                        </div>
                                    </div>

                                    {/* Marker label */}
                                    {slide.marker && (
                                        <div className="mt-2">
                                            <Badge variant={slide.status === "dip" ? "danger" : slide.status === "peak" ? "success" : "default"} size="sm">
                                                {slide.marker.label}
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                            </button>
                        </div>
                    </StaggerItem>
                );
            })}

            <StaggerItem>
                <div className="flex items-center gap-3 mt-4 text-[10px] text-muted px-4">
                    <span className="flex items-center gap-1"><span className="font-semibold">E</span> = Engagement</span>
                    <span className="flex items-center gap-1"><span className="font-semibold">C</span> = Confusion</span>
                </div>
            </StaggerItem>
        </StaggerContainer>
    );
}
