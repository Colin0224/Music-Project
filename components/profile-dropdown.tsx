"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { UserIcon } from 'lucide-react'
import { useState } from 'react'

interface Props {
  src?: string
}

export default function ProfileDropdown({ src }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full overflow-hidden w-8 h-8 flex items-center justify-center">
          {src ? (
            <Image src={src} alt="Profile" width={32} height={32} className="object-cover w-full h-full" />
          ) : (
            <UserIcon className="h-5 w-5 text-neutral-300" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem>View Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
