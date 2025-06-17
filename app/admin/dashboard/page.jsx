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

    const totalDoctors = doctors.length;
    const active = doctors.filter(d => new Date(d.subscription?.endDate) > today).length;
    const expired = doctors.filter(d => new Date(d.subscription?.endDate) <= today).length;
    const expiring7Days = doctors.filter(d => {
        const end = new Date(d.subscription?.endDate);
        const diffDays = (end - today) / (1000 * 60 * 60 * 24);
        return diffDays > 0 && diffDays <= 7;
    }).length;

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-green-700 mb-4">Admin Subscription Overview</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <Card title="Total Doctors" count={totalDoctors} color="blue" />
                <Card title="Active Subscriptions" count={active} color="green" />
                <Card title="Expiring (7 Days)" count={expiring7Days} color="yellow" />
                <Card title="Expired" count={expired} color="red" />
            </div>

            {/* Doctors Table */}
            <div className="bg-white rounded shadow p-4">
                <h2 className="text-xl font-semibold mb-4">All user List</h2>
                <table className="w-full table-auto border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Plan</th>
                            <th className="p-2 border">End Date</th>
                            <th className="p-2 border">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doc) => {
                            const endDate = new Date(doc.subscription?.endDate);
                            const isExpired = endDate <= today;
                            const status = isExpired
                                ? "Expired"
                                : (endDate - today) / (1000 * 60 * 60 * 24) <= 7
                                    ? "Expiring Soon"
                                    : "Active";

                            const color =
                                status === "Active"
                                    ? "green"
                                    : status === "Expiring Soon"
                                        ? "yellow"
                                        : "red";

                            return (
                                <tr key={doc._id}>
                                    <td className="p-2 border">{doc.name}</td>
                                    <td className="p-2 border">{doc.email}</td>
                                    <td className="p-2 border">{doc.subscription?.plan?.name || "N/A"}</td>
                                    <td className="p-2 border">{endDate.toLocaleDateString()}</td>
                                    <td className={`p-2 border ${doc.role == "doctor" ? "text-blue-700" : "text-green-700"} font-bold `}>{doc.role}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Card({ title, count, color }) {
    return (
        <div className={`bg-${color}-100 text-${color}-800 p-6 rounded-lg shadow text-center`}>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-3xl mt-2">{count}</p>
        </div>
    );
}
