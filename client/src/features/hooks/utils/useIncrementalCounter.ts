import { useState, useEffect } from "react";

interface UseIncrementalCounterProps {
  start?: number;
  end: number;
  step?: number;
  interval?: number;
  transitionTimeMs?: number;
}

export function useIncrementalCounter({
  start = 0,
  end,
  step = 1,
  interval,
  transitionTimeMs = 1000
}: UseIncrementalCounterProps): number {
  const [count, setCount] = useState(start);
  const intervalTime = interval ?? (transitionTimeMs / Math.abs(end - start) / step);

  useEffect(() => {
    if (count >= end) return;

    const timer = setInterval(() => {
      setCount((prev) => {
        const nextValue = prev + step;
        return nextValue >= end ? end : nextValue;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [count, end, step, intervalTime]);

  return count;
}
