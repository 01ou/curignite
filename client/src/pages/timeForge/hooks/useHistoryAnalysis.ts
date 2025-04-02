import { ActionData, ActionCategory } from '../types/actionTypes'
import { isEqualDate } from '../../../functions/dateTimeUtils/dateTimeUtils'
import { TimeType } from '../../../types/utils/dateTimeTypes'
import {
  convertToDate,
  convertToLocalTimeMs,
  toISODate,
} from '../../../functions/dateTimeUtils/timeConversion'

const useHistoryAnalysis = () => {
  const getActionTime = (
    history: ActionData[],
    date: TimeType = new Date()
  ) => {
    return history.reduce(
      (acc, data) => {
        if (data?.endTimestampMs && isEqualDate(date, data.endTimestampMs)) {
          const duration = data.endTimestampMs - data.startTimestampMs
          switch (data.category) {
            case 'training':
              acc.trainingTimeMs += duration
              break
            case 'rest':
              acc.restTimeMs += duration
              break
            case 'creative':
              acc.creativeTimeMs += duration
              break
            case 'sleep':
              acc.sleepTimeMs += duration
              break
            default:
              break
          }
        }
        return acc
      },
      { trainingTimeMs: 0, restTimeMs: 0, creativeTimeMs: 0, sleepTimeMs: 0 }
    )
  }

  const getActionBreakdown = (
    history: ActionData[],
    category?: ActionCategory,
    date: TimeType | null = new Date() // デフォルトは今日, nullなら全範囲
  ) => {
    return history.reduce(
      (acc, data) => {
        if (data?.endTimestampMs) {
          const duration = data.endTimestampMs - data.startTimestampMs

          // 日付範囲のチェック（nullの場合はすべて含む）
          const actionDate = new Date(data.endTimestampMs)
          const isWithinDate = date === null || isEqualDate(date, actionDate)

          if (isWithinDate && (!category || data.category === category)) {
            acc[data.actionId] = { category: data.category, time: duration }
          }
        }
        return acc
      },
      {} as Record<string, { category: ActionCategory; time: number }>
    )
  }

  const getActionTimeByDate = (
    history: ActionData[],
    startDate?: TimeType,
    endDate?: TimeType
  ) => {
    return history.reduce(
      (acc, data) => {
        if (data?.endTimestampMs) {
          const date = new Date(data.endTimestampMs)
          const isoDate = toISODate(convertToLocalTimeMs(date))

          // 指定された範囲内かチェック
          const isInRange =
            (!startDate || date >= convertToDate(startDate)) &&
            (!endDate || date <= convertToDate(endDate))

          if (!isInRange) return acc

          const duration = data.endTimestampMs - data.startTimestampMs

          if (!acc[isoDate]) {
            acc[isoDate] = {
              trainingTimeMs: 0,
              restTimeMs: 0,
              creativeTimeMs: 0,
              sleepTimeMs: 0,
            }
          }

          switch (data.category) {
            case 'training':
              acc[isoDate].trainingTimeMs += duration
              break
            case 'rest':
              acc[isoDate].restTimeMs += duration
              break
            case 'creative':
              acc[isoDate].creativeTimeMs += duration
              break
            case 'sleep':
              acc[isoDate].sleepTimeMs += duration
              break
          }
        }
        return acc
      },
      {} as Record<
        string,
        {
          trainingTimeMs: number
          restTimeMs: number
          creativeTimeMs: number
          sleepTimeMs: number
        }
      >
    )
  }

  return { getActionTime, getActionBreakdown, getActionTimeByDate }
}

export default useHistoryAnalysis
