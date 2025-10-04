"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { useTeacherStore } from "@/app/store/teacherStore";
import { confirmAlert, successAlert, errorAlert } from "@/app/utils/alert";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "@/app/utils/url";
import { teacherInterface } from "@/app/types/teacher.type";

export default function Page() {
  const {teacher, setTeacher} = useTeacherStore()
  const [smsMessage, setSmsMessage] = useState(teacher?.smsMessage);

  const mutation = useMutation({
    mutationFn: (teacher: teacherInterface) =>
      axios.put(backendUrl("/teacher/" + teacher._id),  teacher ),
    onSuccess: (response) => {
      const updatedData : teacherInterface = response.data
      successAlert("Sms Message Updated");
      setTeacher(updatedData)
      setSmsMessage(updatedData.smsMessage)
      console.log(updatedData)
    },
    onError: () => {
      errorAlert("Failed to edit sms message");
    },
  });


  const mutationClear = useMutation({
    mutationFn: () => axios.delete(backendUrl("/attendance/clear")),
    onSuccess: (response) => {
      successAlert("attendance cleared");
    },
    onError: () => {
      errorAlert("Failed to end quarter");
    },
  });



  const handleEndQuarter = () => {
    confirmAlert("This will clear all attendance data and reset to start.", "proceed to next quarter", () => {
      mutationClear.mutate()
    })
  };

  const updateSmsMessage = () => {
    if(!teacher || !smsMessage) return
    mutation.mutate({
      ...teacher,
      smsMessage : smsMessage
    })
  }



  return (
    <div className="flex-1 p-6 bg-stone-50 min-h-screen space-y-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* End Quarter Section */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>End Quarter</CardTitle>
            <CardDescription>
              Clicking this button will clear all attendance data and reset the system.
            </CardDescription>
          </div>
          <Button
   
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
            onClick={handleEndQuarter}
          >
            <Trash2 className="w-4 h-4" /> End Quarter
          </Button>
        </CardHeader>
      </Card>

      {/* SMS Message Section */}
      <Card>
        <CardHeader>
          <CardTitle>SMS Message</CardTitle>
          <CardDescription>
            Customize the SMS message sent when a student is absent.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={smsMessage}
            onChange={(e) => setSmsMessage(e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
        <CardFooter className="flex justify-end">
            <Button className="bg-blue-500 hover:bg-blue-600 " onClick={updateSmsMessage}> Update </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
