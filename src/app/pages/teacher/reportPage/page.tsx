"use client";
import { exportAttendanceToExcel } from "@/app/utils/downloadFile";
import { Button } from "@/components/ui/button";

export default function Page() {
  

  return (
    <div className="flex-1 p-6 bg-stone-50 min-h-screen"> 
           <Button onClick={exportAttendanceToExcel}> download </Button>
    </div>
  )
  
}