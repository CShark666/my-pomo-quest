import questClient from "./questClient";
import type {
    CreateQuestRequest,
    ClientQuest,
} from "../types/types";

const DELAY_DURATION_MS = 300


export function delay(ms = DELAY_DURATION_MS) {
    return new Promise((r) => setTimeout(r, ms));
}

export async function createQuest(request: CreateQuestRequest): Promise<ClientQuest | null> {

    await questClient.post("/quest/create", {
        Category: request.category,
        Title: request.title,
        TotalTimeMs: request.totalTimeMs,
        IntervalCount: request.intervalsCount,
        Breaks: request.breaks
    });

    return await getQuest();
}

export async function getQuest(): Promise<ClientQuest | null> {
    return await questClient
        .get("/quest/current")
        .then(res => res.data);
}


export async function skipTransitionToBreak(): Promise<ClientQuest | null> {
    return await questClient
        .post("/quest/skip_transition_to_break")
        .then(res => res.data);
}

export async function skipBreak(): Promise<ClientQuest | null> {
    return await questClient
        .post("/quest/skip_break")
        .then(res => res.data);
}

export async function cancelQuest() {
    await questClient
        .post("/quest/cancel");
}
