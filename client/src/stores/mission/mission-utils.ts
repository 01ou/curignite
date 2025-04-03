import { EffortState } from '../effort/use-effort-store'

export interface Mission {
  name: string
  progress: number
  requiredCount: number
  currentLevel: number
}

export const updateMissions = (effortState: EffortState): Mission[] => {
  return [
    getConsecutiveDaysEffortMissionState(
      effortState.continuousEffortLevel,
      effortState.continuousEffortCount,
      effortState.getLevelUpEffortCountBorder
    ),
    getContinuousEffortTimeMissionState(effortState.sessionEffortTimeMs),
    getDailyEffortTimeMissionState(effortState.todayEffortTimeMs),
    getTotalEffortTimeMissionState(effortState.totalEffortTimeMs),
  ]
}

const getConsecutiveDaysEffortMissionState = (
  continuousEffortLevel: number,
  continuousEffortCount: number,
  getLevelUpEffortCountBorder: () => number
): Mission => {
  return {
    name: 'consecutiveDaysEffort',
    progress: continuousEffortCount,
    requiredCount: getLevelUpEffortCountBorder(),
    currentLevel: continuousEffortLevel,
  }
}

const getContinuousEffortTimeMissionState = (
  sessionEffortTimeMs: number
): Mission => {
  const requiredTimes = [10, 15, 20, 30, 35, 40].map((time) => time * 60000)
  const mission = calculateMissionProgress(
    'continuousEffortTime',
    sessionEffortTimeMs,
    requiredTimes
  )
  return {
    ...mission,
    progress: Math.floor(mission.progress / 60000),
    requiredCount: Math.floor(mission.requiredCount / 60000),
  }
}

const getDailyEffortTimeMissionState = (todayEffortTimeMs: number): Mission => {
  const mission = calculateMissionProgress(
    'dailyEffortTime',
    todayEffortTimeMs,
    [30 * 60000]
  )
  return {
    ...mission,
    progress: Math.floor(mission.progress / 60000),
    requiredCount: Math.floor(mission.requiredCount / 60000),
  }
}

const getTotalEffortTimeMissionState = (totalEffortTimeMs: number): Mission => {
  const requiredTimes = [1, 1, 2, 2, 3].map((time) => time * 3600000)
  const mission = calculateMissionProgress(
    'totalEffortTime',
    totalEffortTimeMs,
    requiredTimes
  )
  return {
    ...mission,
    progress: Math.floor(mission.progress / 60000),
    requiredCount: Math.floor(mission.requiredCount / 60000),
  }
}

const calculateMissionProgress = (
  name: string,
  effortTime: number,
  requiredTimes: number[]
): Mission => {
  const repeatTime = requiredTimes[requiredTimes.length - 1]
  const totalTimeBeforeRepeat = requiredTimes.reduce(
    (sum, time) => sum + time,
    0
  )

  if (effortTime <= totalTimeBeforeRepeat) {
    let accumulatedTime = 0

    const level =
      requiredTimes.findIndex((time) => {
        accumulatedTime += time

        if (effortTime < accumulatedTime) {
          return true
        }

        return false
      }) + 1

    return {
      name,
      progress: effortTime - (accumulatedTime - requiredTimes[level - 1]),
      requiredCount: requiredTimes[level - 1],
      currentLevel: level,
    }
  }

  return {
    name,
    progress: (effortTime - totalTimeBeforeRepeat) % repeatTime,
    requiredCount: repeatTime,
    currentLevel:
      Math.floor((effortTime - totalTimeBeforeRepeat) / repeatTime) +
      requiredTimes.length +
      1,
  }
}
