import { createContext } from "react";
import type { ClientQuest } from "../types/types";

interface QuestContextType {
    quest: ClientQuest | null;
    skipBreakAction: () => void;
    skipTransitionAction: () => void;
    remainingTotal: number;
    remainingCurrentInterval: number;
    isPending: boolean;
}

export const QuestContext = createContext<QuestContextType>({
    quest: null,
    skipBreakAction: () => { },
    skipTransitionAction: () => { },
    remainingTotal: 0,
    remainingCurrentInterval: 0,
    isPending: false
})