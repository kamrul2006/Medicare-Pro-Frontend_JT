"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function PlanManagement() {
    const [plans, setPlans] = useState([]);
    const [error, setError] = useState("");
    const router = useRouter();

    const fetchPlans = async () => {
        try {
            const res = await axios.get("https://medicare-pro-backend.vercel.app/api/v1/admin/plans");
            setPlans(res.data || []);
        } catch (err) {
            setError("Failed to load plans.");
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Unauthorized");
            return;
        }

        if (!confirm("Are you sure to delete this plan?")) return;

        try {
            await axios.delete(
                `https://medicare-pro-backend.vercel.app/api/v1/admin/plans/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchPlans();
        } catch (err) {
            alert("No API FOUND ON POST MAN");
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    return (
        <div className="max-w-5xl mx-auto mt-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Subscription Plan Management</h2>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => router.push("/admin/dashboard/add-subscription")}
                >
                    + Add New Plan
                </button>
            </div>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded shadow">
                    <thead className="bg-gray-100 text-left text-sm font-semibold">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Duration</th>
                            <th className="p-3">Default</th>
                            <th className="p-3">Active</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.map((plan) => (
                            <tr key={plan._id} className="border-t text-sm">
                                <td className="p-3">{plan.name}</td>
                                <td className="p-3">${plan.price}</td>
                                <td className="p-3">{plan.durationInDays} days</td>
                                <td className="p-3">{plan.isDefault ? "✅" : "❌"}</td>
                                <td className="p-3">{plan.isActive ? "🟢" : "🔴"}</td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() => router.push(`/admin/dashboard/subscription/edit/${plan._id}`)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(plan._id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {plans.length === 0 && (
                            <tr>
                                <td className="p-3 text-gray-500" colSpan="6">
                                    No plans found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
