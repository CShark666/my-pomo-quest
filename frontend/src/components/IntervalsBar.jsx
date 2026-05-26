import "../styles/IntervalsBar.css";

export function IntervalsBar({
  currentIntervalIdx,
  intervalCount,
  timerPercent,
}) {
  const activeIntervalIdx = intervalCount - currentIntervalIdx - 1
  const intervals = Array.from({ length: intervalCount }, (_, i) => {
    return {
      active: i === activeIntervalIdx,
      percent: i < activeIntervalIdx
        ? 100
        : i > activeIntervalIdx
          ? 0
          : timerPercent
    }
  })
  return (
    <div className="intervals">
      {intervals.map((interval, i) => {
        return (
          <div key={i} className="interval">
            <div
              className={`interval-progress ${interval.active ? "--active" : ""}`}
              style={{ width: interval.percent + "%" }}
            >
              {Math.floor(interval.percent) + "%"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
