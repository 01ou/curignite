import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface EffortState {
  continuousEffortLevel: number
  continuousEffortCount: number
  continuousLevelUpCount: number
  todayEffortTimeMs: number
  totalEffortTimeMs: number
  addEffortTime: (timeMs: number) => void
  resetTodayEffortTime: () => void
  incrementLevel: () => void
  incrementEffortCount: (step?: number) => void
  getLevelUpEffortCountBorder: () => number
  countUp: () => void
  levelUp: () => void
  onContinuityBroken: (reduceEffortCount?: number) => void
}

export const useEffortStore = create<EffortState>()(
  persist(
    (set, get) => ({
      continuousEffortLevel: 1,
      continuousEffortCount: 0,
      continuousLevelUpCount: 0,
      todayEffortTimeMs: 0,
      totalEffortTimeMs: 0,

      addEffortTime: (timeMs) =>
        set((state) => ({
          todayEffortTimeMs: state.todayEffortTimeMs + timeMs,
          totalEffortTimeMs: state.totalEffortTimeMs + timeMs,
        })),

      resetTodayEffortTime: () => set({ todayEffortTimeMs: 0 }),

      incrementLevel: () =>
        set((state) => ({
          continuousEffortLevel: state.continuousEffortLevel + 1,
        })),

      incrementEffortCount: (step = 1) =>
        set((state) => ({
          continuousEffortCount: Math.max(
            state.continuousEffortCount + step,
            0
          ),
        })),

      getLevelUpEffortCountBorder: (level = get().continuousEffortLevel) => {
        switch (level) {
          case 1:
            return 2
          case 2:
            return 3
          default:
            return 5
        }
      },

      countUp: (
        getLevelUpEffortCountBorder: (level: number) => number = get()
          .getLevelUpEffortCountBorder
      ) => {
        const border = getLevelUpEffortCountBorder(get().continuousEffortLevel)
        if (get().continuousEffortCount + 1 === border) {
          get().levelUp()
        } else {
          get().incrementEffortCount()
        }
      },

      levelUp: () =>
        set((state) => ({
          continuousEffortLevel: state.continuousEffortLevel + 1,
          continuousEffortCount: 1,
          continuousLevelUpCount: state.continuousLevelUpCount + 1,
        })),

      onContinuityBroken: (reduceEffortCount = -2) => {
        get().incrementEffortCount(reduceEffortCount)
        set({ continuousLevelUpCount: 0 })
      },
    }),
    { name: 'effort-store' }
  )
)
