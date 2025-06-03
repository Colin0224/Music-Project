"use client"
import { useState, useEffect, useRef } from 'react'
import { Command } from '@/components/ui/command'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function CollapsedSearch() {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true)
        setTimeout(() => inputRef.current?.focus(), 0)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="relative" aria-expanded={open}>
      {!open && (
        <button onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 0) }}
          className="flex items-center justify-center w-8 h-8 text-neutral-500">
          <SearchIcon className="h-4 w-4" />
        </button>
      )}
      {open && (
        <Command className="absolute top-0 left-0 bg-neutral-800 rounded-md shadow-lg p-2 w-64">
          <Input ref={inputRef} placeholder="Search" className="bg-neutral-700 text-sm" onBlur={() => setOpen(false)} />
        </Command>
      )}
    </div>
  )
}
