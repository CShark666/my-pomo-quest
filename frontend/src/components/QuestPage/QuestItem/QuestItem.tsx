import { useNavigate } from "react-router";
import { type CurrentQuest } from "../../../types/types.ts";
import { timeFormatter, timeFormatterSeconds } from "../../../util/timeFormatter.ts";
import Timer from "./Timer.tsx";
import CancelButton from "./CancelButton.tsx";
import IntervalsBar from "./IntervalsBar.tsx";
import MessageBox from "../../MessageBox.tsx";
import PopupWindow from "../../PopupWindow.tsx";
import TotalTimeDesk from "./TotalTimeDesk.tsx";
import QuestInfoScroll from "./QuestInfoScroll.tsx";



type QuestItemProps = {
  quest: CurrentQuest,
  skipBreakAction: () => void,
  skipTransitionAction: () => void,
  isLoading: boolean,
  remainingTotal: number
  remainingCurrentInterval: number
}

function QuestItem({ quest, skipBreakAction, skipTransitionAction, isLoading, remainingTotal, remainingCurrentInterval }: QuestItemProps) {
  const nav = useNavigate();

  const isStart = quest.currentInterval.status === "TransitionToWork" && quest.remainingTotalTimeMs === quest.totalTimeMs;
  const isBreakMode = quest.currentInterval.status !== "Work";
  const isTransitionMode = quest.currentInterval.status == "TransitionToWork" || quest.currentInterval.status == "TransitionToBreak";
  const timerPercent: number = !isBreakMode
    ? Math.round((remainingCurrentInterval / quest.intervalDurationMs) * 100)
    : 100;

  const questItemWidth = 950;
  const infoWidth = 250;
  const intervalsBarWidth = questItemWidth - infoWidth;

  const transitionToWorkText = quest.currentInterval.index == 0
    ? `The quest will start in: ${timeFormatterSeconds(remainingCurrentInterval)}...`
    : `The break is over. The next stage will start in: ${timeFormatterSeconds(remainingCurrentInterval)}... `;

  const transitionToBreakText = `Congratulations! You have completed stage ${quest.currentInterval.index + 1}. Your break will start in: ${timeFormatterSeconds(remainingCurrentInterval)}... `;
  const finishText = `Good job! You've successfully completed your quest "${quest.title}"!`;

  return (
    <>
      <div className={`quest-item flex flex-col w-[${questItemWidth}px] min-w-2xs`}>
        <div className="quest-item__cancel flex justify-end">
          <CancelButton />
        </div>
        <div className={`flex h-87.5`}>
          <div className={`w-[${infoWidth}px]`}>
            <TotalTimeDesk
              time={timeFormatter(
                isBreakMode
                  ? quest.remainingTotalTimeMs
                  : quest.status === "InProgress"
                    ? remainingTotal
                    : 0,
              )} />
            <QuestInfoScroll title={quest.title} status={quest.status} progress={`${quest.currentInterval.index}/${quest.intervalsCount}`} />
          </div>
          <div className={`w-[${intervalsBarWidth}]`}>
            <IntervalsBar
              currentIntervalIdx={quest.currentInterval.index + (isBreakMode && quest.currentInterval.status != "TransitionToWork" ? 1 : 0)}
              intervalCount={quest.intervalsCount}
              timerPercent={quest.status === "InProgress" ? timerPercent : 0}
              isBreakMode={isBreakMode}
              formWidth={intervalsBarWidth}
            />
          </div>
        </div>
        {
          (() => {
            switch (quest.status === "InProgress" ? quest.currentInterval.status : quest.status) {
              case 'TransitionToWork':
                return <MessageBox text={transitionToWorkText} buttons={isLoading ? undefined : isStart ? undefined : [{ text: "Start now", onClick: skipBreakAction }]} />;
              case 'TransitionToBreak':
                return <MessageBox text={transitionToBreakText} buttons={isLoading ? undefined : [{ text: "Skip break", onClick: skipTransitionAction }]} />;
              case 'Finished':
                return <MessageBox text={finishText} buttons={isLoading ? undefined : [{ text: "Back to home page", onClick: () => { nav("/") } }]} />;
              default:
                return <Timer time={remainingCurrentInterval} isBreakMode={isBreakMode} />;
            }
          })()
        }
        {isBreakMode && !isTransitionMode
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

export default QuestItem;