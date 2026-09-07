import { useNavigate } from "react-router";
import { useTimer } from "../hooks/useTimer.ts";
import { Timer } from "./Timer.tsx";
import { CancelButton } from "./CancelButton.tsx";
import { IntervalsBar } from "./IntervalsBar.tsx";
import { MessageBox } from "./MessageBox.tsx";
import { PopupWindow } from "./PopupWindow.tsx";
import { type ClientQuest } from "../types/types.ts";
import { timeFormatter, timeFormatterSeconds } from "../util/timeFormatter.ts";
import timeDesk from '../assets/total-time-desk.png'
import questScroll from '../assets/quest_scroll.png'



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
  const nav = useNavigate();

  const isStart = quest.currentInterval.status === "TransitionToWork" && quest.remainingTotalTimeMs === quest.totalTimeMs;
  const isBreakMode = quest.currentInterval.status !== "Work";
  const isTransitionMode = quest.currentInterval.status == "TransitionToWork" || quest.currentInterval.status == "TransitionToBreak";
  const timerPercent: number = !isBreakMode
    ? Math.round((remainingCurrentInterval / quest.intervalDurationMs) * 100)
    : 100;

  const transitionToWorkText = quest.currentInterval.index == 0
    ? `The quest will start in: ${timeFormatterSeconds(remainingCurrentInterval)}...`
    : `The break is over. The next stage will start in: ${timeFormatterSeconds(remainingCurrentInterval)}... `;

  const transitionToBreakText = `Congratulations! You have completed stage ${quest.currentInterval.index + 1}. Your break will start in: ${timeFormatterSeconds(remainingCurrentInterval)}... `;
  const finishText = `Good job! You've successfully completed your quest "${quest.title}"!`;

  return (
    <>
      <div className="quest-item flex flex-col w-full max-w-3xl min-w-2xs p-1">
        <div className="quest-item__cancel flex justify-end">
          <CancelButton />
        </div>
        <div className="flex">
          <div>
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
          <div>
            <IntervalsBar
              currentIntervalIdx={quest.currentInterval.index + (isBreakMode && quest.currentInterval.status != "TransitionToWork" ? 1 : 0)}
              intervalCount={quest.intervalsCount}
              timerPercent={quest.status === "InProgress" ? timerPercent : 0}
              isBreakMode={isBreakMode}
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

function TotalTimeDesk({ time }: { time: string }) {
  return (
    <>
      <div className={`flex shrink-0 justify-center items-center w-62.5 aspect-19/11 relative overflow-hidden`}>
        <img
          src={timeDesk}
          className="absolute inset-0 h-full w-full object-fill"
        />
        <p className="absolute text-[#e7d5b3] text-xl md:text-3xl lg:text-5xl font-bold">
          {time}
        </p>
      </div>
    </>
  )
}

function QuestInfoScroll({ title, status, progress }: { title: string, status: string, progress: string }) {
  return (
    <div className="flex justify-center">
      <div className={`flex shrink-0 justify-center items-center w-[75%] aspect-square relative overflow-hidden`}>
        <img
          src={questScroll}
          className="absolute inset-0 h-full w-full object-fill"
        />
        <div className="absolute shrink-0 w-[50%] aspect-3/4 left-[18%]
        text-[#917056]  text-[14px] font-bold truncate">
          <ul className="list-disc list-outside pl-5">
            <li>
              <p>
                Quest:
              </p>
              <p>
                {title}
              </p>
            </li>
            <li>
              <p>
                Status:
              </p>
              <p>
                {status}
              </p>
            </li>
            <li>
              <p>
                Progress:
              </p>
              <p>
                {progress}
              </p>
            </li>

          </ul>
        </div>
      </div>
    </div>
  )
}