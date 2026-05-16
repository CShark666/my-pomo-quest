import { useState, useEffect } from "react";

export function useTimer(initial) {
  const [remaining, setRemaining] = useState(initial);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev < 100) {
          clearInterval(id);
          setIsRunning(false);
          return 0;
        }

        return prev - 100;
      });
    }, 100);

    return () => clearInterval(id);
  }, [isRunning]);

  return {
    remaining,
    isRunning,
    setIsRunning,
    setRemaining,
  };
}
