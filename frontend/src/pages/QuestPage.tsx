import { QuestItem } from "../components/QuestItem.tsx";
import { CreatingQuestForm } from "../components/CreatingQuestForm.tsx";
import { useContext, useEffect, useTransition } from "react";
import { skipTransitionToBreak, getQuest, skipBreak } from '../api.ts'
import { QuestContext } from "../contexts/QuestContext.ts";

function QuestPageContent() {
  const questContext = useContext(QuestContext);
  const quest = questContext.quest;
  const setQuest = questContext.setQuest;
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (quest) {
      const id = setTimeout(
        async () => getQuest().then(setQuest),
        quest.currentInterval.remaining,
      );
      return () => clearInterval(id);
    }
  }, [quest, setQuest]);

  const skipBreakAction = () => {
    startTransition(async () => {
      setQuest(await skipBreak());
    })
  }

  const skipTransitionAction = () => {
    startTransition(async () => {
      setQuest(await skipTransitionToBreak());
    })
  }

  return (
    <div className="flex justify-center">
      {quest
        ? <QuestItem quest={quest} skipBreakAction={skipBreakAction} skipTransitionAction={skipTransitionAction} isLoading={isPending} />
        : <CreatingQuestForm setQuest={setQuest} />
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
