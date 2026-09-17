import { useEffect, useState } from "react";
import QuestsHistoryTable from "../components/QuestHistoryPage/QuestsHistoryTable";
import { getQuestsHistory } from "../api/questAPI";
import type { QuestResponse } from "../types/types";

function QuestsHistoryPage() {
    const [questsHistory, setQuestsHistory] = useState<Array<QuestResponse> | null>(null);

    useEffect(() => {
        getQuestsHistory()
            .then(setQuestsHistory)
    }, [])

    return <>
        {
            questsHistory
                ? <QuestsHistoryTable questsHistory={questsHistory} />
                : "There is no history yet..."
        }
    </>
}

export default QuestsHistoryPage;