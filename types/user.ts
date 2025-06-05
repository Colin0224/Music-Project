export interface User {
  id: string
  name: string
  username: string
  email: string
  profileImage?: string
}

export const defaultUser: User = {
  id: "user123",
  name: "Colin Wong",
  username: "colin0224", 
  email: "colinwong0224@gmail.com",
  profileImage: "/User.png",
} 