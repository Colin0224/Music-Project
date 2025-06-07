"use client"

// Next.js and React imports
import Image from "next/image"  // For optimized image rendering
import { useState } from "react"  // For component state management

// UI Component imports
import { Input } from "@/components/ui/input"  // Search input field
import { Button } from "@/components/ui/button"  // Clickable buttons (logo, user, controls)
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"  // Right sidebar tabs (UP NEXT, ADJUST, FRIENDS)

// Icon imports
import { SearchIcon, UserIcon, SkipBackIcon, PlayIcon, PauseIcon, SkipForwardIcon, Volume2Icon } from "lucide-react"  // All the icons used in the UI

// Type definitions and data imports
import { User, defaultUser } from "@/types/user"  
import { defaultPlayerState, Song } from "@/types/player"  

export default function MusicPlayerUI() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [profileImageSrc, setProfileImageSrc] = useState(defaultUser.profileImage)
  const [showProfilePopup, setShowProfilePopup] = useState(false) // For profile dropdown
  
  // Volume that updates the player state
  const [volume, setVolume] = useState(defaultPlayerState.volume * 100) // Convert 0.1 to 10%
  
  // Song progress that updates the player state
  const [songProgress, setSongProgress] = useState(defaultPlayerState.progress)
  
  // Update player state when volume changes
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    defaultPlayerState.volume = newVolume / 100 // Convert back to 0-1 range
  }
  
  // Update player state when song progress changes
  const handleProgressChange = (newProgress: number) => {
    setSongProgress(newProgress)
    defaultPlayerState.progress = newProgress
  }
  
  // Get current song and queue from player state
  const currentSong = defaultPlayerState.currentSong!
  const upNextSongs = defaultPlayerState.queue

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
  <div className="relative">
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full text-neutral-400 hover:text-white hover:bg-neutral-700/50 ml-4 flex-shrink-0 p-0 overflow-hidden"
      onClick={() => setShowProfilePopup(!showProfilePopup)}
    >
      {profileImageSrc ? (
        <Image
          src={profileImageSrc}
          alt="User Profile"
          width={40}
          height={40}
          className="rounded-full object-cover w-full h-full"
          onError={() => {
            console.warn("Failed to load profile.png, defaulting to UserIcon.");
            setProfileImageSrc(undefined);
          }}
        />
      ) : (
        <UserIcon className="h-5 w-5" />
      )}
    </Button>
    
    {/* Profile Dropdown Popup */}
    {showProfilePopup && (
      <div className="absolute top-12 right-0 bg-black/90 backdrop-blur-lg rounded-lg p-2 w-40 shadow-xl border border-neutral-700 z-50">
        <div className="flex flex-col space-y-1">
          <Button
            variant="ghost"
            className="justify-start text-neutral-300 hover:text-white hover:bg-neutral-700/50 text-sm px-3 py-2"
            onClick={() => {
              setShowProfilePopup(false)
              // Add sign in logic here
            }}
          >
            Sign In
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-neutral-300 hover:text-white hover:bg-neutral-700/50 text-sm px-3 py-2"
            onClick={() => {
              setShowProfilePopup(false)
              // Add settings logic here
            }}
          >
            Settings
          </Button>
        </div>
      </div>
    )}
  </div>
</header>

      {/* Main Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Pane (Main Content) */}
        <main className="flex-1 relative overflow-hidden">
          <Image
            src={currentSong.albumBackground || "/placeholder.svg?width=1200&height=1200"}
            alt="Large Album Art"
            fill
            className="object-cover pointer-events-none"
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
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={songProgress}
                    onChange={(e) => handleProgressChange(Number(e.target.value))}
                    className="w-full h-1 bg-neutral-500/70 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #fff 0%, #fff ${songProgress}%, #525252 ${songProgress}%, #525252 100%)`
                    }}
                  />
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
                <div className="hidden sm:flex items-center space-x-2">
                  <Volume2Icon className="h-4 w-4 text-neutral-300" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="w-20 h-1 bg-neutral-600 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #fff 0%, #fff ${volume}%, #525252 ${volume}%, #525252 100%)`
                    }}
                  />
                </div>
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
