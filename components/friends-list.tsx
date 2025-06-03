"use client"
import { useEffect, useState } from 'react'

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

  return (
    <div className="space-y-2 p-2">
      {friends.map((f) => (
        <div key={f.id} className="flex justify-between text-sm">
          <span>{f.name}</span>
          <span className="text-neutral-400 flex-1 text-right mr-2">{f.track}</span>
          <span>{f.emoji}</span>
        </div>
      ))}
    </div>
  )
}
