"use client"

import { useState, useRef } from 'react'
import { Volume2Icon } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { usePlayerStore } from '@/hooks/usePlayerStore'

export default function VolumeSlider() {
  const { volume, setVolume } = usePlayerStore()
  const [open, setOpen] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative"
      onBlur={() => setOpen(false)}
      tabIndex={0}
      aria-expanded={open}
    >
      <button
        className="flex items-center justify-center w-8 h-8 text-neutral-300 hover:text-white"
        onClick={() => setOpen(!open)}
      >
        <Volume2Icon className="h-5 w-5" />
      </button>
      {open && (
        <div
          ref={sliderRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-8 p-2 bg-neutral-900/80 backdrop-blur-md rounded-md shadow-lg"
          style={{ minHeight: 120 }}
        >
          <Slider
            orientation="vertical"
            value={[volume * 100]}
            onValueChange={(v) => setVolume(v[0] / 100)}
            className="h-24"
          />
        </div>
      )}
    </div>
  )
}
