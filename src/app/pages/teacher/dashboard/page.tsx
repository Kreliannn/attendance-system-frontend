"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {studentInterface } from "@/app/types/student.type";
import { attendanceInterface } from "@/app/types/attendance.type";
import { successAlert, errorAlert, confirmAlert } from "@/app/utils/alert";
import axios from "axios";
import { backendUrl } from "@/app/utils/url";
import { Users, UserCheck, UserX } from "lucide-react";
import { ChartComponent } from "./components/chart";
import { PieChartComponent } from "./components/pieChart";


interface dataInterface {
  totalStudent : number,
  totalPresent : number,
  totalAbsent : number,
  chartData : {
    date : string,
    totalAbsent : number,
    totalPresent : number
  }[],
  pieChartData : {
      status : string,
      count : number,
      fill : string
  }[]
}



export default function Page() {


  const [dashboarData, setDashboarData] = useState<dataInterface | null>(null);

  const { data, isLoading  } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: () => axios.get(backendUrl("/teacher/dashboard")),
  });

  useEffect(() => {
    if (data?.data) {
      setDashboarData(data.data)
    }
  }, [data]);





  return (
    <div className="flex-1 p-6 bg-stone-50 min-h-screen">
      {/* Dashboard Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
      </div>

      {/* Top Cards */}
      <div className="max-w-6xl mx-auto flex gap-6 mb-8">
        {/* Total Students */}
        <div className="flex-1 bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-gray-500">Total Students</h2>
              <p className="text-3xl font-bold text-blue-600 mt-2">{dashboarData?.totalStudent}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Present Today */}
        <div className="flex-1 bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-gray-500">Present Today</h2>
              <p className="text-3xl font-bold text-green-600 mt-2">{dashboarData?.totalPresent}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Absent Today */}
        <div className="flex-1 bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-gray-500">Absent Today</h2>
              <p className="text-3xl font-bold text-red-600 mt-2">{dashboarData?.totalAbsent}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <UserX className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto flex gap-6">
        <div className="w-[70%] bg-white rounded-2xl p-6 shadow-sm h-[400px]">
          {dashboarData && <ChartComponent chartData={dashboarData?.chartData} />}
        </div>

        <div className="w-[30%] bg-white rounded-2xl p-6 shadow-sm h-[400px]">
          {dashboarData && <PieChartComponent chartData={dashboarData?.pieChartData} />}
        </div>
      </div>
    </div>
  );
}
