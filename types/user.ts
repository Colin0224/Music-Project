export interface User {
  id: string
  name: string
  username: string
  email: string
  profileImage?: string
  plan: 'free' | 'premium' | 'family'
  followers: number
  following: number
  createdAt?: string
  preferences?: {
    theme: 'light' | 'dark'
    autoplay: boolean
    downloadQuality: 'standard' | 'high' | 'lossless'
  }
}

export const defaultUser: User = {
  id: "user123",
  name: "Colin Wong",
  username: "colin0224", 
  email: "colinwong0224@gmail.com",
  profileImage: "/User.png",
  plan: "premium",
  followers: 1250,
  following: 890,
  preferences: {
    theme: 'dark',
    autoplay: true,
    downloadQuality: 'high'
  }
} 