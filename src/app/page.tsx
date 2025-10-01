// app/login/page.tsx (Next.js 13+ with App Router)
"use client";

import { useState } from "react";
import LoginComponent from "./pages/auth/login";
import RegisterComponent from "./pages/auth/register";

export default function LoginPage() {
 

  const [isSignIn, setIsSignIn] = useState(true);

  

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
       
      </div>
    </div>
  );
}
