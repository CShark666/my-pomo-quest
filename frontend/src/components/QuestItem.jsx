import { useEffect, useState } from "react";
import { useTimer } from "../hooks/useTimer";

import { Timer } from "./Timer";
import { CancelButton } from "./CancelButton";
import { IntervalsBar } from "./IntervalsBar";

import { getQuest, questTimeValidate } from "../api";
import { timeFormatter } from "../util/timeFormatter";

import "../styles/QuestItem.css";

export function QuestItem() {
  const [quest, setQuest] = useState(null);
  const { remaining, isRunning, setIsRunning, setRemaining } = useTimer(
    quest ? Number(quest.currentInterval.remaining) : 500,
  );

  useEffect(() => {
    const fetchQuest = async () => {
      const data = await getQuest();
      setQuest(data);
    };
    fetchQuest();
  }, []);

  useEffect(() => {
    if (quest) {
      setRemaining(Number(quest.currentInterval.remaining));
      setIsRunning(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quest?.currentInterval?.remaining]);

  useEffect(() => {
    if (!quest) return;

    const interval = setInterval(async () => {
      const validatedQuest = await questTimeValidate(quest);
      setQuest(validatedQuest);
      setRemaining(Number(validatedQuest.currentInterval.remaining));
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quest]);

  if (!quest) {
    return <h2>No quest :c</h2>;
  }

  let isBreakMode = quest.currentInterval.status === "break";
  let timerPercent = !isBreakMode
    ? Math.round((remaining / quest.intervalDurationInMs) * 100)
    : 100;

  return (
    <>
      <div className={isBreakMode ? "quest-item-break" : "quest-item"}>
        <div className="quest-item__cancel">
          <CancelButton />
        </div>
        <div className="quest-item__content">
          <div className="quest-item__total-time">
            <p>{timeFormatter(quest.remainingTotalTimeInMs)}</p>
          </div>
          <div>
            <div className="quest-item__meta">
              <p>
                #{quest.id} {quest.title}
              </p>
              <p>Status: {quest.currentInterval.status}</p>
              {isBreakMode && `${quest.breaks.currentBreak}`}
            </div>
            <IntervalsBar
              intervals={quest.intervals}
              currentIntervalIndex={quest.currentInterval.index}
              timerPercent={timerPercent}
            />
          </div>
        </div>
        <Timer time={remaining} />
      </div>
    </>
  );
}
