import questClient from "./questClient";
import type {
    CreateQuestRequest,
    CurrentQuest,
    QuestResponse,
} from "../types/types";

export async function createQuest(request: CreateQuestRequest): Promise<CurrentQuest | null> {

    await questClient.post("/quest/create", {
        Category: request.category,
        Title: request.title,
        TotalTimeMs: request.totalTimeMs,
        IntervalCount: request.intervalsCount,
        Breaks: request.breaks
    });

    return await getQuest();
}

export async function getQuest(): Promise<CurrentQuest | null> {
    return await questClient
        .get("/quest/current")
        .then(res => res.data);
}


export async function skipTransitionToBreak(): Promise<CurrentQuest | null> {
    return await questClient
        .post("/quest/skip_transition_to_break")
        .then(res => res.data);
}

export async function skipBreak(): Promise<CurrentQuest | null> {
    return await questClient
        .post("/quest/skip_break")
        .then(res => res.data);
}

export async function cancelQuest() {
    await questClient
        .post("/quest/cancel");
}

export async function getQuestsHistory(): Promise<Array<QuestResponse> | null> {
    return await questClient
        .get("/quest/history")
        .then(res => res.data);
}
