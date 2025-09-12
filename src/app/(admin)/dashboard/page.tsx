"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, FileText, Building } from "lucide-react";

export default function AdminDashboard() {
  const [totalBlogs, setTotalBlogs] = useState<number | null>(null);
  const [totalProperties, setTotalProperties] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // ✅ Fetch Blogs
        const blogsRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE}/blog/viewblog`
        );
        setTotalBlogs(blogsRes.data?.length || 0); // ✅ Fetch Blogs
        const propertyRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE}/property`
        );
        setTotalProperties(propertyRes.data?.length || 0);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);

        setTotalBlogs(0);
        setTotalProperties(0);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen text-white">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Welcome to the admin overview
        </p>
        <hr className="mt-4 border-gray-700" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Blogs"
          value={loading ? null : totalBlogs}
          icon={<FileText size={28} />}
        />
        <DashboardCard
          title="Total Properties"
          value={loading ? null : totalProperties}
          icon={<Building size={28} />}
        />
      </div>
    </div>
  );
}

// --- DashboardCard Component ---
function DashboardCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number | null;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-[#0d1b2a] to-[#1b263b] hover:shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all border border-[#334155] rounded-xl p-6 shadow-md group">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-400">{title}</p>
        <div className="bg-[var(--primary)] text-white rounded-full p-2 shadow-inner">
          {icon}
        </div>
      </div>
      {value === null ? (
        <div className="w-24 h-6 bg-gray-700 animate-pulse rounded"></div>
      ) : (
        <h2 className="text-3xl font-bold text-white">{value}</h2>
      )}
    </div>
  );
}
