const STORAGE_KEY = "pomoQuest";

function delay(ms = 300) {
    return new Promise((r) => setTimeout(r, ms));
}

const TRANSITION_DURATION_MS = 5000

type QuestStatus = "inProgress" | "finished" | "cancelled"

type BreakType = "short" | "long"
type BreakConfig = Record<BreakType, number> | null

type IntervalStatus = "work" | "break" | "transitionToWork" | "transitionToBreak"
type IntervalState = {
    index: number,
    status: IntervalStatus,
    started: number
}
type IntervalStateFull = IntervalState & {
    remaining: number
}

type CreateQuestRequest = {
    category: string,
    title: string,
    totalTimeMs: number,
    intervalsCount: number,
    breaks: BreakConfig,
}

type DbQUest = {
    id: string,
    category: string
    title: string,
    status: QuestStatus
    totalTimeMs: number,
    intervalsCount: number,
    breaks: BreakConfig,
    createdAt: number,

    currentInterval: IntervalState
}

type ClientQuest = DbQUest & {
    intervalDurationMs: number,
    remainingTotalTimeMs: number,
    currentInterval: IntervalStateFull
}

export async function createQuest(request: CreateQuestRequest): Promise<ClientQuest> {
    await delay();
    saveDbQuest({
        id: crypto.randomUUID(),
        category: request.category,
        title: request.title,
        status: "inProgress",
        totalTimeMs: request.totalTimeMs,
        intervalsCount: request.intervalsCount,
        breaks: request.breaks,
        createdAt: Date.now(),
        currentInterval: {
            index: 0,
            status: "work",
            started: Date.now()
        }
    })

    return await getQuest();
}

export async function getQuest(): Promise<ClientQuest> {
    await delay();

    const dbQuest: DbQUest = getDbQuest();

    const remainingIntervals = dbQuest.intervalsCount - dbQuest.currentInterval.index;
    const currentIntervalRemaining = getCurrentIntervalRemainingTime(dbQuest);

    let remainingTotalMs = remainingIntervals * getIntervalDuration(dbQuest);

    if (dbQuest.currentInterval.status === "work") {
        remainingTotalMs += currentIntervalRemaining;
    }

    return {
        ...dbQuest,
        intervalDurationMs: getIntervalDuration(dbQuest),
        remainingTotalTimeMs: remainingTotalMs,
        currentInterval: {
            ...dbQuest.currentInterval,
            remaining: currentIntervalRemaining
        }
    };
}

export async function forceStartBreak() {
    await delay();

    const dbQuest: DbQUest = getDbQuest();
    if (!dbQuest || dbQuest.status != "inProgress") return null;

    dbQuest.currentInterval.status = "break"
    dbQuest.currentInterval.started = Date.now();

    saveDbQuest(dbQuest);
}

export async function skipBreak() {
    await delay();

    const dbQuest: DbQUest = getDbQuest();
    if (!dbQuest || dbQuest.status != "inProgress") return null;

    dbQuest.currentInterval.index++
    dbQuest.currentInterval.status = "work"
    dbQuest.currentInterval.started = Date.now();

    saveDbQuest(dbQuest);
}

export async function cancelQuest() {
    await delay();

    removeQuest();
}

function fixDbQuestIfNeeded(dbQuest: DbQUest): boolean {
    if (dbQuest.status != 'inProgress') return false;
    let needsUpdate = false;

    while (getCurrentIntervalRemainingTime(dbQuest) < 0) {
        needsUpdate = true;
        if (dbQuest.currentInterval.index === dbQuest.intervalsCount - 1) {
            dbQuest.status = "finished"
            break;
        }

        if (dbQuest.currentInterval.status === "transitionToWork") {
            dbQuest.currentInterval.status = "work"
            dbQuest.currentInterval.started += TRANSITION_DURATION_MS
        } else if (dbQuest.currentInterval.status === "work") {
            dbQuest.currentInterval.status = "transitionToBreak"
            dbQuest.currentInterval.started += getIntervalDuration(dbQuest);
        } else if (dbQuest.currentInterval.status === "transitionToBreak") {
            dbQuest.currentInterval.status = "break"
            dbQuest.currentInterval.started += TRANSITION_DURATION_MS
        } else /*if (dbQuest.currentInterval.status === "break") */ {
            dbQuest.currentInterval.status = "transitionToWork"
            dbQuest.currentInterval.started += getBreakDuration(breakTypeForIndex(dbQuest.currentInterval.index), dbQuest.breaks)
            dbQuest.currentInterval.index++;
        }
    }

    return needsUpdate;
}

function breakTypeForIndex(index: number): BreakType {
    return index % 2 == 0 ? "short" : "long"
}

function getBreakDuration(breakType: BreakType, breaks: BreakConfig): number {
    return breaks?.[breakType] ?? 0;
}

function saveDbQuest(quest: DbQUest) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quest))
}

function getDbQuest(): DbQUest {
    const data = localStorage.getItem(STORAGE_KEY);
    const quest = JSON.parse(data!) as DbQUest;

    if (fixDbQuestIfNeeded(quest)) saveDbQuest(quest)

    return quest;
}

function removeQuest() {
    localStorage.removeItem(STORAGE_KEY);
}

function getCurrentIntervalRemainingTime(dbQuest: DbQUest): number {
    const currentIntervalTotalTime = dbQuest.currentInterval.status === 'work'
        ? getIntervalDuration(dbQuest)
        : dbQuest.currentInterval.status === 'break'
            ? getBreakDuration(breakTypeForIndex(dbQuest.currentInterval.index), dbQuest.breaks)
            : TRANSITION_DURATION_MS
    return currentIntervalTotalTime - (Date.now() - dbQuest.currentInterval.started)
}

function getIntervalDuration(dbQuest: DbQUest): number {
    return dbQuest.totalTimeMs / dbQuest.intervalsCount;
}
