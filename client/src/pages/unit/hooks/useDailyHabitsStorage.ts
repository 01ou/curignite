import { differenceInDays } from "date-fns";
import { saveToStorage, getFromStorage, pushToArrayStorage, incrementNumberStorage, updateObjectStorage } from "../../../functions/webStorageUtils/useLocalStorageUtils";

const STORAGE_KEYS = {
  SETTING: "habits_setting",
  HISTORY: "habits_history",
  LAST_WORKED_ON: "habits_lastWorkedOn",
  PROGRESS: "habits_progress",
  GOAL_DAYS: "habits_goalDays",
  CONTINUOUS_WORK_ON_COUNT: "habits_continuousWorkOnCount"
};

interface DailyHabit {
  contents: string;
  targetDays: number;
}

const useDailyHabitsStorage = () => {
  const setHabitSetting = (setting: Partial<DailyHabit>) => {
    updateObjectStorage(STORAGE_KEYS.SETTING, setting);
  }

  const getHabitSetting = (): DailyHabit | null => {
    return getFromStorage(STORAGE_KEYS.SETTING);
  }

  // アクティブアクションの保存
  const workOnHabits = (startTimestamp = new Date(), permissibleGapDays: number = 2) => {
    const diff = differenceInLastWorkOn();

    addHistory(startTimestamp);

    if (!diff) {
      setProgress(1);
      setContinuousCount(1);
      return;
    }

    if (diff !== 0) {
      incrementContinuousCount();
    }
    if (diff < permissibleGapDays) {
      incrementProgress();
    }
  };

  const addHistory = (startTimestamp = new Date()) => {
    const timeMs = startTimestamp.getTime();
    saveToStorage(STORAGE_KEYS.LAST_WORKED_ON, timeMs);
    pushToArrayStorage(STORAGE_KEYS.HISTORY, timeMs);
  }

  // 履歴の取得
  const getWorkOnHistory = (): number[] => {
    return getFromStorage<number[]>(STORAGE_KEYS.HISTORY) || [];
  };

  const incrementProgress = () => {
    incrementNumberStorage(STORAGE_KEYS.PROGRESS, 1);
  };

  const setProgress = (value: number) => {
    saveToStorage(STORAGE_KEYS.PROGRESS, value);
  }

  const getProgress = (): number => {
    return getFromStorage(STORAGE_KEYS.PROGRESS) ?? 0;
  }

  // 連続回数を増やす
  const incrementContinuousCount = () => {
    incrementNumberStorage(STORAGE_KEYS.CONTINUOUS_WORK_ON_COUNT, 1);
  };

  const setContinuousCount = (value: number) => {
    saveToStorage(STORAGE_KEYS.CONTINUOUS_WORK_ON_COUNT, value);
  }

  const getContinuousCount = (): number => {
    return getFromStorage(STORAGE_KEYS.CONTINUOUS_WORK_ON_COUNT) ?? 0;
  }

  const differenceInLastWorkOn= (baseDate = new Date()): number | null => {
    const lastTrainingMs = getFromStorage<number>(STORAGE_KEYS.LAST_WORKED_ON);
    if (lastTrainingMs) {
      return differenceInDays(baseDate, lastTrainingMs);
    }
    return null;
  }

  return {
    setHabitSetting,
    getHabitSetting,
    workOnHabits,
    getWorkOnHistory,
    setProgress,
    getProgress,
    setContinuousCount,
    getContinuousCount,
    differenceInLastWorkOn
  };
};

export default useDailyHabitsStorage;
