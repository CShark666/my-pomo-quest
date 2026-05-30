import { Sidebar } from "./Sidebar.jsx";
import { QuestItem } from "../components/QuestItem.tsx";
import { CreatingQuestForm } from "../components/CreatingQuestForm.tsx";
import { LoadingSpinnerLabel } from "../components/Loading.tsx";
import { Suspense, use, useEffect, useState, useTransition } from "react";
import { type ClientQuest, skipTransitionToBreak, getQuest, skipBreak } from "../api.ts";

function QuestPageContent({ initialQuest }: { initialQuest: Promise<ClientQuest | null> }) {
  const [quest, setQuest] = useState<ClientQuest | null>(use(initialQuest));
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (quest) {
      const id = setTimeout(
        async () => getQuest().then(setQuest),
        quest.currentInterval.remaining,
      );
      return () => clearInterval(id);
    }
  }, [quest]);

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
      {quest ? (
        <QuestItem quest={quest} skipBreakAction={skipBreakAction} skipTransitionAction={skipTransitionAction} isLoading={isPending} />
      ) : (
        <CreatingQuestForm setQuest={setQuest} />
      )}
    </div>
  )
}

export function QuestPage() {
  const initialQuest = getQuest();

  return (
    <>
      <Sidebar />
      <Suspense fallback={<LoadingSpinnerLabel />}>
        <QuestPageContent initialQuest={initialQuest} />
      </Suspense>
    </>
  );
}
