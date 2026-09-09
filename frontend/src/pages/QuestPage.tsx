import QuestItem from "../components/QuestPage/QuestItem/QuestItem.tsx";
import CreatingQuestForm from "../components/QuestPage/CreatingQuest/CreatingQuestForm.tsx";
import { useContext } from "react";
import { QuestContext } from "../contexts/QuestContext.ts";

function QuestPageContent() {
  const questContext = useContext(QuestContext);

  return (
    <div className="flex justify-center">
      {questContext.quest
        ? <QuestItem
          quest={questContext.quest}
          skipBreakAction={questContext.skipBreakAction}
          skipTransitionAction={questContext.skipTransitionAction}
          isLoading={questContext.isPending}
          remainingTotal={questContext.remainingTotal}
          remainingCurrentInterval={questContext.remainingCurrentInterval} />
        : <CreatingQuestForm setQuest={questContext.setQuest} />
      }
    </div>
  )
}

export function QuestPage() {

  return (
    <>
      <QuestPageContent />
    </>
  );
}
