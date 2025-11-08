"use client"
import Link from "next/link"
import { Calendar, Home, Building, Search, UserPlus2, User, FileText, BarChart3, Building2, LogOut, Menu, X } from "lucide-react"
import {
  Users,
  ClipboardCheck,
  MessageSquare,
  FileBarChart,
  Settings,
} from "lucide-react";
import { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"


const i = 0

const navigationItems = [
  {
    title: "Dashboard",
    url: "/pages/teacher/dashboard",
    icon: Home,
  },
  {
    title: "Student",
    url: "/pages/teacher/student",
    icon: Users, // 👥 for student list
  },
  {
    title: "Attendance",
    url: "/pages/teacher/attendance",
    icon: ClipboardCheck, // ✅ attendance check
  },
  {
    title: "SMS",
    url: "/pages/teacher/sms",
    icon: MessageSquare, // 💬 messaging
  },
  {
    title: "Report",
    url: "/pages/teacher/reportPage",
    icon: FileBarChart, // 📊 reports
  },
  {
    title: "Settings",
    url: "/pages/teacher/settingsPage",
    icon: Settings, // ⚙️ settings
  },
];

const accountItems = [
  {
    title: "Logout",
    url: "/",
    icon: LogOut,
  }
]

interface AppSidebarProps {
  className?: string
}

export function TeacherSideBar({ className }: AppSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Navbar */}
      <div className="lg:hidden bg-blue-900 text-white p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-3">
          <div className="aspect-square size-8 overflow-hidden rounded-lg">
            <img src="/logo.jpg" alt="Logo" className="object-cover w-full h-full rounded-lg" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">DEFEMNHS </span>
            <span className="text-xs text-stone-100">Adviser</span>
          </div>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40  bg-opacity-50" onClick={closeMobileMenu}>
          <div className="fixed top-0 left-0 w-64 h-full bg-gradient-to-b from-blue-800 to-blue-900 transform transition-transform duration-300 ease-in-out">
            <div className="pt-20 px-4">
              <div className="mb-6">
                <h3 className="text-stone-100 text-sm font-medium mb-3">Section</h3>
                <nav className="space-y-2">
                  {navigationItems.map((item) => {

                    return (
                      <Link
                        key={item.title}
                        href={item.url}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 px-3 py-2 text-stone-100 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        <item.icon size={20} />
                        <span>{item.title}</span>
                      </Link>
                    )
                  })}
                </nav>
              </div>
              
              <div className="absolute bottom-6 left-4 right-4">
                {accountItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2 text-stone-100 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    <item.icon size={20} />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <Sidebar className={`hidden lg:flex ${className}`}>
        <SidebarHeader className="bg-blue-900">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="hover:bg-blue-900">
                <a href="/" className="font-semibold">
                  <div className="aspect-square size-8 overflow-hidden rounded-lg w-10 h-10">
                    <img src="/logo.jpg" alt="Logo" className="object-cover w-full h-full rounded-lg" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-white">DEFEMNHS</span>
                    <span className="truncate text-xs text-stone-100"> Adviser </span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="bg-gradient-to-r from-blue-800 bg-blue-900">
          <SidebarGroup>
            <SidebarGroupLabel className="text-stone-100">Section</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => {
            

                  return(
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className="text-stone-100">
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="bg-gradient-to-r from-blue-800 bg-blue-900">
          <SidebarMenu>
            {accountItems.map((item) => (
              <SidebarMenuItem key={item.title} className="text-stone-100">
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    </>
  )
}