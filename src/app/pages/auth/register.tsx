"use client";
import { useState } from "react";


export default function RegisterComponent() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <form className="space-y-4">

        {/* email */}
        <div>
            <label
                htmlFor="email"
                className="block text-sm font-medium text-red-800"
            >
                email
            </label>
            <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-red-900"
                placeholder="Enter email"
                required
            />
        </div>

        {/* Username */}
        <div>
            <label
                htmlFor="username"
                className="block text-sm font-medium text-red-800"
            >
                Username
            </label>
            <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-red-900"
                placeholder="Enter username"
                required
            />
        </div>

        <div className="flex gap-2">
            {/* Password */}
            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-red-800"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-red-900"
                    placeholder="Enter password"
                    required
                />
            </div>


            {/* Password */}
            <div>
                <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-red-800"
                >
                    confirm password
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-red-900"
                    placeholder="Enter password"
                    required
                />
            </div>

        </div>

        <br />

        {/* Submit button */}
        <button
        type="submit"
        className="w-full bg-red-900 text-white font-medium py-2 rounded-lg hover:bg-red-800 transition"
        >
            Sign Up
        </button>
    </form>
  )
  
}