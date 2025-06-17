"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AllSubscriptions() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Unauthorized: No token");
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(
                    "https://medicare-pro-backend.vercel.app/api/v1/admin/plans",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setSubscriptions(res.data || []);
            } catch (err) {
                setError(err?.response?.data?.message || "Failed to fetch subscriptions");
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptions();
    }, []);

    if (loading) return <p>Loading subscriptions...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-red-700 mb-6">All Plans</h1>

            {subscriptions.length === 0 ? (
                <p>No Plans found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-300 text-sm">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="border px-4 py-2">Plan Name</th>
                                <th className="border px-4 py-2">Price ($)</th>
                                <th className="border px-4 py-2">Duration (Days)</th>

                                <th className="border px-4 py-2">Features</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptions.map((doc) => (
                                <tr key={doc._id}>
                                    <td className="border px-4 py-2">{doc.name}</td>
                                    <td className="border px-4 py-2">{doc?.price || "0.00"}</td>
                                    <td className="border px-4 py-2">{doc.durationInDays || "—"}</td>
                                    <td className="border px-4 py-2">
                                        <ul className="list-disc list-inside">
                                            {doc.features?.map((f, idx) => (
                                                <li key={idx}>{f}</li>
                                            ))}
                                        </ul>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
