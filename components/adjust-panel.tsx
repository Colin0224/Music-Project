"use client"
import { useEffect, useState } from 'react'
import { Switch } from '@/components/ui/switch'

export default function AdjustPanel() {
  const [focus, setFocus] = useState(false)
  const [party, setParty] = useState(false)

  useEffect(() => {
    const f = localStorage.getItem('focusMode') === 'true'
    const p = localStorage.getItem('partyMode') === 'true'
    setFocus(f)
    setParty(p)
  }, [])

  useEffect(() => {
    localStorage.setItem('focusMode', String(focus))
  }, [focus])
  useEffect(() => {
    localStorage.setItem('partyMode', String(party))
  }, [party])

  return (
    <div className="space-y-4 p-2 text-sm">
      <label className="flex items-center justify-between gap-2">
        <span>Focus Mode</span>
        <Switch checked={focus} onCheckedChange={setFocus} />
      </label>
      <label className="flex items-center justify-between gap-2">
        <span>Party Mode</span>
        <Switch checked={party} onCheckedChange={setParty} />
      </label>
    </div>
  )
}
