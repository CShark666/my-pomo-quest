import { createContext } from "react";
import type { ClientQuest } from "../types/types";

interface QuestContextType {
    quest: ClientQuest | null;
    setQuest: (quest: ClientQuest | null) => void;
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