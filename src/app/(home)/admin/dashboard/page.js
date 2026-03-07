// app/admin/dashboard/page.js
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import AdminDashBord from "../../../../components/admin_dashbord/AdminDashBord";
import { API_BASE_URL } from "../../../../../config";

export default async function AdminDashbordpage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const userString = cookieStore.get("user")?.value;

  // 1. Check authentication
  if (!token) {
    redirect("/auth/login");
  }

  // 2. Parse user and verify admin role
  let user = null;
  try {
    user = userString ? JSON.parse(userString) : null;
  } catch {
    redirect("/auth/login");
  }

  // 3. Verify admin role
  if (user?.role !== "admin") {
    redirect("/"); // Send non-admins to employee dashboard
  }

  // 4. Fetch both APIs
  let overviewData = null;
  let activitiesData = null;
  let error = null;

  try {
    const [overviewRes, activitiesRes] = await Promise.all([
      fetch(`${API_BASE_URL}/stats/adminOverviewStats`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }),
      fetch(`${API_BASE_URL}/stats/adminRecentActivities?limit=10`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }),
    ]);

    // Parse overview response
    if (!overviewRes.ok) {
      const errorData = await overviewRes.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch overview stats`);
    }
    const overviewJson = await overviewRes.json();
    if (overviewJson.status === "success") {
      overviewData = overviewJson.data;
    }

    // Parse activities response
    if (!activitiesRes.ok) {
      const errorData = await activitiesRes.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch activities`);
    }
    const activitiesJson = await activitiesRes.json();
    if (activitiesJson.status === "success") {
      activitiesData = activitiesJson.data;
    }
  } catch (err) {
    console.error("Admin dashboard error:", err);
    error = err.message;
  }

  // 5. If both APIs failed, throw error to error.js
  if (!overviewData && !activitiesData) {
    throw new Error(error || "Failed to load admin dashboard");
  }

  return (
    <div>
      <AdminDashBord
        overviewData={overviewData}
        activitiesData={activitiesData}
        user={user}
      />
    </div>
  );
}
