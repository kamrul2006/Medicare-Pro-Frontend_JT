"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DoctorDashboardLayout({ children }) {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/doctor/login");
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-green-700 text-white flex flex-col p-6">
                <h2 className="text-2xl font-bold mb-10">Doctor Panel</h2>
                <nav className="flex flex-col gap-4">
                    <Link href="/doctor/dashboard" className="hover:bg-green-600 p-2 rounded">
                        Dashboard Home
                    </Link>
                    <Link href="/doctor/dashboard/add-assistant" className="hover:bg-green-600 p-2 rounded">
                        Add Assistant
                    </Link>
                    <Link href="/doctor/dashboard/assistants" className="hover:bg-green-600 p-2 rounded">
                        View All Assistants
                    </Link>
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
