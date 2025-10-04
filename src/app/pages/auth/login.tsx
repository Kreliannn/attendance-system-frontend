"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { backendUrl } from "@/app/utils/url";
import { successAlert, errorAlert } from "@/app/utils/alert";
import {insertTeacherInterface} from "@/app/types/teacher.type";
import { useTeacherStore } from "@/app/store/teacherStore";
import { useRouter } from "next/navigation";

export default function LoginComponent() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const {setTeacher} = useTeacherStore()


    const mutation = useMutation({
        mutationFn: (data: {username: string, password: string}) => axios.post(backendUrl("/teacher/login"),  data),
        onSuccess: (response) => {
           setTeacher(response.data)
           router.push("/pages/teacher/dashboard")
        },
        onError: (e) => {
            console.log(e)
            errorAlert("wrong credentials");
            setIsLoading(false)
        },
    });

    const loginHandler = () => {
        if (!username || !password) return errorAlert("All fields are required")
        setIsLoading(true)
        mutation.mutate({username, password})
    }

  return (
    <form className="space-y-4">
        {/* Username */}
        <div>
        <label
            htmlFor="username"
            className="block text-sm font-medium text-blue-800"
        >
            Username
        </label>
        <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
            placeholder="Enter username"
            required
        />
        </div>

        {/* Password */}
        <div>
        <label
            htmlFor="password"
            className="block text-sm font-medium text-blue-800"
        >
            Password
        </label>
        <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
            placeholder="Enter password"
            required
        />
        </div>

        <br />

        {/* Submit button */}
        <button
        type="submit"
        className={`w-full bg-blue-900 text-white font-medium py-2 rounded-lg hover:bg-blue-800 transition ${isLoading && "animate-pulse" }`}
        disabled={isLoading}
        onClick={loginHandler}
        >
            Sign In
        </button>
    </form>
  )
  
}