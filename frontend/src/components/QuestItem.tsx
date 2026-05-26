import { useTimer } from "../hooks/useTimer.ts";
import { Timer } from "./Timer.tsx";
import { CancelButton } from "./CancelButton.tsx";
import { IntervalsBar } from "./IntervalsBar.tsx";
import { timeFormatter } from "../util/timeFormatter.ts";
import type { ClientQuest } from "../api.ts";

import "../styles/QuestItem.css";

export function QuestItem({ quest }: { quest: ClientQuest }) {
  const { remaining: remainingTotal } = useTimer(quest.remainingTotalTimeMs);
  const { remaining: remainingCurrentInterval } = useTimer(
    quest.currentInterval.remaining,
  );

  // eslint-disable-next-line prefer-const
  let isBreakMode = quest.currentInterval.status !== "work";
  // eslint-disable-next-line prefer-const
  let timerPercent = !isBreakMode
    ? Math.round((remainingCurrentInterval / quest.intervalDurationMs) * 100)
    : 100;

  return (
    <>
      <div className={isBreakMode ? "quest-item-break" : "quest-item"}>
        <div className="quest-item__cancel">
          <CancelButton />
        </div>
        <div className="quest-item__content">
          <div className="quest-item__total-time">
            <p>
              {timeFormatter(
                isBreakMode ? quest.remainingTotalTimeMs : remainingTotal,
              )}
            </p>
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
