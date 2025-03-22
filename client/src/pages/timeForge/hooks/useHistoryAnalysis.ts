import { ActionData, ActionCategory } from "../types/actionTypes";
import { isEqualDate } from "../../../functions/dateTimeUtils/dateTimeUtils";
import { TimeTypes } from "../../../types/utils/dateTimeTypes";

const useHistoryAnalysis = () => {

  const getActionTime = (history: ActionData[], date: TimeTypes = new Date()) => {
    return history.reduce(
      (acc, data) => {
        if (data?.endTimestampMs && isEqualDate(date, data.endTimestampMs)) {
          const duration = data.endTimestampMs - data.startTimestampMs;
          switch (data.category) {
            case "training":
              acc.trainingTimeMs += duration;
              break;
            case "rest":
              acc.restTimeMs += duration;
              break;
            case "creative":
              acc.creativeTimeMs += duration;
              break;
            case 'sleep':
              acc.sleepTimeMs += duration;
              break;
            default:
              break;
          }
        }
        return acc;
      },
      { trainingTimeMs: 0, restTimeMs: 0, creativeTimeMs: 0, sleepTimeMs: 0 }
    );
  }

  const getActionBreakdown = (
    history: ActionData[],
    category?: ActionCategory,
    date: TimeTypes | null = new Date() // デフォルトは今日, nullなら全範囲
  ) => {
    return history.reduce((acc, data) => {
      if (data?.endTimestampMs) {
        const duration = data.endTimestampMs - data.startTimestampMs;
  
        // 日付範囲のチェック（nullの場合はすべて含む）
        const actionDate = new Date(data.endTimestampMs);
        const isWithinDate =
          date === null || isEqualDate(date, actionDate);
  
        if (isWithinDate && (!category || data.category === category)) {
          acc[data.actionId] = { category: data.category, time: duration };
        }
      }
      return acc;
    }, {} as Record<string, { category: ActionCategory; time: number }>);
  };

  return { getActionTime, getActionBreakdown };
};

export default useHistoryAnalysis
