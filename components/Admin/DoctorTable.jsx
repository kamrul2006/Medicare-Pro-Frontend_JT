"use client";

export default function DoctorTable() {
    // Static data for now
    const doctors = [
        {
            name: "Dr. John Doe",
            email: "john@example.com",
            specialization: "Cardiologist",
            subscriptionStart: "2024-06-01",
            subscriptionEnd: "2025-06-01",
        },
    ];

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Specialization</th>
                        <th className="py-2 px-4 border">Subscription Start</th>
                        <th className="py-2 px-4 border">Subscription End</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doc, idx) => (
                        <tr key={idx} className="text-center">
                            <td className="py-2 px-4 border">{doc.name}</td>
                            <td className="py-2 px-4 border">{doc.email}</td>
                            <td className="py-2 px-4 border">{doc.specialization}</td>
                            <td className="py-2 px-4 border">{doc.subscriptionStart}</td>
                            <td className="py-2 px-4 border">{doc.subscriptionEnd}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
