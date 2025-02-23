import { useState, useEffect } from "react";

type UseOscillatingValueProps = {
  min?: number;
  max?: number;
  step?: number;
  interval?: number;
  bounce?: boolean;
  initialValue?: number;
};

export const useOscillatingValue = ({
  min = 0,
  max = 100,
  step = 1,
  interval = 30,
  bounce = true,
  initialValue = min,
}: UseOscillatingValueProps = {}): number => {
  const [value, setValue] = useState(initialValue);
  const [direction, setDirection] = useState(1); // 1:増加, -1:減少

  useEffect(() => {
    const id = setInterval(() => {
      setValue((prev) => {
        const nextValue = prev + step * direction;
        if (nextValue > max) {
          return bounce ? (setDirection(-1), max) : min;
        }
        if (nextValue < min) {
          return bounce ? (setDirection(1), min) : max;
        }
        return nextValue;
      });
    }, interval);

    return () => clearInterval(id);
  }, [min, max, step, interval, bounce, direction]);

  return value;
};
