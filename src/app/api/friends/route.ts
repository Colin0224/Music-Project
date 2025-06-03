import { NextResponse } from 'next/server'

export async function GET() {
  const friends = [
    { id: '1', name: 'Alice', track: 'Blue Monday', emoji: '🎧' },
    { id: '2', name: 'Bob', track: 'Sunshine', emoji: '😎' },
    { id: '3', name: 'Carol', track: 'Chill Vibes', emoji: '🌴' },
  ]
  return NextResponse.json({ friends })
}
