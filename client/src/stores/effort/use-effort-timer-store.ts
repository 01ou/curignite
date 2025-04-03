import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface EffortTimerState {
  elapsedBeforeStart: number
  startTimestamp: number | null
  elapsedTime: number
  totalElapsedBeforeStart: number
  totalElapsed: number
  timeDiff: number
  status: 'stopped' | 'running'
  updateTimer: (nowMs?: number) => { elapsedTime: number; totalElapsed: number }
  getElapsedTime: (nowMs?: number) => number
  updateElapsedTime: (nowMs?: number) => number
  updateTotalElapsed: (nowMs?: number) => number
  startTimer: (startTime?: number) => void
  resetTimer: () => void
  stopTimer: () => void
  clearTotalElapsed: () => void
  clearTimer: () => void
}

export const useEffortTimerStore = create<EffortTimerState>()(
  persist(
    (set, get) => {
      const getNow = () => Date.now()

      const computeElapsedTime = (nowMs: number = getNow()): number => {
        const { startTimestamp, elapsedBeforeStart } = get()
        return startTimestamp
          ? elapsedBeforeStart + (nowMs - startTimestamp)
          : elapsedBeforeStart
      }

      const updateElapsedTime = (nowMs?: number): number => {
        const newElapsedTime = computeElapsedTime(nowMs)
        set({ elapsedTime: newElapsedTime })
        return newElapsedTime
      }

      const updateTotalElapsed = (nowMs: number = getNow()): number => {
        const newTotalElapsed =
          get().totalElapsedBeforeStart + computeElapsedTime(nowMs)
        set({
          totalElapsed: newTotalElapsed,
          timeDiff: newTotalElapsed - get().totalElapsed,
        })
        return newTotalElapsed
      }

      const updateTimer = (nowMs?: number) => {
        return {
          elapsedTime: updateElapsedTime(nowMs),
          totalElapsed: updateTotalElapsed(nowMs),
        }
      }

      const startTimer = (startTime: number = getNow()) => {
        if (get().status === 'stopped') {
          set({ status: 'running', startTimestamp: startTime })
        }
        updateTimer()
      }

      const stopTimer = () => {
        if (get().status === 'running') {
          const newElapsed = computeElapsedTime()
          const newTotalElapsed = get().totalElapsedBeforeStart + newElapsed
          set({
            status: 'stopped',
            startTimestamp: null,
            elapsedBeforeStart: newElapsed,
            elapsedTime: newElapsed,
            totalElapsed: newTotalElapsed,
            timeDiff: newTotalElapsed - get().totalElapsed,
          })
        }
      }

      const resetTimer = () => {
        const currentElapsed = computeElapsedTime()
        const newTotalElapsed = get().totalElapsedBeforeStart + currentElapsed
        set({
          elapsedBeforeStart: 0,
          startTimestamp: null,
          elapsedTime: 0,
          status: 'stopped',
          totalElapsed: newTotalElapsed,
          totalElapsedBeforeStart: newTotalElapsed,
          timeDiff: newTotalElapsed - get().totalElapsed,
        })
      }

      const clearTotalElapsed = () => {
        stopTimer()
        set({
          totalElapsed: 0,
          totalElapsedBeforeStart: -computeElapsedTime(),
        })
      }

      const clearTimer = () => {
        resetTimer()
        clearTotalElapsed()
      }

      return {
        elapsedBeforeStart: 0,
        startTimestamp: null,
        elapsedTime: 0,
        totalElapsedBeforeStart: 0,
        totalElapsed: 0,
        timeDiff: 0,
        status: 'stopped',

        getElapsedTime: computeElapsedTime,
        updateElapsedTime,
        updateTotalElapsed,
        updateTimer,
        startTimer,
        stopTimer,
        resetTimer,
        clearTotalElapsed,
        clearTimer,
      }
    },
    { name: 'effort-timer-store' }
  )
)
