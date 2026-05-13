import { useEffect, useState } from "react";
import { useTimer } from "../hooks/useTimer";

import { Timer } from "./Timer";
import { CancelButton } from "./CancelButton";
import { IntervalsBar } from "./IntervalsBar";

import { getQuest } from "../api";
import { timeFormatter } from "../util/timeFormatter";

import "../styles/QuestItem.css";

export function QuestItem() {
  const [quest, setQuest] = useState(null);

  useEffect(() => {
    const fetchQuest = async () => {
      const data = await getQuest();
      setQuest(data);
    };
    fetchQuest();
  }, []);

  const { remaining, isRunning, setIsRunning, setRemaining } = useTimer(
    quest ? quest.intervalDurationInMs : 5000,
  );

  if (!quest) {
    return (
      <>
        <h2>No quest :c </h2>
      </>
    );
  }

  let timerPercent = 100;
  let isBreakMode = quest.breakStatus;

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
              <p>Status: {quest.status}</p>
            </div>
            <IntervalsBar
              intervals={quest.intervals}
              currentIntervalIndex={quest.currentIntervalIndex}
              timerPercent={timerPercent}
            />
          </div>
        </div>
        <Timer time={remaining} />
      </div>
    </>
  );
}
