import { Sidebar } from "./Sidebar";
import { QuestItem } from "../components/QuestItem";
import { CreatingQuesForm } from "../components/CreatingQuesForm";
import { getQuest } from "../api";
import { useState } from "react";
import { useParams } from "react-router";
import "../styles/QuestPage.css";

export function QuestPage() {
  const [currentQuest, setCurrentQuest] = useState(null);
  const { id } = useParams();

  // useEffect(() => {
  //   const fetchDate = async () => {
  //     const response = await getQuest();
  //     setCurrentQuest(response);
  //   };

  //   fetchDate();
  // });

  
  return (
    <>
      <Sidebar />
      <h1>QuestPage: {id}</h1>
      <div className="quest-box">
        {!currentQuest ? <CreatingQuesForm setCurrentQuest={setCurrentQuest} /> : <QuestItem quest={currentQuest} />}
      </div>
    </>
  );
}
