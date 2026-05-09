import "../styles/Timer.css";

export function Timer({ time }) {
  const format = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");

    return { minutes, seconds };
  };

  return (
    <div className="timer">
      <div className="time">
        <div className="hours">
          <div className="time-card">
            <p>{format(time).minutes}</p>
          </div>
        </div>

        <p className="dots">:</p>

        <div className="seconds">
          <div className="time-card">
            <p>{format(time).seconds}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
