"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboardLayout({ children }) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.replace("/"); // If no token, redirect to home page
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/admin/login");
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-blue-700 text-white flex flex-col p-6">
                <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
                <nav className="flex flex-col gap-4">
                    <Link href="/admin/dashboard" className="hover:bg-blue-600 p-2 rounded">
                        Dashboard Home
                    </Link>
                    <Link href="/admin/dashboard/add-doctor" className="hover:bg-blue-600 p-2 rounded">
                        Add Doctor
                    </Link>
                    <Link href="/admin/dashboard/all-doctors" className="hover:bg-blue-600 p-2 rounded">
                        View Doctors
                    </Link>
                    <Link href="/admin/dashboard/subscription" className="hover:bg-blue-600 p-2 rounded">
                        Subscription Plans
                    </Link>
                    {/* <Link href="/admin/dashboard/add-subscription" className="hover:bg-blue-600 p-2 rounded">
                        Add   Subscription
                    </Link> */}
                </nav>
                <div className="mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 hover:bg-red-600 mt-10 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-10">{children}</div>
        </div>
    );
}
