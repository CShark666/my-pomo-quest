import { useEffect, useState } from "react";
import QuestsHistoryTable from "../components/QuestHistoryPage/QuestsHistoryTable";
import { getQuestsHistory } from "../api/questAPI";
import type { QuestResponse } from "../types/types";
import type { CalendarHistory } from "../components/Calendar";
import Calendar from "../components/Calendar";

function QuestsHistoryPage() {
    const [questsHistory, setQuestsHistory] = useState<Array<QuestResponse> | null>(null);

    useEffect(() => {
        getQuestsHistory()
            .then(setQuestsHistory)
    }, [])

    const today = new Date;
    const mothHistory: Array<CalendarHistory> | null = questsHistory && questsHistory
        .filter(quest => new Date(quest.createdAt).getMonth() === today.getMonth())
        .map(quest => ({
            date: new Date(quest.createdAt),
            activity: quest.status === "Finished"
        }))

    return <>
        <div className="flex w-full p-5 justify-center gap-2.5">
            <div className="flex-1">
                <div className="w-full">
                    <Calendar monthWithHistory={mothHistory} />
                </div>
            </div>
            <div className="flex-1">
                {
                    questsHistory
                        ? <QuestsHistoryTable questsHistory={questsHistory} />
                        : "There is no history yet..."
                }
            </div>
        </div>
    </>
}

export default QuestsHistoryPage;