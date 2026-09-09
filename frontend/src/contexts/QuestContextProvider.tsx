import { useEffect, useState, useTransition, type ReactNode } from "react";
import { QuestContext } from "./QuestContext";
import type { ClientQuest } from "../types/types";
import { getQuest, skipBreak, skipTransitionToBreak } from "../api/questAPI";
import { useTimer } from "../hooks/useTimer";

export function QuestContextProvider({ children }: { children: ReactNode }) {
    const [quest, setQuest] = useState<ClientQuest | null>(null);
    const [isPending, startTransition] = useTransition();


    useEffect(() => {
        getQuest()
            .then(setQuest)
    }, [])

    useEffect(() => {
        if (quest) {
            const id = setTimeout(
                async () => getQuest().then(setQuest),
                quest.currentInterval.remaining,
            );
            return () => clearInterval(id);
        }
    }, [quest, setQuest]);

    const { remaining: remainingTotal } = useTimer(quest ? quest.remainingTotalTimeMs : 0);
    const { remaining: remainingCurrentInterval } = useTimer(quest ? quest.currentInterval.remaining : 0);

    const skipBreakAction = () => {
        startTransition(async () => {
            setQuest(await skipBreak());
        })
    }

    const skipTransitionAction = () => {
        startTransition(async () => {
            setQuest(await skipTransitionToBreak());
        })
    }

    return (
        <QuestContext.Provider value={{ quest, setQuest, remainingTotal, remainingCurrentInterval, skipBreakAction, skipTransitionAction, isPending }}>
            {children}
        </QuestContext.Provider>
    )
}