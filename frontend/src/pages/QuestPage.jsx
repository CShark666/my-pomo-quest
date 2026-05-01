import { Sidebar } from "./Sidebar";
import { QuestItem } from "../components/QuestItem";
import { getQuest } from "../api";
import { useEffect, useState } from "react";

export function QuestPage() {
  const [quest, setQuest] = useState({});

  useEffect(() => {
    const fetchDate = async () => {
      const response = await getQuest();
      setQuest(response);
    };

    fetchDate();
  });
  return (
    <>
      QuestPage
      <Sidebar />
      <QuestItem quest={quest}/>
    </>
  );
}
