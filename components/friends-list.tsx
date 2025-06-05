"use client"
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

interface Friend {
  id: string
  name: string
  track: string
  emoji: string
}

export default function FriendsList() {
  const [friends, setFriends] = useState<Friend[]>([])

  useEffect(() => {
    fetch('/api/friends')
      .then((res) => res.json())
      .then((data) => setFriends(data.friends))
      .catch(() => {})
  }, [])

  const invite = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({ title: 'Invite link copied!' })
  }

  return (
    <div className="space-y-3 p-2">
      <Button size="sm" variant="secondary" className="w-full" onClick={invite}>
        Invite
      </Button>
      {friends.map((f) => (
        <div
          key={f.id}
          className="flex items-center justify-between rounded-md bg-neutral-800/50 px-2 py-1 text-sm"
        >
          <span>{f.name}</span>
          <span className="flex-1 text-right text-neutral-400 mr-2">{f.track}</span>
          <span>{f.emoji}</span>
        </div>
      ))}
    </div>
  )
}
