// app/login/page.tsx (Next.js 13+ with App Router)
"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { backendUrl } from "./utils/url";
import axios from "axios";
import LoginComponent from "./pages/auth/login";
import RegisterComponent from "./pages/auth/register";
import { successAlert, errorAlert } from "./utils/alert";
import { submitEmailModal, verificationCodeModal, changePasswordModal } from "./utils/modal";

export default function LoginPage() {
 

  const [isSignIn, setIsSignIn] = useState(true);

 

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
      <div className="bg-white shadow rounded-2xl p-8 w-[450px]">

        <div className="w-28 h-28 m-auto">
          <img src="/logo.jpg" alt="Logo" className="object-cover w-full h-full rounded-full" />
        </div>

        <br />

        <h1 className="text-2xl font-bold text-center">Sto. Tomas National High School</h1>
        <p className="text-lg text-red-900 text-center">Attendance Monitoring System</p>

        <br />

        <div className="flex w-full m-auto rounded-lg overflow-hidden">
            <div onClick={() => setIsSignIn(prev => !prev)} className={` w-full p-3 flex items-center justify-center ${(isSignIn) ? "bg-red-900 text-white" : "bg-stone-200 text-red-900"}`} >
                <h1 className="text-2xl"> Sign In </h1>
            </div>

            <div onClick={() => setIsSignIn(prev => !prev)} className={` w-full p-3 flex items-center justify-center ${(!isSignIn) ? "bg-red-900 text-white" : "bg-stone-200 text-red-900"}`}>
                <h1 className="text-2xl"> Sign up </h1>
            </div>
        </div>

        <br />

        {(isSignIn) ? <LoginComponent /> : <RegisterComponent />}

        <br />

        <div className="text-center mt-4">
          <button
            onClick={handleForgotPassword}
            className="text-red-900 hover:text-red-800 hover:underline text-sm font-medium"
          >
            Forgot Password?
          </button>
        </div>

       
      </div>

     
    </div>
  );
}
