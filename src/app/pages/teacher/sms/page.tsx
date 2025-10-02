"use client";

import { smsMessageInterface } from "@/app/types/smsMessage.type";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "@/app/utils/url";

import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, User, Phone, CalendarDays, BookOpen } from "lucide-react";

export default function Page() {
  const [smsMessage, setSmsMessage] = useState<smsMessageInterface[]>([]);

  const { data } = useQuery({
    queryKey: ["smsMessage"],
    queryFn: () => axios.get(backendUrl("/smsMessage")),
  });

  useEffect(() => {
    if (data?.data) {
      setSmsMessage(data.data.reverse());
    }
  }, [data]);

  return (
    <div className="flex-1 p-6 bg-stone-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📩 SMS Message History</h1>

      <div className="grid gap-4">
        {smsMessage.length > 0 ? (
          smsMessage.map((sms) => (
            <Card
              key={sms._id}
              className="shadow-sm hover:shadow-md transition rounded-2xl"
            >
              <CardContent className="p-4 space-y-3">
                {/* Top info row */}
                <div className="flex justify-between">
                  {/* Parent & Contact */}
                  <div>
                    <div className="flex items-center text-lg font-semibold">
                      <User className="w-4 h-4 mr-2 text-blue-600" />
                      {sms.student.parent}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="w-4 h-4 mr-2 text-green-600" />
                      {sms.student.contact}
                    </div>
                  </div>

                  {/* Date & Section */}
                  <div className="text-right">
                    <div className="flex items-center justify-end text-sm text-gray-600">
                      <CalendarDays className="w-4 h-4 mr-2 text-gray-600" />
                      {sms.date}
                    </div>
                    <div className="flex items-center justify-end text-sm text-gray-500">
                      <BookOpen className="w-4 h-4 mr-2 text-purple-600" />
                      {sms.student.section}
                    </div>
                  </div>
                </div>

                {/* SMS Message Box */}
                <div className="border rounded-xl bg-stone-100 p-4">
                  <div className="flex items-start">
                    <MessageSquare className="w-5 h-5 mr-2 text-gray-700 mt-1" />
                    <p className="text-lg font-medium text-gray-800">
                      {sms.message}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No SMS history found.</p>
        )}
      </div>
    </div>
  );
}
