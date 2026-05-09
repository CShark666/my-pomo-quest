import { useEffect, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import { timeFormatter } from "../util/timeFormatter";
import { IntervalsBar } from "./IntervalsBar";
import { Timer } from "./Timer";
import { CancelButton } from "./CancelButton";
import "../styles/QuestItem.css";

export function QuestItem({ quest }) {
  const [intervalsRemaining, setIntervalsRemaining] = useState(
    Array.from({ length: quest.amountOfIntervals }, () => ({
      completed: false,
    })),
  );

  const [currentIntervalIndex, setCurrentIntervalIndex] = useState(
    quest.amountOfIntervals - 1,
  );

  const { remaining, isRunning, setIsRunning } = useTimer(
    quest.timeIntervalInMs,
  );

  const [showWindow, setShowWindow] = useState(false);
  const [isBreak, setBreak] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      const handleIntervalsEnd = () => {
        setIntervalsRemaining((prev) => {
          const copy = [...prev];
          copy[currentIntervalIndex] = {
            ...copy[currentIntervalIndex],
            completed: true,
          };
          return copy;
        });
        setCurrentIntervalIndex((prev) => prev - 1);
        setShowWindow(true);
      };
      handleIntervalsEnd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  let timerPercent = Math.round((remaining / quest.timeIntervalInMs) * 100);

  return (
    <>
      <div className={isBreak ? "quest-item-break" : "quest-item"}>
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
              intervals={intervalsRemaining}
              currentIntervalIndex={currentIntervalIndex}
              timerPercent={timerPercent}
            />
          </div>
        </div>
        <Timer time={remaining} />
      </div>
      {showWindow && (
        <div className="overlay">
          <div className="dialog-window">
            <span>Well done! You've successfully completed this stage!</span>
            <div>
              <button
                onClick={() => {
                  setShowWindow(false);
                  setBreak(true);
                }}
              >
                Start break
              </button>
              <button
                onClick={() => {
                  setShowWindow(false);
                  setIsRunning(true);
                }}
              >
                Skip break
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
