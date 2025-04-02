import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { EffortSessionData } from '../../pages/voiceBuddy/features/types/effortTypes'

interface EffortSessionState {
  currentEffort: EffortSessionData | null
  effortHistory: EffortSessionData[]
  onStartEffort: (startTimestampMs?: number) => void
  onFinishCurrentEffort: (endTimestampMs?: number) => void
  getCurrentEffort: () => EffortSessionData | null
  isProgressEffort: () => boolean
}

export const useEffortSessionStore = create<EffortSessionState>()(
  persist(
    (set, get) => ({
      currentEffort: null,
      effortHistory: [],

      onStartEffort: (startTimestampMs = Date.now()) => {
        get().onFinishCurrentEffort()
        set({ currentEffort: { startTimestampMs } })
      },

      onFinishCurrentEffort: (endTimestampMs = Date.now()) => {
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
    { name: 'effort-session-store' }
  )
)
