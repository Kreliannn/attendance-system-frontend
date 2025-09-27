"use client"
import Link from "next/link";
import { TeacherSideBar } from "@/components/ui/sidebarTeacher";
import { SidebarProvider } from "@/components/ui/sidebar";


export default function ManagerLayout({ children }: { children: React.ReactNode }) {


    return (
      <div className="flex min-h-screen ">
          <SidebarProvider>
                
                <TeacherSideBar />
                {/* Main content area */}
                <main className="w-full">
                    <div className="mb-[80px] md:mb-[0px]"> </div>
                    {children}
                </main>
          </SidebarProvider>
       
      </div>
    );
  }