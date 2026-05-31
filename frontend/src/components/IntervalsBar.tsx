export function IntervalsBar({
  currentIntervalIdx,
  intervalCount,
  timerPercent,
  isBreakMode,
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
    <div className="flex flex-wrap w-full gap-0.5">
      {intervals.map((interval, i) => {
        return (
          <div key={i} className={`rounded-md ${isBreakMode ? "bg-break/20" : "bg-work/20"} text-white text-center grow shrink basis-15 min-w-8 max-w-24 h-10  relative overflow-hidden`}>
            <div className={`rounded-md absolute bottom-0 w-full h-full ${isBreakMode ? "bg-break/50" : "bg-work/50"} animate-drain ${interval.active ? "solid border-2 border-active" : ""}`}
              style={{ width: interval.percent + "%" }}>
              {Math.floor(interval.percent) + "%"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
