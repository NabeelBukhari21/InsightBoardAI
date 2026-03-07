import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { engagementTimeline, session } from "@/data/mockData";

const PRESAGE_DATA_PATH = path.join(process.cwd(), "src/data/presageData.json");

export async function GET() {
    try {
        const raw = await readFile(PRESAGE_DATA_PATH, "utf-8");
        const data = JSON.parse(raw);
        return NextResponse.json(data);
    } catch {
        // File not present or unreadable — return mock data shaped as presageData
        const fallback = {
            source: "mock-fallback",
            apiVersion: "n/a",
            processedAt: new Date().toISOString(),
            timeline: engagementTimeline,
            slideEngagement: session.map((s) => ({ id: s.id, engagement: s.engagement })),
            rawMetrics: { hr: [], rr: [] },
        };
        return NextResponse.json(fallback);
    }
}
