import { useTimer } from "../hooks/useTimer.ts";
import { Timer } from "./Timer.tsx";
import { CancelButton } from "./CancelButton.tsx";
import { IntervalsBar } from "./IntervalsBar.tsx";
import { timeFormatter, timeFormatterSeconds } from "../util/timeFormatter.ts";
import type { ClientQuest } from "../api.ts";
import "../styles/QuestItem.css";
import { MessageBox } from "./MessageBox.tsx";

type QuestItemProps = {
  quest: ClientQuest,
  skipBreakAction: () => void,
  skipTransitionAction: () => void,
  isLoading: boolean
}

export function QuestItem({ quest, skipBreakAction, skipTransitionAction, isLoading }: QuestItemProps) {
  const { remaining: remainingTotal } = useTimer(quest.remainingTotalTimeMs);
  const { remaining: remainingCurrentInterval } = useTimer(
    quest.currentInterval.remaining,
  );

  const isBreakMode = quest.currentInterval.status !== "work";
  const timerPercent = !isBreakMode
    ? Math.round((remainingCurrentInterval / quest.intervalDurationMs) * 100)
    : 100;

  const transitionToWorkText = quest.currentInterval.index == 0
    ? `The quest will start in: ${timeFormatterSeconds(remainingCurrentInterval)}...`
    : `The break is over. The next stage will start in: ${timeFormatterSeconds(remainingCurrentInterval)}... `;

  const transitionToBreakText = `Congratulations! You have completed stage ${quest.currentInterval.index + 1}. Your break will start in: ${timeFormatterSeconds(remainingCurrentInterval)}... `;

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
              currentIntervalIdx={quest.currentInterval.index + (isBreakMode && quest.currentInterval.status != "transitionToWork" ? 1 : 0)}
              intervalCount={quest.intervalsCount}
              timerPercent={timerPercent}
            />
          </div>
        </div>
        {
          quest.currentInterval.status === "transitionToWork"
            ? <MessageBox text={transitionToWorkText} buttons={isLoading ? undefined : [{ text: "Start now", onClick: skipBreakAction }]} />
            : quest.currentInterval.status === "transitionToBreak"
              ? <MessageBox text={transitionToBreakText} buttons={isLoading ? undefined : [{ text: "Skip break", onClick: skipTransitionAction }]} />
              : <Timer time={remainingCurrentInterval} />
        }
      </div>
    </>
  );
}
