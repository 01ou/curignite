import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Situation } from '../../pages/voiceBuddy/features/types/characterTypes'

interface SituationState {
  situationState: Situation
  setSituationState: (situation: Situation) => void
}

export const useSituationStore = create<SituationState>()(
  persist(
    (set) => ({
      situationState: 'firstLogin',
      setSituationState: (situation) => set({ situationState: situation }),
    }),
    { name: 'situation-store' }
  )
)
