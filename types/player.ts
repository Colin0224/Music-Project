export interface PlayerState {
  // Current playback
  currentSong: Song | null
  isPlaying: boolean
  progress: number // 0-100 percentage
  duration: number // total seconds
  currentTime: number // current seconds
  
  // Audio settings
  volume: number // 0-1
  isMuted: boolean
  
  // Playback mode
  shuffle: boolean
  repeat: 'none' | 'one' | 'all'
  
  // Queue management
  queue: Song[]
  currentIndex: number
  history: Song[]
}

export interface Song {
  id: string
  title: string
  artist: string
  duration: string
  albumArt?: string
  albumBackground?: string
}


const currentSong: Song = {
    id: "current",
    title: "Sunflower",
    artist: "Rex Orange County • Sunflower • 2017",
    duration: "N/A",
    albumArt: "/album.png",
    albumBackground: "/Background.png",
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
  
  
export const defaultPlayerState: PlayerState = {
  currentSong: currentSong,
  isPlaying: false,
  progress: 0,
  duration: 0,
  currentTime: 0,
  volume: 0.7,
  isMuted: false,
  shuffle: false,
  repeat: 'none',
  queue: upNextSongs,
  currentIndex: 0,
  history: []
} 


