import statusSprite from '../../../assets/HP-Bar-Sheet-v2.png';

const FRAME_COUNT = 11;

function IntervalsBar({
  currentIntervalIdx,
  intervalCount,
  timerPercent,
}: {
  currentIntervalIdx: number;
  intervalCount: number;
  timerPercent: number;
  isBreakMode: boolean;
}) {
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


  return (
    <div className="flex flex-wrap w-full gap-0 bg-[#4d2b32] rounded-[5px] p-1.5">
      {intervals.map((interval, i) => {
        return (
          <div key={i}
            className={`min-w-8 max-w-24 aspect-2/1 grow shrink basis-15 relative overflow-hidden text-[#e7d5b3] font-press-start text-center`}>
            <div
              className={`absolute bottom-0 w-full h-full 
              ${interval.active ? "border-2 border-active" : ""}`}>
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

function Interval({ percent }: { percent: number }) {
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
}