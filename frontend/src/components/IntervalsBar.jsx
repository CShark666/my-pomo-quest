import "../styles/IntervalsBar.css";

export function IntervalsBar({
  intervals,
  currentIntervalIndex,
  timerPercent,
}) {
  return (
    <div className="intervals">
      {intervals.map((interval, i) => {
        const isActiveNow = i === currentIntervalIndex;

        const width = isActiveNow
          ? `${timerPercent}%`
          : interval.completed
            ? "0%"
            : "100%";

        return (
          <div key={i} className="interval">
            <div
              className={`interval-progress ${isActiveNow ? "--active" : ""}`}
              style={{ width }}
            >
              {width}
            </div>
          </div>
        );
      })}
    </div>
  );
}
