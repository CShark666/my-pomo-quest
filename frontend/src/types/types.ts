export type QuestStatus = "inProgress" | "finished" | "cancelled"

export type BreakType = "short" | "long"

export type BreakConfig = Record<BreakType, number> | null

export type IntervalStatus = "work" | "break" | "transitionToWork" | "transitionToBreak"

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

export type DbQUest = {
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

export type ClientQuest = DbQUest & {
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

export type UserCredential = {
    login: string,
    password: string,
    id: number
}

export type UserData = {
    id: number,
    name: string,
    experience: number,
    completedQuests: number
}

export type ClientUser = UserData & {
    level: number
}