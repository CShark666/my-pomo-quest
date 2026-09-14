import React from 'react';
import statusSprite from '../../../assets/HP-Bar-Sheet-v2.png';

const FRAME_COUNT = 11;

interface IntervalsBarProps {
  currentIntervalIdx: number;
  intervalCount: number;
  timerPercent: number;
  isBreakMode: boolean;
  formWidth: number;
}

function IntervalsBar({ currentIntervalIdx, intervalCount, timerPercent, formWidth }: IntervalsBarProps) {
  const activeIntervalIdx = intervalCount - currentIntervalIdx - 1;
  const intervals = Array.from({ length: intervalCount }, (_, i) => {
    return {
      active: i === activeIntervalIdx,
      percent:
        i < activeIntervalIdx
          ? 100
          : i > activeIntervalIdx
            ? 0
            : timerPercent,
    };
  });

  const padding = 6;
  const baseIntervalSize = Math.floor((formWidth - (padding * 2)) / 5);
  const intervalSize = calculateSize(formWidth, baseIntervalSize, padding, intervalCount);

  return (
    <div
      className={`flex flex-wrap gap-0 bg-[#4d2b32] rounded-[5px]`}
      style={{ width: `${formWidth}px`, padding: `${padding}px` }}
    >
      {intervals.map((interval, i) => {
        return (
          <div
            key={i}
            style={{ width: `${intervalSize}px`, height: `${intervalSize / 2}px`, fontSize: `${intervalSize / 5}px`, }}
            className={`relative overflow-hidden text-[#e7d5b3]  font-press-start`}
          >
            <div
              className={`absolute bottom-0 w-full h-full flex justify-center items-center
              ${interval.active ? "border-2 border-active" : ""}`}
            >
              {Math.floor(interval.percent) + "%"}
            </div>
            <Interval percent={interval.percent} />
          </div>
        );
      })}
    </div>
  );
}

export default IntervalsBar;

const Interval = React.memo(function Interval({ percent }: { percent: number }) {
  const frameIndex = (FRAME_COUNT - 1) - Math.round((percent / 100) * (FRAME_COUNT - 1));

  const positionPercent = FRAME_COUNT > 1
    ? (frameIndex / (FRAME_COUNT - 1)) * 100
    : 0;

  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      className="w-full max-w-md aspect-2/1"
      style={{
        backgroundImage: `url(${statusSprite})`,
        backgroundSize: `${FRAME_COUNT * 100}% 100%`,
        backgroundPosition: `${positionPercent}% 0`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
      }}
    />
  );
})

function calculateSize(formWith: number, intervalWith: number, padding: number, intervalCount: number) {
  const formH = (formWith / 2) - padding * 2;
  const formW = formWith - (padding * 2);

  let intervalW = intervalWith;
  let intervalH = intervalW / 2;
  let gridCount: number;

  do {
    const columns = Math.floor(formW / intervalW);
    const rows = Math.floor(formH / intervalH);
    gridCount = Math.floor(columns * rows);

    if (intervalCount > gridCount) {
      intervalW -= 1;
      intervalH = intervalW / 2;
    }

  } while (intervalCount > gridCount)

  return intervalW;
}