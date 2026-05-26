import { Sidebar } from "./Sidebar.jsx";
import { QuestItem } from "../components/QuestItem.jsx";
import { CreatingQuestForm } from "../components/CreatingQuestForm.jsx";
import "../styles/QuestPage.css";
import { useEffect, useState } from "react";
import { getQuest } from "../api.js";

export function QuestPage() {
  const [quest, setQuest] = useState(false);

  useEffect(() => {
    if (quest) {
      const id = setTimeout(
        async () => getQuest().then(setQuest).quest.currentInterval.remaining,
      );
      return clearInterval(id);
    }
  }, [quest]);

  useEffect(() => {
    getQuest().then(setQuest);
  }, []);

  return (
    <>
      <Sidebar />
      <h1>QuestPage:</h1>
      <div className="quest-box">
        {quest ? (
          <QuestItem quest={quest} />
        ) : (
          <CreatingQuestForm setQuest={setQuest} />
        )}
      </div>
    </>
  );
}
