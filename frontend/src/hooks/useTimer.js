import { useState, useEffect } from "react";

export function useTimer(initial = 5000) {
  const [remaining, setRemaining] = useState(initial);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev < 100) {
          clearInterval(id);
          setIsRunning(false);
          return initial;
        }

        return prev - 100;
      });
    }, 100);

    return () => clearInterval(id);
  }, [initial, isRunning, remaining]);

  return {
    remaining,
    isRunning,
    setIsRunning,
    setRemaining
  };
}
