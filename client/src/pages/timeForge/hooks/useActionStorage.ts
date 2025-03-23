import { isToday } from "date-fns";
import { getMidnightDate } from "../../../functions/dateTimeUtils/dateTimeUtils";
import { shiftDateTime } from "../../../functions/dateTimeUtils/timeFormatUtils";
import { ActionCategory, ActionData } from "../types/actionTypes";

const STORAGE_KEYS = {
  ACTIVE: "activeAction",
  HISTORY: "actionHistory",
  LAST_TRAINING: "lastTraining",
  CONTINUOUS_TRAINING_COUNT: "continuousTrainingCount"
};

const useActionStorage = () => {
  // アクティブアクションの保存
  const startAction = (actionId: string, category: ActionCategory, startTimestamp = new Date()) => {
    endCurrentAction(); // 既存アクションの終了
    saveToStorage(STORAGE_KEYS.ACTIVE, {
      actionId,
      category,
      startTimestampMs: startTimestamp.getTime(),
    });
  };

  const getCurrentAction = (): ActionData | null => {
    return getFromStorage<ActionData>(STORAGE_KEYS.ACTIVE);
  }

  // アクティブアクションのキャンセル
  const cancelCurrentAction = () => {
    removeFromStorage(STORAGE_KEYS.ACTIVE);
  };

  // アクティブアクションの終了
  const endCurrentAction = () => {
    const activeAction = getCurrentAction();
    if (activeAction) {
      addHistory({
        ...activeAction,
        endTimestampMs: new Date().getTime(),
      });
      removeFromStorage(STORAGE_KEYS.ACTIVE);
    }
  };

  // 履歴への追加
  const addHistory = (newAction: ActionData) => {
    const history = getHistory();
    history.push(newAction);
    saveToStorage(STORAGE_KEYS.HISTORY, history);
  };

  // 履歴の取得
  const getHistory = (): ActionData[] => {
    return getFromStorage<ActionData[]>(STORAGE_KEYS.HISTORY) || [];
  };

  const updateContinuousTrainingCount = () => {
    const lastTrainingMs = getFromStorage<number>(STORAGE_KEYS.LAST_TRAINING);
    const now = new Date().getTime();
    
    if (!lastTrainingMs) {
      resetTrainingCount(now);
      return;
    }
  
    const twoDaysAgoMidnight = shiftDateTime(getMidnightDate(), -2, "days");
  
    if (lastTrainingMs > twoDaysAgoMidnight) {
      if (!isToday(lastTrainingMs)) {
        incrementTrainingCount();
      }
    } else {
      resetTrainingCount(now);
    }
  
    saveToStorage(STORAGE_KEYS.LAST_TRAINING, now);
  };
  
  const getContinuousTrainingCount = (): number => {
    updateContinuousTrainingCount();
    return getFromStorage<number>(STORAGE_KEYS.CONTINUOUS_TRAINING_COUNT) ?? 0;
  };
  
  // 連続トレーニング回数をリセット
  const resetTrainingCount = (timestamp: number) => {
    saveToStorage(STORAGE_KEYS.CONTINUOUS_TRAINING_COUNT, 1);
    saveToStorage(STORAGE_KEYS.LAST_TRAINING, timestamp);
  };
  
  // 連続トレーニング回数を増やす
  const incrementTrainingCount = () => {
    const count = getFromStorage<number>(STORAGE_KEYS.CONTINUOUS_TRAINING_COUNT) ?? 0;
    saveToStorage(STORAGE_KEYS.CONTINUOUS_TRAINING_COUNT, count + 1);
  };

  const doneTrainingToday = (): boolean => {
    const lastTrainingMs = getFromStorage<number>(STORAGE_KEYS.LAST_TRAINING);
    return !!lastTrainingMs && isToday(lastTrainingMs);
  }

  // 汎用ローカルストレージの読み取り
  const getFromStorage = <T>(key: string): T | null => {
    const dataString = localStorage.getItem(key);
    return dataString ? JSON.parse(dataString) : null;
  };

  // 汎用ローカルストレージへの保存
  const saveToStorage = (key: string, data: unknown) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // 汎用ローカルストレージの削除
  const removeFromStorage = (key: string) => {
    localStorage.removeItem(key);
  };

  return {
    startAction,
    getCurrentAction,
    cancelCurrentAction,
    endCurrentAction,
    getHistory,
    updateContinuousTrainingCount,
    getContinuousTrainingCount,
    doneTrainingToday
  };
};

export default useActionStorage;
