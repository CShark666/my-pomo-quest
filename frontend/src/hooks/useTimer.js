import { useState, useEffect, useRef } from "react";

export function useTimer(initial) {
  const [remaining, setRemaining] = useState(initial);
  const initialRef = useRef(null);

  useEffect(() => {
    initialRef.current = initial;
    setRemaining(initialRef.current);

    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev < 100) {
          clearInterval(id);
          return 0;
        }

        return prev - 100;
      });
    }, 100);

    return () => clearInterval(id);
  }, [initial]);

  return {
    remaining,
    setRemaining,
  };
}
