"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [email, setEmail] = useState("admin@domain124.com");
    const [password, setPassword] = useState("admin123");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/auth/login", {
                email,
                password,
            });

            console.log("Response: ", response.data);

            dispatch(
                setCredentials({
                    token: response.data.token,
                    role: response.data.role,
                })
            );

            alert("Login Successful");
            router.push("/admin/dashboard");
        } catch (error) {
            console.error("Full Error Object: ", error);
            console.error("Error Response: ", error.response);
            console.error("Error Data: ", error.response?.data);
            alert("Login Failed. Please check your credentials.");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Admin Login</h1>

            <input
                className="border p-3 rounded mb-4 w-80"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className="border p-3 rounded mb-4 w-80"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                className="bg-blue-500 text-white px-5 py-3 rounded w-80"
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </div>
    );
}
