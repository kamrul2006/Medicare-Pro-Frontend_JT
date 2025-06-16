"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
    const { token } = useSelector((state) => state.auth);
    const [doctors, setDoctors] = useState([]);

    console.log(doctors)

    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");

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
                setDoctors(res.data);
                setFilteredDoctors(res.data);
            } catch (err) {
                console.error("Error fetching doctors:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, [token]);

    const getStatus = (endDate) => {
        if (!endDate) return "N/A";

        const end = new Date(endDate);
        const now = new Date();
        const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return "Expired";
        if (diffDays <= 7) return "Expiring Soon";
        return "Active";
    };

    const handleFilter = (days) => {
        setFilter(days);
        if (days === "all") {
            setFilteredDoctors(doctors);
        } else if (days === "expired") {
            const result = doctors.filter((doc) => getStatus(doc.subscription?.endDate) === "Expired");
            setFilteredDoctors(result);
        } else {
            const result = doctors.filter((doc) => {
                if (!doc.subscription?.endDate) return false;
                const end = new Date(doc.subscription.endDate);
                const now = new Date();
                const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
                return diffDays >= 0 && diffDays <= days;
            });
            setFilteredDoctors(result);
        }
    };

    const handleSort = () => {
        const sorted = [...filteredDoctors].sort((a, b) => {
            const dateA = new Date(a.subscription?.endDate);
            const dateB = new Date(b.subscription?.endDate);
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        setFilteredDoctors(sorted);
    };

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            {/* Summary */}
            <div className="bg-blue-100 p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-semibold">Total Doctors</h2>
                    <p className="text-2xl">{doctors.length}</p>
                </div>
                <div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={() => handleFilter("all")}>All</button>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded mr-2" onClick={() => handleFilter(7)}>Expiring 7 days</button>
                    <button className="bg-yellow-400 text-white px-4 py-2 rounded mr-2" onClick={() => handleFilter(15)}>Expiring 15 days</button>
                    <button className="bg-yellow-300 text-white px-4 py-2 rounded mr-2" onClick={() => handleFilter(30)}>Expiring 30 days</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleFilter("expired")}>Expired</button>
                </div>
            </div>

            {/* Doctor List */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Specialization</th>
                            <th className="p-3 border">Start Date</th>
                            <th className="p-3 border">
                                End Date
                                <button className="ml-2 text-blue-600" onClick={handleSort}>
                                    {sortOrder === "asc" ? "↑" : "↓"}
                                </button>
                            </th>
                            <th className="p-3 border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDoctors.map((doc) => (
                            <tr key={doc._id} className="text-center">
                                <td className="p-3 border">{doc.name}</td>
                                <td className="p-3 border">{doc.email}</td>
                                <td className="p-3 border">{doc.specialization}</td>
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
                                    <span
                                        className={`px-3 py-1 rounded text-white ${getStatus(doc.subscription?.endDate) === "Active"
                                            ? "bg-green-500"
                                            : getStatus(doc.subscription?.endDate) === "Expiring Soon"
                                                ? "bg-yellow-500"
                                                : "bg-red-500"
                                            }`}
                                    >
                                        {getStatus(doc.subscription?.endDate)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
