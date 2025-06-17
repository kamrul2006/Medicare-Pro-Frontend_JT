"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddSubscription() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [durationInDays, setDurationInDays] = useState("");
    const [features, setFeatures] = useState([]);
    const [featureInput, setFeatureInput] = useState("");
    const [isDefault, setIsDefault] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleAddFeature = () => {
        const trimmed = featureInput.trim();
        if (trimmed) {
            setFeatures([...features, trimmed]);
            setFeatureInput("");
        }
    };

    const handleRemoveFeature = (index) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Unauthorized. Please log in.");
            return;
        }

        try {
            await axios.post(
                "https://medicare-pro-backend.vercel.app/api/v1/admin/plans/create",
                {
                    name,
                    price: parseFloat(price),
                    durationInDays: parseInt(durationInDays),
                    isDefault,
                    features,
                    isActive,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setSuccess("Subscription plan added successfully!");
            router.push("/admin/dashboard/subscription");
        } catch (err) {
            console.error("Error:", err);
            setError(err?.response?.data?.message || "Failed to create subscription plan");
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow p-6 mt-10 rounded">
            <h2 className="text-2xl font-bold mb-6 text-blue-700">Add New Subscription Plan</h2>

            {error && <p className="text-red-600 mb-4">{error}</p>}
            {success && <p className="text-blue-600 mb-4">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Price ($)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Duration (in days)</label>
                    <input
                        type="number"
                        value={durationInDays}
                        onChange={(e) => setDurationInDays(e.target.value)}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Features</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={featureInput}
                            onChange={(e) => setFeatureInput(e.target.value)}
                            placeholder="e.g., Full Access"
                            className="flex-1 border px-3 py-2 rounded"
                        />
                        <button
                            type="button"
                            onClick={handleAddFeature}
                            className="bg-blue-600 text-white px-4 rounded"
                        >
                            Add
                        </button>
                    </div>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        {features.map((f, idx) => (
                            <li key={idx} className="flex justify-between items-center">
                                {f}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFeature(idx)}
                                    className="text-red-500 text-xs ml-2"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex gap-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={isDefault}
                            onChange={() => setIsDefault(!isDefault)}
                            className="mr-2"
                        />
                        Default Plan
                    </label>

                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() => setIsActive(!isActive)}
                            className="mr-2"
                        />
                        Active
                    </label>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                >
                    Add Subscription
                </button>
            </form>
        </div>
    );
}
