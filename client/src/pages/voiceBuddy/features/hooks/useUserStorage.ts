import { useCallback } from "react";
import { getDateDifference } from "../../../../functions/dateTimeUtils/dateTimeUtils";
import { getFromStorage, incrementNumberStorage, pushToArrayStorage, saveToStorage, updateObjectStorage } from "../../../../functions/webStorageUtils/useLocalStorageUtils";
import { Situation } from "../types/characterTypes";
import { EffortData } from "../types/effortTypes";

enum STORAGE_KEYS {
  LAST_ACCESS_TIMESTAMP = "lastAccessTimestamp",
  CONSECUTIVE_DAYS = "consecutiveDays",
  SITUATION = "situationState",
  CURRENT_EFFORT = "currentEffort",
  EFFORT_HISTORY = "effortHistory"
}

const useUserStorage = () => {
  const onAccess = useCallback((options?: { nowMs?: number; dateChangeTime?: number }) => {
    const { nowMs = Date.now(), dateChangeTime = 5 } = options ?? {};

    const lastAccessTimestamp = getFromStorage<number>(STORAGE_KEYS.LAST_ACCESS_TIMESTAMP);
    const dateGap = getDateDifference(lastAccessTimestamp ?? 0, nowMs, dateChangeTime);

    saveToStorage(STORAGE_KEYS.LAST_ACCESS_TIMESTAMP, nowMs);
    if (dateGap === 1) {
      incrementNumberStorage(STORAGE_KEYS.CONSECUTIVE_DAYS);
    }

    return {
      isFirstLogin: lastAccessTimestamp === null,
      isTodayFirstAccess: dateGap > 0,
      consecutiveDays: getFromStorage<number>(STORAGE_KEYS.CONSECUTIVE_DAYS) ?? 1,
    };
  }, []);

  const setSituationState = (situation: Situation) => {
    saveToStorage(STORAGE_KEYS.SITUATION, situation);
  }

  const getSituationState = (): Situation => {
    return getFromStorage(STORAGE_KEYS.SITUATION) ?? "firstLogin";
  }

  const handleStartEffort = (startTimestampMs = new Date().getTime()) => {
    handleFinishCurrentEffort();
    saveToStorage(STORAGE_KEYS.CURRENT_EFFORT, { startTimestampMs } as EffortData);
  }

  const handleFinishCurrentEffort = (endTimestampMs = new Date().getTime()) => {
    const effort = getCurrentEffort();
    if (effort && !effort.endTimestampMs) {
      updateObjectStorage<EffortData>(STORAGE_KEYS.CURRENT_EFFORT, { endTimestampMs });
      pushToArrayStorage<EffortData>(STORAGE_KEYS.EFFORT_HISTORY, { startTimestampMs: effort.startTimestampMs, endTimestampMs } );
    }
  }

  const getCurrentEffort = () => {
    return getFromStorage<EffortData>(STORAGE_KEYS.CURRENT_EFFORT);
  }

  const isProgressEffort = (effort = getCurrentEffort()) => {
    return effort && !effort.endTimestampMs;
  }

  return {
    onAccess,
    setSituationState,
    getSituationState,
    handleStartEffort,
    handleFinishCurrentEffort,
    getCurrentEffort,
    isProgressEffort
  };
};

export default useUserStorage;
