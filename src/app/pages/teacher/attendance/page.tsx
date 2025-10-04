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
          <div onClick={() => setSection("Humss")} className={` w-full p-3 flex items-center justify-center ${(section == "Humss") ? "bg-blue-900 text-white" : "bg-stone-200 text-blue-900"}`} >
              <h1 className="text-2xl"> Humss </h1>
          </div>

          <div onClick={() => setSection("Cookery")} className={` w-full p-3 flex items-center justify-center ${(section != "Humss") ? "bg-blue-900 text-white" : "bg-stone-200 text-blue-900"}`}>
              <h1 className="text-2xl"> Cookery </h1>
          </div>
      </div>

      <br />

      <div className="m-auto w-5/6 ">
          <h1 className="text-blue-900 text-4xl font-bold"> Students Seats </h1>
      </div>

      <br />

      <div className="m-auto w-full max-w-6xl shadow bg-stone-50 rounded p-5">
        <div className="flex flex-col-reverse gap-3">
          {Array.from({ length: Math.ceil(students.length / 10) }).map((_, rowIndex) => {
            const rowStudents = students.slice(rowIndex * 10, rowIndex * 10 + 10);

            return (
              <div key={rowIndex} className="grid grid-cols-11 gap-2">
                {/* Left side - 5 seats */}
                {rowStudents.slice(0, 5).map((student) => (
                  <StudentSeat
                    key={student._id}
                    student={student}
                    attendance={attendance}
                    refetch={refetch}
                  />
                ))}

                {/* Teacher space / aisle (always empty) */}
                <div className="bg-transparent" />

                {/* Right side - 5 seats */}
                {rowStudents.slice(5, 10).map((student) => (
                  <StudentSeat
                    key={student._id}
                    student={student}
                    attendance={attendance}
                    refetch={refetch}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>



    </div>
  )
  
}