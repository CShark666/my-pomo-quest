import { useState, useEffect, useRef } from "react";
import "../styles/Timer.css";

export function Timer({ remaining, setRemaining }) {
  const [isRunning, setIsRunning] = useState(true);
  const [showWindow, setShowWindow] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 100) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setShowWindow(true);

            return 0;
          }
          return prev - 100;
        });
      }, 100);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, remaining, setRemaining]);

  const format = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");

    return { minutes, seconds };
  };

  return (
    <>
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
      {showWindow && (
        <div className="overlay">
          <div className="dialog-window">
            <span>Well done! You've successfully completed this stage!</span>
            <div>
              <button
                onClick={() => {
                  setShowWindow(false);
                }}
              >
                Start break
              </button>
              <button
                onClick={() => {
                  setShowWindow(false);
                  setIsRunning(true);
                  setRemaining(5000);
                }}
              >
                Skip break
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
