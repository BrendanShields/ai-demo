"use client"

import * as React from "react"
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Github,
  Brain,
  Component
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Component Generator",
      url: "/",
      icon: Component,
      isActive: true,
      items: [
        {
          title: "History",
          url: "/history",
        },
        {
          title: "Saved Components",
          url: "/saved",
        },
      ],
    },
    {
      title: "GitHub Copilot",
      url: "/github",
      icon: Github,
      items: [
        {
          title: "Code Assistant",
          url: "/github",
        },
        {
          title: "Code Review",
          url: "/github/review",
        },
      ],
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: BookOpen,
      items: [
        {
          title: "Framework Docs",
          url: "/docs",
        },
        {
          title: "API References",
          url: "/docs/api",
        },
      ],
    },
    {
      title: "Deep Reasoning",
      url: "/reasoning",
      icon: Brain,
      items: [
        {
          title: "Problem Solving",
          url: "/reasoning",
        },
        {
          title: "System Design",
          url: "/reasoning/design",
        },
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  
  // Function to get the current page title
  const getCurrentPageTitle = () => {
    const currentRoute = data.navMain.find(item => 
      pathname === item.url || item.items?.some(subItem => pathname === subItem.url)
    )
    return currentRoute?.title || 'Component Generator'
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{getCurrentPageTitle()}</span>
                  <span className="truncate text-xs text-muted-foreground">Welcome Brendan</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
