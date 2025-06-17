"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import DoctorDashboardSome from "@/components/doctor/ddctr";

export default function DoctorDashboardHome() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/doctor/login");
                return;
            }

            try {
                const res = await axios.get(
                    "https://medicare-pro-backend.vercel.app/api/v1/doctor/profile",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setProfile(res.data.doctor);
                // console.log(res.data.doctor)

            } catch (err) {
                setError("Failed to fetch profile");
            } finally {
                setLoading(false);
            }
        };


        // console.log(profile)

        fetchProfile();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-green-700 mb-4">
                Welcome, Dr. {profile?.name}
            </h1>
            <p className="text-gray-600 mb-6">Manage your assistants and your practice easily.</p>

            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
                <p><strong>Name:</strong> {profile?.name}</p>
                <p><strong>Email:</strong> {profile?.email}</p>
                <p><strong>Subscription:</strong> {profile?.subscription?.planId || "N/A"}</p>
                <p><strong>Payment Status:</strong> {profile?.subscription?.paymentStatus || "N/A"}</p>
            </div>

            <DoctorDashboardSome />
        </div>
    );
}
