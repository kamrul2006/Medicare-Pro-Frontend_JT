"use client";

export default function DashboardSummary() {
    // Later we'll fetch these counts from API
    return (
        <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-500 text-white p-6 rounded shadow">
                <h3 className="text-lg font-semibold">Total Doctors</h3>
                <p className="text-2xl font-bold">10</p>
            </div>

            <div className="bg-yellow-500 text-white p-6 rounded shadow">
                <h3 className="text-lg font-semibold">Active Subscriptions</h3>
                <p className="text-2xl font-bold">7</p>
            </div>

            <div className="bg-red-500 text-white p-6 rounded shadow">
                <h3 className="text-lg font-semibold">Expired Subscriptions</h3>
                <p className="text-2xl font-bold">3</p>
            </div>
        </div>
    );
}
