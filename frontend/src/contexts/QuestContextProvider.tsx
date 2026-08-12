import { useEffect, useState, type ReactNode } from "react";
import { QuestContext } from "./QuestContext";
import type { ClientQuest } from "../types/types";
import { getQuest } from "../api";

export function QuestContextProvider({ children }: { children: ReactNode }) {
    const [quest, setQuest] = useState<ClientQuest | null>(null);

    useEffect(() => {
        getQuest()
            .then(setQuest)
    }, [])

    return (
        <QuestContext.Provider value={{ quest, setQuest }}>
            {children}
        </QuestContext.Provider>
    )
}