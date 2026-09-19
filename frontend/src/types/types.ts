export type QuestStatus = "InProgress" | "Finished" | "Cancelled"

export type BreakType = "short" | "long"

export type BreakConfig = Record<BreakType, number> | null

export type IntervalStatus = "Work" | "Break" | "TransitionToWork" | "TransitionToBreak"

export type IntervalState = {
    index: number,
    status: IntervalStatus,
    started: number
}
export type IntervalStateFull = IntervalState & {
    remaining: number
}

export type CreateQuestRequest = {
    category: string,
    title: string,
    totalTimeMs: number,
    intervalsCount: number,
    breaks: BreakConfig,
}

export type QuestResponse = {
    id: number,
    category: string
    title: string,
    status: QuestStatus
    totalTimeMs: number,
    intervalsCount: number,
    breaks: BreakConfig,
    createdAt: string,
}

export type CurrentQuest = QuestResponse & {
    intervalDurationMs: number,
    remainingTotalTimeMs: number,
    currentInterval: IntervalStateFull
}

// User

export type UserRegistrationRequest = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export type UserLoginRequest = {
    email: string,
    password: string
}

export type ClientUser = {
    id: number,
    name: string,
    email: string,
    level: number,
    currentExperience: number
}