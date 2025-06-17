"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AllDoctors() {
    const { token } = useSelector((state) => state.auth);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await axios.get(
                    "https://medicare-pro-backend.vercel.app/api/v1/admin/users",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = res.data;
                const doctr = data.filter((doc) => doc.role == "doctor")
                setDoctors(doctr)

            } catch (err) {
                console.error("Error fetching doctors:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, [token]);


    console.log(doctors)


    if (loading) {
        return <div className="p-8 text-center">Loading doctors...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">All Doctors</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Specialization</th>
                            <th className="p-3 border">Start Date</th>
                            <th className="p-3 border">End Date</th>
                            <th className="p-3 border">Status</th>
                            {/* <th className="p-3 border">Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doc) => (
                            <tr key={doc._id} className="text-center">
                                <td className="p-3 border">{doc.name}</td>
                                <td className="p-3 border">{doc.email}</td>
                                <td className="p-3 border">{doc.specialization || "N/M"}</td>
                                <td className="p-3 border">
                                    {doc.subscription?.startDate
                                        ? new Date(doc.subscription.startDate).toLocaleDateString()
                                        : "N/A"}
                                </td>
                                <td className="p-3 border">
                                    {doc.subscription?.endDate
                                        ? new Date(doc.subscription.endDate).toLocaleDateString()
                                        : "N/A"}
                                </td>
                                <td className="p-3 border">
                                    {doc.subscription?.isActive == true && "🟢" || "N/A"}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
