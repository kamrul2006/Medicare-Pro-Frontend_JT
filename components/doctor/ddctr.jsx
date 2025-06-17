"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorDashboardSome() {
    const [profile, setProfile] = useState(null);
    const [assistantsCount, setAssistantsCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const profileRes = await axios.get(
                    "https://medicare-pro-backend.vercel.app/api/v1/doctor/profile",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setProfile(profileRes.data?.data);

                const assistantsRes = await axios.get(
                    "https://medicare-pro-backend.vercel.app/api/v1/doctor/assistants",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setAssistantsCount(assistantsRes.data?.assistants?.length || 0);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-green-700 mb-4">A Summary </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow text-center">
                    <h2 className="text-xl font-semibold mb-2">Assistants</h2>
                    <p className="text-3xl text-green-700">{assistantsCount}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow text-center">
                    <h2 className="text-xl font-semibold mb-2">Subscription Plan</h2>
                    <p className="text-green-700">{profile?.subscription?.plan?.name || "Free Plan"}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow text-center">
                    <h2 className="text-xl font-semibold mb-2">Status</h2>
                    <p className="text-green-700">Active</p>
                </div>
            </div>
        </div>
    );
}
