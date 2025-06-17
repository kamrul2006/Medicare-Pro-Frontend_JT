"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function AddDoctor() {
    const router = useRouter();
    const { token } = useSelector((state) => state.auth);

    const [plans, setPlans] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        specialization: "",
        subscriptionPlan: "",
    });

    const [loading, setLoading] = useState(false);

    // Fetch subscription plans
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await axios.get(
                    "https://medicare-pro-backend.vercel.app/api/v1/admin/plans"
                );
                setPlans(res.data);
            } catch (err) {
                console.error("Error fetching plans", err);
            }
        };

        fetchPlans();
    }, []);


    // console.log(plans)

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: "doctor",
                planId: formData.subscriptionPlan,
                paymentStatus: "success"
            };

            const res = await axios.post(
                "https://medicare-pro-backend.vercel.app/api/v1/admin/create-doctor",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // console.log("Doctor created:", res.data);
            alert("Doctor added successfully!");
            router.push("/admin/dashboard");
        } catch (err) {
            console.error("Error adding doctor:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Failed to add doctor");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="p-8 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Add Doctor</h1>

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="w-full p-3 border rounded"
                />

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full p-3 border rounded"
                />

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full p-3 border rounded"
                />

                <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="Specialization"
                    required
                    className="w-full p-3 border rounded"
                />

                <select
                    name="subscriptionPlan"
                    value={formData.subscriptionPlan}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded"
                >
                    <option value="">Select Subscription Plan</option>
                    {plans?.map((plan) => (
                        <option key={plan._id} value={plan._id}>
                            {plan.name} - ${plan.price} ({plan.duration} days)
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-3 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {loading ? "Adding..." : "Add Doctor"}
                </button>
            </form>
        </div>
    );
}
