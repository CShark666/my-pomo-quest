import { useEffect, useState, useTransition, type ReactNode } from "react";
import { QuestContext } from "./QuestContext";
import type { CurrentQuest } from "../types/types";
import { getQuest, skipBreak, skipTransitionToBreak } from "../api/questAPI";
import { useTimer } from "../hooks/useTimer";

export function QuestContextProvider({ children }: { children: ReactNode }) {
    const [quest, setQuest] = useState<CurrentQuest | null>(null);
    const [isPending, startTransition] = useTransition();


    useEffect(() => {
        getQuest()
            .then(setQuest)
    }, [])

    useEffect(() => {
        if (!quest) return;

        if (quest.status === "Finished") {
            return;
        }

        const id = setTimeout(async () => {
            const newQuest = await getQuest();
            setQuest(newQuest);
        }, quest.currentInterval.remaining);

        return () => clearTimeout(id);
    }, [quest]);

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

    const dismissFinishedQuestAction = () => {
        setQuest(null);
    };

    return (
        <QuestContext.Provider value={{
            quest,
            setQuest,
            remainingTotal,
            remainingCurrentInterval,
            skipBreakAction,
            skipTransitionAction,
            finishQuestAction: dismissFinishedQuestAction,
            isPending
        }}>
            {children}
        </QuestContext.Provider>
    )
}