import { useState } from "react";
import { delayCallback } from "../../../../functions/callbackUtils/delayCallbackUtils";

const useDelayCallback = () => {
  const [callbackStatus, setCallbackStatus] = useState<Record<string, "waiting" | "finished">>({});

  const callDelayCallback = async <T>({ id, min, max, callback }: {
    id?: string,
    min: number,
    max?: number,
    callback: () => T
  }): Promise<T> => {
    if (id) {
      setCallbackStatus(prev => ({ ...prev, [id]: "waiting" }));
    }
    return await delayCallback(async () => {
      const result = await callback();
      if (id) {
        setCallbackStatus(prev => ({ ...prev, [id]: "finished" }));
      }
      return result;
    }, min, max);
  };

  const callDelayCallbacks = async <T>({ tasks, min, max }: {
    tasks: { id?: string, min?: number, max?: number, callback: () => T }[],
    min: number,
    max?: number
  }): Promise<T[]> => {
    const results: T[] = [];
    for (const task of tasks) {
      const taskMin = task.min ?? min;
      const taskMax = task.max ?? task.min ?? max ?? min;
      const result = await callDelayCallback({
        id: task.id,
        min: taskMin,
        max: taskMax,
        callback: task.callback
      });
      results.push(result);
    }
    return results;
  };

  return { callbackStatus, callDelayCallback, callDelayCallbacks };
};

export default useDelayCallback;