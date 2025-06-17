"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function EditSubscriptionPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    const [plan, setPlan] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Unauthorized.");
            return;
        }

        if (!id) return;

        axios
            .get(`https://medicare-pro-backend.vercel.app/api/v1/admin/plans/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => setPlan(res?.data))
            .catch((err) => {
                console.error(err);
                setError("Failed to load plan data.");
            });
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            await axios.patch(
                `https://medicare-pro-backend.vercel.app/api/v1/admin/plans/${id}`,
                plan,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            router.push("/admin/dashboard/subscriptions");
        } catch (err) {
            console.error(err);
            setError("No API FOUND ON POST MAN");
        }
    };

    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (!plan) return <div className="p-4">Loading...</div>;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
            <h2 className="text-2xl font-bold mb-4">Edit Subscription</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
                <input
                    type="text"
                    value={plan.name}
                    onChange={(e) => setPlan({ ...plan, name: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="number"
                    value={plan.price}
                    onChange={(e) => setPlan({ ...plan, price: Number(e.target.value) })}
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="number"
                    value={plan.durationInDays}
                    onChange={(e) =>
                        setPlan({ ...plan, durationInDays: Number(e.target.value) })
                    }
                    className="w-full border px-3 py-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded"
                >
                    Update
                </button>
            </form>
        </div>
    );
}
