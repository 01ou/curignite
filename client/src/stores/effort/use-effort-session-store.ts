import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { EffortSessionData } from '../../pages/voiceBuddy/features/types/effortTypes'

interface EffortSessionState {
  currentEffort: EffortSessionData | null
  effortHistory: EffortSessionData[]
  isProgressEffort: boolean
  onStartEffort: (startTimestampMs?: number) => void
  onFinishCurrentEffort: (endTimestampMs?: number) => void
  getCurrentEffort: () => EffortSessionData | null
}

export const useEffortSessionStore = create<EffortSessionState>()(
  persist(
    (set, get) => ({
      currentEffort: null,
      effortHistory: [],
      isProgressEffort: false,

      onStartEffort: (startTimestampMs = Date.now()) => {
        get().onFinishCurrentEffort()
        set({ isProgressEffort: true, currentEffort: { startTimestampMs } })
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
            isProgressEffort: false,
          }))
        }
      },

      getCurrentEffort: () => get().currentEffort,
    }),
    { name: 'effort-session-store' }
  )
)
