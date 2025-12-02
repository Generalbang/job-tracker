"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Briefcase, PlusCircle, LogOut, User, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { 
  Sidebar, 
  SidebarProvider, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Logo from '@/components/Logo'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { data: session } = useSession()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Jobs",
      icon: Briefcase,
      href: "/dashboard/jobs",
      active: pathname === "/dashboard/jobs" || pathname.startsWith("/dashboard/jobs/"),
    },
  ]

  // Get user initials for avatar
  const getUserInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    if (email) {
      return email[0].toUpperCase()
    }
    return 'U'
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-6 border-b">
          {/* <h1 className="text-2xl font-bold text-primary">JobTrack</h1> */}
          <Logo/>
        </SidebarHeader>
        
        <SidebarContent className="flex-1 p-4">
          <SidebarMenu className="space-y-2">
            {routes.map((route) => (
              <SidebarMenuItem key={route.href}>
                <SidebarMenuButton asChild isActive={route.active}>
                  <Link href={route.href} className="flex items-center gap-3">
                    <route.icon className="w-5 h-5" />
                    <span>{route.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/jobs/new" className="flex items-center gap-3">
                  <PlusCircle className="w-5 h-5" />
                  <span>Add Job</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        
        <SidebarFooter className="p-4 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-between gap-2 px-2 py-6 hover:bg-gray-100"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="h-9 w-9 flex-shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getUserInitials(session?.user?.name, session?.user?.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start min-w-0 flex-1">
                    <span className="text-sm font-medium truncate w-full">
                      {session?.user?.name || 'User'}
                    </span>
                    <span className="text-xs text-muted-foreground truncate w-full">
                      {session?.user?.email || 'user@example.com'}
                    </span>
                  </div>
                </div>
                <ChevronUp className="h-4 w-4 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem 
                className="text-red-500 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
