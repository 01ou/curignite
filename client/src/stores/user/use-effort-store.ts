import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { EffortData } from '../../pages/voiceBuddy/features/types/effortTypes'

interface EffortState {
  currentEffort: EffortData | null
  effortHistory: EffortData[]
  handleStartEffort: (startTimestampMs?: number) => void
  handleFinishCurrentEffort: (endTimestampMs?: number) => void
  getCurrentEffort: () => EffortData | null
  isProgressEffort: () => boolean
}

export const useEffortStore = create<EffortState>()(
  persist(
    (set, get) => ({
      currentEffort: null,
      effortHistory: [],

      handleStartEffort: (startTimestampMs = Date.now()) => {
        get().handleFinishCurrentEffort()
        set({ currentEffort: { startTimestampMs } })
      },

      handleFinishCurrentEffort: (endTimestampMs = Date.now()) => {
        const effort = get().currentEffort
        if (effort && !effort.endTimestampMs) {
          set((state) => ({
            currentEffort: { ...effort, endTimestampMs },
            effortHistory: [
              ...state.effortHistory,
              { ...effort, endTimestampMs },
            ],
          }))
        }
      },

      getCurrentEffort: () => get().currentEffort,

      isProgressEffort: () => {
        const effort = get().currentEffort
        return effort !== null && !effort.endTimestampMs
      },
    }),
    { name: 'effort-store' }
  )
)
