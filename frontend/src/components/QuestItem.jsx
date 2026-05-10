import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTimer } from "../hooks/useTimer";
import { timeFormatter } from "../util/timeFormatter";
import { IntervalsBar } from "./IntervalsBar";
import { Timer } from "./Timer";
import { CancelButton } from "./CancelButton";
import { cancelQuest } from "../api";
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

  const { remaining, isRunning, setIsRunning, setRemaining } = useTimer(
    quest.timeIntervalInMs,
  );

  const [showWindow, setShowWindow] = useState(false);
  const [isBreakMode, setBreakMode] = useState(false);
  const [breakTime, setBreakTime] = useState(
    !quest.breaks.disabled ? Number(quest.breaks.shortBreak) : 0,
  );
  const [isFinished, setFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
      currentIntervalIndex <= 0 ? setFinished(true) : setShowWindow(true);
    };

    const handleBreakEnd = () => {
      setShowWindow(true);
      setBreakTime((prev) => {
        if (prev === quest.breaks.shortBreak) {
          return quest.breaks.longBreak;
        }
        return quest.breaks.shortBreak;
      });
    };

    if (isRunning) return;

    if (isBreakMode) {
      handleBreakEnd();
      return;
    }

    handleIntervalsEnd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  let timerPercent = !isBreakMode
    ? Math.round((remaining / quest.timeIntervalInMs) * 100)
    : 100;
  const isBreaksEnabled = quest.breaks.disabled;

  const endQuest = async () => {
    await cancelQuest();
    navigate("/");
  };

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
              intervals={intervalsRemaining}
              currentIntervalIndex={currentIntervalIndex}
              timerPercent={timerPercent}
            />
          </div>
        </div>
        {isFinished ? (
          <>
            <span>
              Congratulations! <b>You have completed your quest!</b> You have
              completed all {quest.amountOfIntervals} stages!
            </span>

            <button onClick={endQuest}>Back to main page</button>
          </>
        ) : (
          <Timer time={remaining} />
        )}
      </div>
      {showWindow &&
        (isBreakMode || isBreaksEnabled ? (
          <div className="overlay">
            <div className="dialog-window">
              <span> The break is over – time to get back to work!</span>
              <div>
                <button
                  onClick={() => {
                    setShowWindow(false);
                    setBreakMode(false);
                    setRemaining(quest.timeIntervalInMs);
                    setIsRunning(true);
                  }}
                >
                  Start next interval.
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="overlay">
            <div className="dialog-window">
              <span>Well done! You've successfully completed this stage!</span>
              <div>
                <button
                  onClick={() => {
                    setShowWindow(false);
                    setBreakMode(true);
                    setRemaining(breakTime);
                    setIsRunning(true);
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
        ))}
    </>
  );
}
