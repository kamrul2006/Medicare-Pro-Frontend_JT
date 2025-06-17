"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 flex items-center justify-center p-4">
      <div className="max-w-4xl bg-white rounded-3xl shadow-2xl p-10 text-center">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-6">
          Welcome to Medicare Pro
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          A complete SaaS-based medical platform to manage doctors, assistants & subscriptions.
        </p>

        <div className="flex justify-center gap-8">
          <Link
            href={"/admin/login"} className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-8 py-4 rounded-full shadow-lg transition-all duration-300"
          >
            Admin Login
          </Link>
          <Link
            href={"/doctor/login"} className="bg-green-600 hover:bg-green-700 text-white text-xl px-8 py-4 rounded-full shadow-lg transition-all duration-300"
          >
            Doctor Login
          </Link>
        </div>
      </div>
    </div>
  );
}
