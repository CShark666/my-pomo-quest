import { Sidebar } from "./Sidebar.jsx";
import { QuestItem } from "../components/QuestItem.jsx";
import { CreatingQuestForm } from "../components/CreatingQuestForm.jsx";
import "../styles/QuestPage.css";

export function QuestPage() {
  const isQuestActive = false;

  return (
    <>
      <Sidebar />
      <h1>QuestPage:</h1>
      <div className="quest-box">
        {isQuestActive ? (
          <QuestItem />
        ) : (
          <CreatingQuestForm setQuestActive={() => {}} />
        )}
      </div>
    </>
  );
}
