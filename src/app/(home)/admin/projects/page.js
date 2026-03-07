// app/admin/projects/page.js
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_BASE_URL } from "../../../../../config";
import AdminProjectLayout from "../../../../components/admin_projects/AdminProjectLayout";

export default async function AdminProjectspage() {
  // 1. Get cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const userString = cookieStore.get("user")?.value;

  // 2. Check authentication
  if (!token) {
    redirect("/auth/login");
  }

  // 3. Parse user and verify admin role
  let user = null;
  try {
    user = userString ? JSON.parse(userString) : null;
  } catch {
    redirect("/auth/login");
  }

  // 4. Verify admin role
  if (user?.role !== "admin") {
    redirect("/projects"); // Send non-admins to employee projects page
  }

  // 5. Fetch projects data
  let projectsData = [];
  let error = null;

  try {
    const response = await fetch(`${API_BASE_URL}/admin/getAllProjects`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    // Parse response
    let responseData;
    try {
      responseData = await response.json();
    } catch {
      const text = await response.text();
      throw new Error(`Invalid response: ${text.substring(0, 100)}`);
    }

    // Check HTTP status
    if (!response.ok) {
      throw new Error(
        responseData.message || `Server error ${response.status}`,
      );
    }

    // Check API success status
    if (responseData.status !== "success") {
      throw new Error(responseData.message || "Failed to fetch projects");
    }

    // Success - store data
    projectsData = responseData?.data;
  } catch (err) {
    console.error("Admin projects page error:", {
      message: err.message,
      timestamp: new Date().toISOString(),
    });
    error = err.message;
  }

  // 6. If fetch failed, throw to error.js
  if (!projectsData) {
    throw new Error(error || "Failed to load projects");
  }

  // 7. Render the page with data
  return (
    <div>
      <AdminProjectLayout apiData={projectsData} />
    </div>
  );
}
