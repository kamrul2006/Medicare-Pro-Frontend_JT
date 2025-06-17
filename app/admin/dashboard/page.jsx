"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboardHome() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDoctors = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Unauthorized");
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(
                    "https://medicare-pro-backend.vercel.app/api/v1/admin/users",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setDoctors(res?.data || []);
            } catch (err) {
                setError("Failed to fetch doctors");
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const today = new Date();
    const totalUsers = doctors.length;
    const totalDoctors = doctors.filter((d) => d.role === "doctor").length;
    const active = doctors.filter(
        (d) => new Date(d.subscription?.endDate) > today
    ).length;
    const expired = doctors.filter(
        (d) => new Date(d.subscription?.endDate) <= today
    ).length;
    const expiring7Days = doctors.filter((d) => {
        const end = new Date(d.subscription?.endDate);
        const diffDays = (end - today) / (1000 * 60 * 60 * 24);
        return diffDays > 0 && diffDays <= 7;
    }).length;

    if (loading) return <p className="p-4 text-gray-500">Loading...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-3xl font-bold text-green-700 mb-6">
                Admin Subscription Overview
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="Total Users" count={totalUsers} color="blue" />
                <Card title="Total Doctors" count={totalDoctors} color="red" />
                <Card title="Active Subscriptions" count={active} color="green" />
                <Card title="Expiring (7 Days)" count={expiring7Days} color="yellow" />
                <Card title="Expired" count={expired} color="red" />
            </div>
        </div>
    );
}

function Card({ title, count, color }) {
    const bg = `bg-${color}-500`;
    const hoverBg = `hover:bg-${color}-600`;

    return (

        <div
            className={`rounded-xl shadow-md p-6 text-white ${bg} ${hoverBg} transition-colors duration-300`}
        >
            <h2 className="text-lg font-medium">{title}</h2>
            <p className="text-4xl font-bold mt-2">{count}</p>
        </div>
    );
}
