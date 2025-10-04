"use client";

import { exportAttendanceToExcel, exportAttendanceToPDF } from "@/app/utils/downloadFile";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { studentInterface } from "@/app/types/student.type";
import { attendanceInterface } from "@/app/types/attendance.type";
import axios from "axios";
import { backendUrl } from "@/app/utils/url";
import { FileDown, FileSpreadsheet } from "lucide-react";

export default function Page() {
  const [students, setStudents] = useState<studentInterface[]>([]);
  const [section, setSection] = useState("Humss");
  const [attendance, setAttendance] = useState<attendanceInterface[]>([]);
  

  // Fetch students
  const { data } = useQuery({
    queryKey: ["students"],
    queryFn: () => axios.get(backendUrl("/student")),
  });

  useEffect(() => {
    if (data?.data) {
      const allStudents: studentInterface[] = data.data;
      setStudents(allStudents.filter((e) => e.section == section));
    }
  }, [data, section]);

  // Fetch attendance
  const { data: attendanceData } = useQuery({
    queryKey: ["attendance"],
    queryFn: () => axios.get(backendUrl("/attendance")),
  });

  useEffect(() => {
    if (attendanceData?.data) {
      setAttendance(attendanceData.data);
    }
  }, [attendanceData]);

  // Extract unique dates
  const allDate = attendance.map((item) => item.date);
  const dates = [...new Set(allDate)].sort();

  return (
    <div className="flex-1 p-6 bg-stone-50 min-h-screen space-y-6">

      <div className="flex w-full m-auto rounded-lg overflow-hidden">
          <div onClick={() => setSection("Humss")} className={` w-full p-3 flex items-center justify-center ${(section == "Humss") ? "bg-blue-900 text-white" : "bg-stone-200 text-blue-900"}`} >
              <h1 className="text-2xl"> Humss </h1>
          </div>

          <div onClick={() => setSection("Cookery")} className={` w-full p-3 flex items-center justify-center ${(section != "Humss") ? "bg-blue-900 text-white" : "bg-stone-200 text-blue-900"}`}>
              <h1 className="text-2xl"> Cookery </h1>
          </div>
      </div>

      <br />

      {/* Header Card */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Attendance Records</CardTitle>
            <CardDescription>
              Section: <span className="font-medium">{section}</span>
            </CardDescription>
          </div>

          <div className="flex gap-4">
            <Button
              variant="default"
              className="flex items-center bg-blue-800 hover:bg-blue-900 gap-2"
              onClick={() => exportAttendanceToExcel(students, attendance)}
            >
              <FileSpreadsheet className="w-4 h-4" /> Download Excel
            </Button>
            <Button
              variant="default"
              className="flex items-center bg-blue-800 hover:bg-blue-900 gap-2"
              onClick={() => exportAttendanceToPDF(students, attendance)}
            >
              <FileDown className="w-4 h-4" /> Download PDF
            </Button>
          </div>
        </CardHeader>
      </Card>


      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Table</CardTitle>
          <CardDescription>Student-wise daily attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Student</TableHead>
                  {dates.map((date) => (
                    <TableHead key={date}>{date}</TableHead>
                  ))}
                  <TableHead>Total Present</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => {
                  let total = 0;
                  return (
                    <TableRow key={student._id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      {dates.map((date) => {
                        let status = "no record"; // Absent by default
                        attendance.forEach((item) => {
                          if (item.student._id === student._id && item.date === date) {
                            if (item.status === "present") {
                              status = "present";
                              total += 1;
                            } else {
                              status = "absent";
                            }
                          }
                        });
                        return (
                          <TableCell
                            key={date}
                            className={`
                              ${status === "present"  && "text-green-600 font-medium"}
                              ${status === "absent"  && "text-red-600 font-medium"}
                              ${status === "no record"  && "text-stone-600 font-medium"}
                              `
                            }
                          >
                            {status}
                          </TableCell>
                        );
                      })}
                      <TableCell className="font-semibold">{total}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
