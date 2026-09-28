import type { QuestResponse } from "../../types/types";
import { timeFormatter } from "../../util/timeFormatter";

function QuestsHistoryTable({ questsHistory }: { questsHistory: Array<QuestResponse> }) {
    return <>
        <div className="overflow-x-auto bg-[#d7b594] outline-[#c09473] outline-8 rounded-md">
            <table className="table table-x">
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Total time</th>
                        <th>Intervals count</th>
                        <th>Created</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {questsHistory.map((quest: QuestResponse, i: number) => {
                        return <tr>
                            <th>{i + 1}</th>
                            <td>{quest.title}</td>
                            <td>{quest.category}</td>
                            <td>{timeFormatter(quest.totalTimeMs)}</td>
                            <td>{quest.intervalsCount}</td>
                            <td>{quest.createdAt}</td>
                            <td>{quest.status}</td>
                        </tr>
                    })}
                </tbody>
                <tfoot>

                </tfoot>
            </table>
        </div>
    </>
}

export default QuestsHistoryTable;