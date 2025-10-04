"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { studentInterface } from "@/app/types/student.type";
import { attendanceInterface, insertAttendanceInterface } from "@/app/types/attendance.type";
import { successAlert, errorAlert, confirmAlert } from "@/app/utils/alert";
import axios from "axios";
import { backendUrl } from "@/app/utils/url";
import Swal from "sweetalert2";
import { useTeacherStore } from "@/app/store/teacherStore";

// lucide-react icons
import { CheckCircle, XCircle, User2, CalendarDays } from "lucide-react";

export function StudentSeat({
  student,
  attendance,
  refetch
}: {
  student: studentInterface,
  attendance: attendanceInterface[],
  refetch: () => void
}) {
  const [open, setOpen] = useState(false);

  const date = new Date();
  const today = date.toISOString().split("T")[0];

  const { teacher } = useTeacherStore()

  

  const checkStudentAttendance = (student: studentInterface) => {
    if (!attendance) return "bg-white hover:bg-stone-100"
    let styles = "bg-white hover:bg-stone-100"
    attendance.forEach((item) => {
      if (student._id == item.student._id) {
        switch (item.status) {
          case "present":
            styles = "bg-green-500 text-white hover:bg-green-600"
            break;
          case "absent":
            styles = "bg-red-500 text-white hover:bg-red-600"
            break;
        }
      }
    })
    return styles
  }

  const mutation = useMutation({
    mutationFn: ({attendance, sendSms, teacher} : {attendance : insertAttendanceInterface, sendSms : boolean, teacher : string}) => axios.post(backendUrl("/attendance"), {attendance, sendSms, teacher}),
    onSuccess: () => {
      refetch()
      successAlert("Attendance recorded")
      setOpen(false)
    },
    onError: (err) => {
      errorAlert("Error occurred")
      console.log(err)
    }
  })

  const handleAttendance = (status: string) => {
    if(!teacher?._id) return
    if(status == "absent"){
      setOpen(false)
      Swal.fire({
        title: 'Send Sms To Student Parents?',
        text: "are you sure? you cant revert this.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#22c55e',
        cancelButtonColor: '#d33',
        confirmButtonText: "send sms to parents",
        cancelButtonText : "dont send",
        allowOutsideClick: false,  
        allowEscapeKey: false     
      }).then((result) => {
        let sendSms = false
        if (result.isConfirmed) sendSms = true
        mutation.mutate({
          sendSms : sendSms,
          attendance : { student: student._id, status: status, date: today},
          teacher : teacher._id
        })
      })
      return
    }
    mutation.mutate({
      sendSms : false,
      attendance : { student: student._id, status: status, date: today },
      teacher : teacher._id
    })

  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          onClick={() => setOpen(true)}
          className={` mb-1 rounded-xl shadow-md flex  text-stone-500 justify-center items-center w-24 h-24 cursor-pointer transition-all duration-200 ${checkStudentAttendance(student)}`}
          key={student._id}
        >
          <h1 className="text-xs font-medium text-center ">{student.name}</h1>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <User2 className="w-5 h-5 text-red-700" /> Student Information
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-sm text-gray-600">
            <CalendarDays className="w-4 h-4 text-gray-500" /> Date: {today}
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 rounded-lg bg-stone-50 shadow-inner space-y-2">
          <h1 className="text-base font-medium">👤 Name: <span className="font-semibold">{student.name}</span></h1>
          <h1 className="text-base font-medium">📘 Section: <span className="font-semibold">{student.section}</span></h1>
        </div>

        <DialogFooter className="flex justify-center gap-4 mt-6">
          <Button
            className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 px-6 py-2 rounded-lg"
            onClick={() => handleAttendance("present")}
          >
            <CheckCircle className="w-4 h-4" /> Present
          </Button>

          <Button
            className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 px-6 py-2 rounded-lg"
            onClick={() => handleAttendance("absent")}
          >
            <XCircle className="w-4 h-4" /> Absent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
