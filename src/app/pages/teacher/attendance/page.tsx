"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {studentInterface } from "@/app/types/student.type";
import { attendanceInterface } from "@/app/types/attendance.type";
import { successAlert, errorAlert, confirmAlert } from "@/app/utils/alert";
import axios from "axios";
import { backendUrl } from "@/app/utils/url";
import { StudentSeat } from "./components/studentAttendance";



export default function Page() {

  const [students, setStudents] = useState<studentInterface[]>([]);
  const [section, setSection] = useState("Humss");


  const { data } = useQuery({
    queryKey: ["students"],
    queryFn: () => axios.get(backendUrl("/student")),
  });

  useEffect(() => {
    if (data?.data) {
       const allStudents : studentInterface[] = data.data
       setStudents(allStudents.filter((e) => e.section == section));
    }
  }, [data, section]);

  const [attendance, setAttendance] = useState<attendanceInterface[]>([]);

  const { data : attendanceData, refetch } = useQuery({
    queryKey: ["attendance"],
    queryFn: () => axios.get(backendUrl("/attendance/today")),
  });

  useEffect(() => {
    if (attendanceData?.data) {
       setAttendance(attendanceData.data)
    }
  }, [attendanceData]);

  console.log(attendance)
 

  return (
    <div className="flex-1 p-6 bg-stone-50 min-h-screen"> 
        <div className="flex w-full m-auto rounded-lg overflow-hidden">
          <div onClick={() => setSection("Humss")} className={` w-full p-3 flex items-center justify-center ${(section == "Humss") ? "bg-red-900 text-white" : "bg-stone-200 text-red-900"}`} >
              <h1 className="text-2xl"> Humss </h1>
          </div>

          <div onClick={() => setSection("Cookery")} className={` w-full p-3 flex items-center justify-center ${(section != "Humss") ? "bg-red-900 text-white" : "bg-stone-200 text-red-900"}`}>
              <h1 className="text-2xl"> Cookery </h1>
          </div>
      </div>

      <br />

      <div className="m-auto w-5/6 ">
          <h1 className="text-red-900 text-4xl font-bold"> Students Seats </h1>
      </div>

      <br />

      <div className="m-auto w-5/6 shadow bg-stone-50 rounded p-3 grid grid-cols-7  ">
        {students.map((student) => (
          <StudentSeat key={student._id}  student={student} attendance={attendance} refetch={refetch} />
        ))}
      </div>

    </div>
  )
  
}