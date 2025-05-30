"use client"

import Image from "next/image"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchIcon, UserIcon, SkipBackIcon, PlayIcon, PauseIcon, SkipForwardIcon, Volume2Icon } from "lucide-react"

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
  const [songProgress, setSongProgress] = useState(30) // Percentage

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

  {/* Left Spacer - takes up a smaller portion of the free space */}
  <div className="flex-grow-[5.5] flex-shrink basis-auto min-w-[10px] sm:min-w-[20px]"></div> {/* Adjust flex-grow ratio and min-width as needed */}

  {/* Search Input - Now a direct flex child, with responsive width */}
  <div className="relative w-1/3 max-w-xs sm:max-w-sm md:max-w-md min-w-[150px] flex-shrink">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <SearchIcon className="h-4 w-4 text-neutral-500" />
  </div>
  <Input
  placeholder="Search"
  className="w-full bg-neutral-800 border-neutral-700 pl-10 pr-4 py-2 rounded-md text-sm 
             focus:ring-1 focus:ring-sky-500 focus:border-sky-500 placeholder-neutral-500"
  type="search" // Optional
/>
  </div>

  {/* Right Spacer - takes up a larger portion of the free space, pushing Input left */}
  <div className="flex-grow-[2] flex-shrink basis-auto min-w-[20px] sm:min-w-[40px]"></div> {/* Adjust flex-grow ratio (e.g., [1.5], [2], [3]) and min-width */}

  {/* User Icon Button - Ensure it doesn't shrink */}
  <Button
    variant="ghost"
    size="icon"
    className="rounded-full text-neutral-400 hover:text-white hover:bg-neutral-700/50 ml-4 flex-shrink-0"
  >
    <UserIcon className="h-5 w-5" />
  </Button>
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
                <Button variant="ghost" size="icon" className="text-neutral-300 hover:text-white hidden sm:inline-flex">
                  <Volume2Icon className="h-5 w-5" />
                </Button>
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
              <div className="p-2">Adjust settings and preferences here.</div>
            </TabsContent>
            <TabsContent value="friends" className="flex-grow overflow-y-auto mt-4 text-neutral-400">
              <div className="p-2">View your friends' activity or connect with them.</div>
            </TabsContent>
          </Tabs>
        </aside>
      </div>
    </div>
  )
}
