"use client";

import DashboardSummary from "@/components/Admin/DashboardSummary";
import DoctorTable from "@/components/Admin/DoctorTable";
import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <DashboardSummary />

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Doctors List</h2>
                <Link href="/admin/add-doctor">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        + Add Doctor
                    </button>
                </Link>
            </div>

            <DoctorTable />
        </div>
    );
}
