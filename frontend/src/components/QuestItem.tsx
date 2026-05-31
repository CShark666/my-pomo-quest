import { useTimer } from "../hooks/useTimer.ts";
import { Timer } from "./Timer.tsx";
import { CancelButton } from "./CancelButton.tsx";
import { IntervalsBar } from "./IntervalsBar.tsx";
import { MessageBox } from "./MessageBox.tsx";
import { PopupWindow } from "./PopupWindow.tsx";
import { type ClientQuest } from "../api.ts";
import { timeFormatter, timeFormatterSeconds } from "../util/timeFormatter.ts";


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
      <div className="quest-item flex flex-col w-full max-w-3xl min-w-2xs p-1">
        <div className="quest-item__cancel flex justify-end">
          <CancelButton />
        </div>
        <div className="quest-item__content flex items-center">
          <div className={`quest-item__total-time flex shrink-0 justify-center items-center w-28 h-28 rounded-full bg${isBreakMode ? "-break/50" : "-work/50"} text-white`}>
            <p>
              {timeFormatter(
                isBreakMode ? quest.remainingTotalTimeMs : remainingTotal,
              )}
            </p>
          </div>
          <div>
            <div className="quest-item__meta w-full flex justify-between">
              <p>
                #{quest.id} {quest.title}
              </p>
              <p>Status: {quest.currentInterval.status}</p>
            </div>
            <IntervalsBar
              currentIntervalIdx={quest.currentInterval.index + (isBreakMode && quest.currentInterval.status != "transitionToWork" ? 1 : 0)}
              intervalCount={quest.intervalsCount}
              timerPercent={timerPercent}
              isBreakMode={isBreakMode}
            />
          </div>
        </div>
        {
          quest.currentInterval.status === "transitionToWork"
            ? <MessageBox text={transitionToWorkText} buttons={isLoading ? undefined : [{ text: "Start now", onClick: skipBreakAction }]} />
            : quest.currentInterval.status === "transitionToBreak"
              ? <MessageBox text={transitionToBreakText} buttons={isLoading ? undefined : [{ text: "Skip break", onClick: skipTransitionAction }]} />
              : <Timer time={remainingCurrentInterval} isBreakMode={isBreakMode} />
        }
        {isBreakMode && quest.currentInterval.status != "transitionToWork" && quest.currentInterval.status != "transitionToBreak"
          &&
          <div className="flex justify-center">
            <PopupWindow
              title="Skip break"
              description="Are you sure you want to skip this break and move on to the next stage?"
              buttons={isLoading ? undefined : [{ text: "Yes! Skip break", onClick: skipBreakAction }]}
            />
          </div>}
      </div>
    </>
  );
}
