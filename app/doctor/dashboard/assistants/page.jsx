"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AssistantsList() {
    const [assistants, setAssistants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    const fetchAssistants = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Unauthorized: No token found");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.get(
                "https://medicare-pro-backend.vercel.app/api/v1/doctor/assistants",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAssistants(res.data.assistants);
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to fetch assistants");
        } finally {
            setLoading(false);
        }
    };

    // console.log(assistants)

    useEffect(() => {
        fetchAssistants();
    }, []);

    // Delete assistant handler
    const handleDelete = async (assistantId) => {
        if (!confirm("Are you sure you want to delete this assistant?")) return;

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Unauthorized: No token found");
            return;
        }

        try {
            await axios.delete(
                `https://medicare-pro-backend.vercel.app/api/v1/doctor/assistants/${assistantId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            alert("Assistant deleted successfully!");
            fetchAssistants();
        } catch (err) {
            alert(err?.response?.data?.message || "Failed to delete assistant");
        }
    };

    // Navigate to edit page
    const handleEdit = (assistantId) => {
        router.push(`/doctor/dashboard/edit-assistant/${assistantId}`);
    };

    return (
        <div className="max-w-5xl mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-6">All Assistants</h2>

            {loading && <p>Loading assistants...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && assistants.length === 0 && <p>No assistants found.</p>}

            {!loading && assistants.length > 0 && (
                <div className="overflow-x-auto bg-white shadow rounded">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-green-600 text-white">
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Permissions</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assistants.map((assistant) => (
                                <tr key={assistant._id} className="border-b">
                                    <td className="px-4 py-2">{assistant.name}</td>
                                    <td className="px-4 py-2">{assistant.email}</td>
                                    <td className="px-4 py-2">
                                        <div className="space-y-1">
                                            <p>
                                                Manage Patients:{" "}
                                                {assistant.permissions?.managePatients ? "✅" : "❌"}
                                            </p>
                                            <p>
                                                Manage Appointments:{" "}
                                                {assistant.permissions?.manageAppointments ? "✅" : "❌"}
                                            </p>
                                            <p>
                                                Manage Schedule:{" "}
                                                {assistant.permissions?.manageSchedule ? "✅" : "❌"}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-center space-x-3">
                                        <button
                                            onClick={() => handleEdit(assistant._id)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(assistant._id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
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
