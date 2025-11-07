// app/login/page.tsx (Next.js 13+ with App Router)
"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { backendUrl } from "./utils/url";
import axios from "axios";
import LoginComponent from "./pages/auth/login";
import RegisterComponent from "./pages/auth/register";
import { successAlert, errorAlert } from "./utils/alert";
import { submitEmailModal, verificationCodeModal, changePasswordModal } from "./utils/modal";
import { useQuery } from "@tanstack/react-query";

export default function LoginPage() {
 

  const [isSignIn, setIsSignIn] = useState(true);

  const [isSeverSleep, setIsSeverSleep] = useState(true);


  const { data, isLoading  } = useQuery({
    queryKey: ["server"],
    queryFn: () => axios.get(backendUrl("/teacher/dashboard")),
    refetchInterval : 1000
  });

  useEffect(() => {
    if (data?.data) {
      setIsSeverSleep(false)
    }
  }, [data]);

 

  const sendEmailMutation = useMutation({
      mutationFn: (email : string) => axios.post(backendUrl("/teacher/password"),  {email}),
      onSuccess: (response) => {
        successAlert("verification code sent to you email")
        const email = response.data.email
        const pin = response.data.pin

        verificationCodeModal(pin, () => {
          changePasswordModal(email, (password) => {
            changePasswordMutation.mutate({ email, password})
          })
        })
  

      },
      onError: (e) => {
          errorAlert("account not found");
      },
  });


  const changePasswordMutation = useMutation({
      mutationFn: (data : {email : string, password : string}) => axios.put(backendUrl("/teacher/password"),  data),
      onSuccess: (response) => {
        successAlert("password updated")
      },
      onError: (e) => {
          errorAlert("account not found");
      },
  });



  const handleForgotPassword = () => {
    submitEmailModal((email) => {
      sendEmailMutation.mutate(email)
    })
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="fixed top-4 right-4 z-50">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg text-white ${
            isSeverSleep ? "bg-red-600 animate-pulse" : "bg-green-600"
          }`}
        >
          <span
            className={`w-3 h-3 rounded-full ${
              isSeverSleep ? "bg-red-300" : "bg-green-300"
            }`}
          ></span>
          <span className="font-medium text-sm">
              {isSeverSleep ? (
                <span className="font-medium text-sm">
                  Server asleep — please wait <b>3–5 minutes</b> before you can access the system’s backend.
                </span>
              ) : (
                <span className="font-medium text-sm">
                  Server is awake — backend is now accessible ✅
                </span>
            )}
          </span>
        </div>
      </div>

      <div className="bg-white shadow rounded-2xl p-8 w-[450px]">

        <div className="w-28 h-28 m-auto">
          <img src="/logo.jpg" alt="Logo" className="object-cover w-full h-full rounded-full" />
        </div>

        <br />

        <h1 className="text-2xl font-bold text-center" > DEFEMNHS</h1>
        <p className="text-lg text-blue-900 text-center">Attendance Monitoring System</p>

        <br />

        <div className="flex w-full m-auto rounded-lg overflow-hidden">
            <div onClick={() => setIsSignIn(prev => !prev)} className={` w-full p-3 flex items-center justify-center ${(isSignIn) ? "bg-blue-900 text-white" : "bg-stone-200 text-blue-900"}`} >
                <h1 className="text-2xl"> Sign In </h1>
            </div>

            <div onClick={() => setIsSignIn(prev => !prev)} className={` w-full p-3 flex items-center justify-center ${(!isSignIn) ? "bg-blue-900 text-white" : "bg-stone-200 text-blue-900"}`}>
                <h1 className="text-2xl"> Sign up </h1>
            </div>
        </div>

        <br />

        {(isSignIn) ? <LoginComponent /> : <RegisterComponent />}

        <br />

        <div className="text-center mt-4">
          <button
            onClick={handleForgotPassword}
            className="text-blue-900 hover:text-blue-800 hover:underline text-sm font-medium"
          >
            Forgot Password?
          </button>
        </div>

       
      </div>

     
    </div>
  );
}
