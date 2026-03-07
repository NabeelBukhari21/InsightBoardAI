"use client";

import React from "react";
import Card from "@/components/ui/Card";
import { enrichedSlides } from "@/data/mockData";
import { StaggerContainer, StaggerItem } from "@/components/motion/MotionKit";

export default function SessionSummaryBar() {
    const avgEngagement = Math.round(enrichedSlides.reduce((s, sl) => s + sl.engagement, 0) / enrichedSlides.length);
    const avgConfusion = Math.round(enrichedSlides.reduce((s, sl) => s + sl.confusion, 0) / enrichedSlides.length);
    const totalDuration = enrichedSlides.reduce((s, sl) => s + sl.duration, 0);
    const dipSlide = enrichedSlides.find((s) => s.status === "dip");
    const peakSlide = enrichedSlides.find((s) => s.status === "peak");

    const stats = [
        { label: "Session Avg", value: `${avgEngagement}%`, color: "text-accent-light", icon: "📊" },
        { label: "Duration", value: `${totalDuration} min`, color: "text-foreground", icon: "⏱️" },
        { label: "Slides", value: "6", color: "text-foreground", icon: "📄" },
        { label: "Biggest Dip", value: dipSlide ? `S${dipSlide.id}: ${dipSlide.engagement}%` : "N/A", color: "text-danger", icon: "📉" },
        { label: "Peak", value: peakSlide ? `S${peakSlide.id}: ${peakSlide.engagement}%` : "N/A", color: "text-success", icon: "📈" },
        { label: "Avg Confusion", value: `${avgConfusion}%`, color: avgConfusion > 25 ? "text-warning" : "text-success", icon: "🤔" },
    ];

    return (
        <StaggerContainer delay={0.1} stagger={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {stats.map((stat, i) => (
                    <StaggerItem key={i}>
                        <Card className="text-center py-3 px-2" hover>
                            <span className="text-lg mb-1 block">{stat.icon}</span>
                            <div className={`text-xl font-extrabold ${stat.color} mb-0.5`}>{stat.value}</div>
                            <div className="text-[10px] text-muted">{stat.label}</div>
                        </Card>
                    </StaggerItem>
                ))}
            </div>
        </StaggerContainer>
    );
}
