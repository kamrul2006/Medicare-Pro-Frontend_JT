"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditAssistant() {
    const router = useRouter();
    const params = useParams();
    const assistantId = params.id;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [permissions, setPermissions] = useState({
        managePatients: false,
        manageAppointments: false,
        manageSchedule: false,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch assistant details on mount
    useEffect(() => {
        const fetchAssistant = async () => {
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
            if (!token) {
                setError("Unauthorized: No token found");
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(
                    `https://medicare-pro-backend.vercel.app/api/v1/doctor/assistants`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const assistants = res?.data?.assistants ?? [];
                const assistant = assistants.find((a) => a._id === assistantId);

                if (!assistant) {
                    setError("Assistant not found");
                    setLoading(false);
                    return;
                }

                setName(assistant.name);
                setEmail(assistant.email);
                setPermissions({
                    managePatients: assistant.permissions?.managePatients || false,
                    manageAppointments: assistant.permissions?.manageAppointments || false,
                    manageSchedule: assistant.permissions?.manageSchedule || false,
                });

            } catch (err) {
                setError(err?.response?.data?.message || "Failed to fetch assistants");
            } finally {
                setLoading(false);
            }
        };

        fetchAssistant();
    }, [assistantId]);

    const handleCheckboxChange = (e) => {
        setPermissions({
            ...permissions,
            [e.target.name]: e.target.checked,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) {
            setError("Unauthorized: No token found");
            return;
        }

        try {
            await axios.patch(
                `https://medicare-pro-backend.vercel.app/api/v1/doctor/assistants/${assistantId}`,
                {
                    name,
                    email,
                    ...(password ? { password } : {}), // only send password if updated
                    permissions,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            alert("Assistant updated successfully!");
            router.push("/doctor/dashboard/assistants");
        } catch (err) {
            console.error(err);
            setError(err?.response?.data?.message || "Failed to update assistant");
        }
    };

    if (loading) return <p>Loading assistant details...</p>;

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-6">Edit Assistant</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-semibold">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">
                        Password (leave blank to keep unchanged)
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <fieldset>
                    <legend className="font-semibold mb-2">Permissions</legend>
                    <label className="inline-flex items-center mr-4">
                        <input
                            type="checkbox"
                            name="managePatients"
                            checked={permissions.managePatients}
                            onChange={handleCheckboxChange}
                            className="mr-1"
                        />
                        Manage Patients
                    </label>
                    <label className="inline-flex items-center mr-4">
                        <input
                            type="checkbox"
                            name="manageAppointments"
                            checked={permissions.manageAppointments}
                            onChange={handleCheckboxChange}
                            className="mr-1"
                        />
                        Manage Appointments
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="manageSchedule"
                            checked={permissions.manageSchedule}
                            onChange={handleCheckboxChange}
                            className="mr-1"
                        />
                        Manage Schedule
                    </label>
                </fieldset>

                {error && <p className="text-red-500">{error}</p>}

                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mt-4"
                >
                    Update Assistant
                </button>
            </form>
        </div>
    );
}
