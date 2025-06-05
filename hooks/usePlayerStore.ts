import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PlayerState {
  volume: number
  setVolume: (v: number) => void
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      volume: 0.5,
      setVolume: (v) => set({ volume: Math.max(0, Math.min(1, v)) })
    }),
    { name: 'player-storage' }
  )
)
