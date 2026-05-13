import { useEffect, useState } from "react";
import { hasActiveQuest } from "../api.js";
import { Sidebar } from "./Sidebar";
import { QuestItem } from "../components/QuestItem";
import { CreatingQuesForm } from "../components/CreatingQuesForm";
import "../styles/QuestPage.css";

export function QuestPage() {
  const [isQuestActive, setIsQuestActive] = useState(false);

  useEffect(() => {
    const fetchQuestStatus = async () => {
      const isActive = await hasActiveQuest();
      setIsQuestActive(isActive);
    };

    fetchQuestStatus();
  });

  return (
    <>
      <Sidebar />
      <h1>QuestPage:</h1>
      <div className="quest-box">
        {isQuestActive ? (
          <QuestItem />
        ) : (
          <CreatingQuesForm setQuestActive={setIsQuestActive} />
        )}
      </div>
    </>
  );
}
