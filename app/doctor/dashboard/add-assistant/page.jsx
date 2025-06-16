"use client";

import { useState } from "react";
import axios from "axios";

export default function AddAssistant() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        managePatients: false,
        manageAppointments: false,
        manageSchedule: false,
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        const token = localStorage.getItem("token"); // doctor token

        const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            permissions: {
                managePatients: formData.managePatients,
                manageAppointments: formData.manageAppointments,
                manageSchedule: formData.manageSchedule,
            },
        };

        try {
            const res = await axios.post(
                "https://medicare-pro-backend.vercel.app/api/v1/doctor/assistants",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setSuccess("Assistant added successfully!");
            setFormData({
                name: "",
                email: "",
                password: "",
                managePatients: false,
                manageAppointments: false,
                manageSchedule: false,
            });
        } catch (err) {
            console.error("Error adding assistant: ", err);
            setError(err?.response?.data?.message || "Failed to add assistant");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
            <h2 className="text-2xl font-bold mb-6">Add Assistant</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block mb-1 font-semibold">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="font-semibold block mb-2">Permissions</label>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="managePatients"
                            checked={formData.managePatients}
                            onChange={handleChange}
                        />
                        <span>Manage Patients</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="manageAppointments"
                            checked={formData.manageAppointments}
                            onChange={handleChange}
                        />
                        <span>Manage Appointments</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="manageSchedule"
                            checked={formData.manageSchedule}
                            onChange={handleChange}
                        />
                        <span>Manage Schedule</span>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Add Assistant"}
                </button>

                {success && <p className="text-green-600 mt-4">{success}</p>}
                {error && <p className="text-red-600 mt-4">{error}</p>}
            </form>
        </div>
    );
}
