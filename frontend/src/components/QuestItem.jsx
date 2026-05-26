import { useTimer } from "../hooks/useTimer";
import { Timer } from "./Timer";
import { CancelButton } from "./CancelButton";
import { IntervalsBar } from "./IntervalsBar";
import { timeFormatter } from "../util/timeFormatter";

import "../styles/QuestItem.css";

export function QuestItem({ quest }) {
  const { remaining: remainingTotal } = useTimer(quest.remainingTotalTimeMs);
  const { remaining: remainingCurrentInterval } = useTimer(quest.currentInterval.remaining);

  let isBreakMode = quest.currentInterval.status !== "work";
  let timerPercent = !isBreakMode
    ? Math.round((remainingCurrentInterval / quest.intervalDurationMs) * 100)
    : 0;

  return (
    <>
      <div className={isBreakMode ? "quest-item-break" : "quest-item"}>
        <div className="quest-item__cancel">
          <CancelButton />
        </div>
        <div className="quest-item__content">
          <div className="quest-item__total-time">
            <p>{timeFormatter(isBreakMode ? quest.remainingTotalTimeMs : remainingTotal)}</p>
          </div>
          <div>
            <div className="quest-item__meta">
              <p>
                #{quest.id} {quest.title}
              </p>
              <p>Status: {quest.currentInterval.status}</p>
            </div>
            <IntervalsBar
              currentIntervalIdx={quest.currentInterval.index}
              intervalCount={quest.intervalsCount}
              timerPercent={timerPercent}
            />
          </div>
        </div>
        <Timer time={remainingCurrentInterval} />
      </div>
    </>
  );
}
