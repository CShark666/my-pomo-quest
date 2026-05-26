import { Sidebar } from "./Sidebar.jsx";
import { QuestItem } from "../components/QuestItem.tsx";
import { CreatingQuestForm } from "../components/CreatingQuestForm.tsx";
import "../styles/QuestPage.css";
import { useEffect, useState } from "react";
import { getQuest } from "../api.ts";
import type { ClientQuest } from "../api.ts";

export function QuestPage() {
  const [quest, setQuest] = useState<ClientQuest | null>(null);

  useEffect(() => {
    if (quest) {
      const id = setTimeout(
        async () => getQuest().then(setQuest),
        quest.currentInterval.remaining,
      );
      return () => clearInterval(id);
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
