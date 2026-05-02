import { Sidebar } from "./Sidebar";
import { QuestItem } from "../components/QuestItem";
import { getQuest } from "../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../styles/QuestPage.css";

export function QuestPage() {
  const [quest, setQuest] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchDate = async () => {
      const response = await getQuest();
      setQuest(response);
    };

    fetchDate();
  });
  return (
    <>
      <Sidebar />
      <h1>QuestPage: {id}</h1>
      <div className="quest-box">
        <QuestItem quest={quest} />
      </div>
    </>
  );
}
