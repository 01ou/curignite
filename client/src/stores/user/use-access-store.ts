import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getDateDifference } from '../../functions/dateTimeUtils/dateTimeUtils'

type AccessState = {
  lastAccessTimestamp: number | null
  consecutiveDays: number
  accessState: 'firstLogin' | 'firstTimes' | 'multipleTimes' | null
  onAccess: (options?: { nowMs?: number; dateChangeTime?: number }) => void
  markAsMultipleTimes: () => void
}

export const useAccessStore = create<AccessState>()(
  persist(
    (set, get) => ({
      lastAccessTimestamp: null,
      consecutiveDays: 1,
      accessState: null,

      onAccess: ({ nowMs = Date.now(), dateChangeTime = 5 } = {}) => {
        const lastAccessTimestamp = get().lastAccessTimestamp ?? 0
        const dateGap = getDateDifference(
          lastAccessTimestamp,
          nowMs,
          dateChangeTime
        )

        let newAccessState:
          | 'firstLogin'
          | 'firstTimes'
          | 'multipleTimes'
          | null = get().accessState
        if (lastAccessTimestamp === 0) {
          newAccessState = 'firstLogin'
        } else if (dateGap > 0) {
          newAccessState = 'firstTimes'
        }

        set((state) => ({
          lastAccessTimestamp: nowMs,
          consecutiveDays:
            dateGap === 1 ? state.consecutiveDays + 1 : state.consecutiveDays,
          accessState: newAccessState,
        }))
      },

      markAsMultipleTimes: () => {
        set({ accessState: 'multipleTimes' })
      },
    }),
    { name: 'access-store' }
  )
)
