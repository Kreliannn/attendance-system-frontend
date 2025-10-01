"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useTeacherStore } from "@/app/store/teacherStore";
import { confirmAlert } from "@/app/utils/alert";

export default function Page() {
  const {teacher} = useTeacherStore()
  const [smsMessage, setSmsMessage] = useState(teacher?.smsMessage);

  const handleEndQuarter = () => {
    confirmAlert("This will clear all attendance data and reset to start.", "proceed to next quarter", () => {

    })
  };

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
            variant="destructive"
            className="flex items-center gap-2"
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
      </Card>
    </div>
  );
}
