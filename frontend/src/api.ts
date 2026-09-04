import apiClient from "./apiClient";
import type {
    CreateQuestRequest,
    ClientQuest,
} from "./types/types";

const DELAY_DURATION_MS = 300


export function delay(ms = DELAY_DURATION_MS) {
    return new Promise((r) => setTimeout(r, ms));
}

export async function createQuest(request: CreateQuestRequest): Promise<ClientQuest | null> {

    await apiClient.post("/quest/create", {
        Category: request.category,
        Title: request.title,
        TotalTimeMs: request.totalTimeMs,
        IntervalCount: request.intervalsCount,
        Breaks: request.breaks
    });

    return await getQuest();
}

export async function getQuest(): Promise<ClientQuest | null> {
    try {
        const res = await apiClient.get("/quest/current");

        console.log(`quest: ${JSON.stringify(res.data, null, 2)}`)

        return res.data;
    } catch {
        return null;
    }
}


export async function skipTransitionToBreak(): Promise<ClientQuest | null> {
    try {
        const res = await apiClient.get("/quest/skip_transition_to_break");

        console.log(`quest: ${JSON.stringify(res.data, null, 2)}`)

        return res.data;
    } catch {
        return null;
    }
}

export async function skipBreak(): Promise<ClientQuest | null> {
    try {
        const res = await apiClient.get("/quest/skip_break");

        console.log(`quest: ${JSON.stringify(res.data, null, 2)}`)

        return res.data;
    } catch {
        return null;
    }
}

export async function cancelQuest() {
    await apiClient.get("/quest/cancel");
}
