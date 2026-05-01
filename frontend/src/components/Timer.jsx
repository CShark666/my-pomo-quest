import "../styles/Timer.css";
import { useState, useEffect, useRef } from "react";

export function Timer({ duration }) {
  const [remaining, setRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemaining(duration);
    setIsRunning(true);
  }, [duration]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 100) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 100;
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

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
            <p>{format(remaining).minutes}</p>
          </div>
        </div>

        <p className="dots">:</p>

        <div className="seconds">
          <div className="time-card">
            <p>{format(remaining).seconds}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
