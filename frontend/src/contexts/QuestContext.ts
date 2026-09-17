import { createContext } from "react";
import type { CurrentQuest } from "../types/types";

interface QuestContextType {
    quest: CurrentQuest | null;
    setQuest: (quest: CurrentQuest | null) => void;
    skipBreakAction: () => void;
    skipTransitionAction: () => void;
    remainingTotal: number;
    remainingCurrentInterval: number;
    isPending: boolean;
}

export const QuestContext = createContext<QuestContextType>({
    quest: null,
    setQuest: () => { },
    skipBreakAction: () => { },
    skipTransitionAction: () => { },
    remainingTotal: 0,
    remainingCurrentInterval: 0,
    isPending: false
})