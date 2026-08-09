import { createContext } from "react";
import type { ClientQuest } from "../types/types";

interface QuestContextType {
    quest: ClientQuest | null,
    setQuest: (quest: ClientQuest | null) => void;
}

export const QuestContext = createContext<QuestContextType>({
    quest: null,
    setQuest: () => { }
})