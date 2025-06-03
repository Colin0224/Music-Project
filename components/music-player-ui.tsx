"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SkipBackIcon, PlayIcon, PauseIcon, SkipForwardIcon } from "lucide-react"
import { defaultUser } from "@/types/user"
import CollapsedSearch from "./collapsed-search"
import ProfileDropdown from "./profile-dropdown"
import VolumeSlider from "./volume-slider"
import AdjustPanel from "./adjust-panel"
import FriendsList from "./friends-list"
import { usePlayerStore } from "@/hooks/usePlayerStore"

interface Song {
  id: string
  title: string
  artist: string
  duration: string
  albumArt?: string
  albumBackground?: string
}



const upNextSongs: Song[] = [
  { id: "1", title: "Easily", artist: "Bruno Major", duration: "3:31" },
  { id: "2", title: "Sanctuary", artist: "Joji", duration: "3:01" },
  { id: "3", title: "Breezeblocks", artist: "alt-J", duration: "3:48" },
  { id: "4", title: "blue", artist: "yung kai", duration: "4:35" },
  { id: "5", title: "Pasilyo", artist: "Sunkissed Lola", duration: "4:31" },
  { id: "6", title: "Cooky", artist: "Still Woozy", duration: "2:55" },
  { id: "7", title: "Like Real People Do", artist: "Hozier", duration: "3:18" },
  { id: "8", title: "Ivy", artist: "Frank Ocean", duration: "4:09" },
]

const currentSong: Song = {
  id: "current",
  title: "Sunflower",
  artist: "Rex Orange County • Sunflower • 2017",
  duration: "N/A",
  albumArt: "/album.png",
  albumBackground: "/Background.png",
}

export default function MusicPlayerUI() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [songProgress] = useState(30) // Percentage
  const profileImageSrc = defaultUser.profileImage
  const { volume, setVolume } = usePlayerStore()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        setIsPlaying((p) => !p)
      } else if (e.key === 'ArrowUp') {
        setVolume(volume + 0.05)
      } else if (e.key === 'ArrowDown') {
        setVolume(volume - 0.05)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [volume, setVolume])

  return (
    <div className="flex flex-col h-screen bg-neutral-900 text-neutral-200 font-sans">
      {/* Top Bar */}
      <header className="h-16 flex items-center px-6 py-3 border-b border-neutral-800 shrink-0"> {/* Removed justify-between */}
  {/* Logo Button - Ensure it doesn't shrink */}
  
  <Button variant="ghost" className="mr-2 h-14 w-auto px-3 py-2 flex-shrink-0">
    <Image 
      src="/LogoFinal2.png" 
      alt="Logo" 
      width={0}
      height={0}
      sizes="100vw"
      className="h-12 w-auto object-contain" 
    />
  </Button>

  <div className="flex-grow" />
  <CollapsedSearch />
  <div className="flex-grow" />
  <ProfileDropdown src={profileImageSrc} />
</header>

      {/* Main Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Pane (Main Content) */}
        <main className="flex-1 relative overflow-hidden">
          <Image
            src={currentSong.albumBackground || "/placeholder.svg?width=1200&height=1200"}
            alt="Large Album Art"
            fill
            className="object-cover transition-all duration-500 ease-in-out"
            priority
          />

          {/* Music Controls Overlay */}
          <div className="absolute bottom-15 left-6 right-6 mx-auto max-w-2xl p-4 rounded-xl backdrop-blur-lg bg-black/50 text-white shadow-2xl">
            <div className="flex items-center space-x-4">
              <Image
                src={currentSong.albumArt || "/placeholder.svg?width=64&height=64"}
                alt={currentSong.title}
                width={56}
                height={56}
                className="rounded-md aspect-square object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{currentSong.title}</h3>
                <p className="text-xs text-neutral-300">{currentSong.artist}</p>
                <div className="mt-2 w-full">
                  <div className="w-full h-1 bg-neutral-500/70 rounded-full group">
                    <div
                      className="h-full bg-white rounded-full group-hover:bg-green-400 transition-colors"
                      style={{ width: `${songProgress}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <Button variant="ghost" size="icon" className="text-neutral-300 hover:text-white">
                  <SkipBackIcon className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-white text-black rounded-full w-9 h-9 md:w-10 md:h-10 flex items-center justify-center hover:bg-neutral-200 transition-colors"
                >
                  {isPlaying ? (
                    <PauseIcon className="h-5 w-5 md:h-6 md:w-6" />
                  ) : (
                    <PlayIcon className="h-5 w-5 md:h-6 md:w-6" />
                  )}
                </Button>
                <Button variant="ghost" size="icon" className="text-neutral-300 hover:text-white">
                  <SkipForwardIcon className="h-5 w-5" />
                </Button>
                <VolumeSlider />
              </div>
            </div>
          </div>
        </main>

        {/* Right Pane (Sidebar) */}
        <aside className="w-full max-w-xs sm:max-w-sm md:w-80 bg-neutral-950 p-4 flex flex-col space-y-4 border-l border-neutral-800 shrink-0">
          <Tabs defaultValue="up-next" className="flex flex-col flex-grow h-full">
            <TabsList className="grid w-full grid-cols-3 bg-transparent p-0 h-10">
              <TabsTrigger
                value="up-next"
                className="data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white rounded-none pb-2 text-neutral-400 text-xs sm:text-sm font-medium"
              >
                UP NEXT
              </TabsTrigger>
              <TabsTrigger
                value="adjust"
                className="data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white rounded-none pb-2 text-neutral-400 text-xs sm:text-sm font-medium"
              >
                ADJUST
              </TabsTrigger>
              <TabsTrigger
                value="friends"
                className="data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white rounded-none pb-2 text-neutral-400 text-xs sm:text-sm font-medium"
              >
                FRIENDS
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="up-next"
              className="flex-grow overflow-y-auto mt-4 space-y-1 pr-1 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-800/50"
            >
              {upNextSongs.map((song) => (
                <div
                  key={song.id}
                  className="flex justify-between items-center py-2.5 px-2 hover:bg-neutral-800/70 rounded-md cursor-pointer transition-colors"
                >
                  <div>
                    <h4 className="font-medium text-sm text-neutral-100">{song.title}</h4>
                    <p className="text-xs text-neutral-400">{song.artist}</p>
                  </div>
                  <span className="text-xs text-neutral-400">{song.duration}</span>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="adjust" className="flex-grow overflow-y-auto mt-4 text-neutral-400">
              <AdjustPanel />
            </TabsContent>
            <TabsContent value="friends" className="flex-grow overflow-y-auto mt-4 text-neutral-400">
              <FriendsList />
            </TabsContent>
          </Tabs>
        </aside>
      </div>
    </div>
  )
}
