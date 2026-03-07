// app/admin/leads/page.js
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_BASE_URL } from "../../../../../config";
import LeadsPageLayout from "../../../../components/lead_page/LeadsPageLayout";

export default async function Leadpage() {
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
    // If user cookie is invalid, redirect to login
    redirect("/auth/login");
  }

  // 4. Verify admin role
  if (user?.role !== "admin") {
    // If not admin, redirect to employee leads page or home
    redirect("/"); // or redirect("/");
  }

  // 5. Fetch leads data
  let leadsData = null;
  let error = null;

  try {
    const response = await fetch(`${API_BASE_URL}/admin/getAllLeads`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    // Parse response (handle both success and error)
    let responseData;
    try {
      responseData = await response.json();
    } catch {
      const text = await response.text();
      throw new Error(
        `Invalid response from server: ${text.substring(0, 100)}`,
      );
    }

    // Check HTTP status
    if (!response.ok) {
      throw new Error(
        responseData.message || `Server error ${response.status}`,
      );
    }

    // Check API success status
    if (responseData.status !== "success") {
      throw new Error(responseData.message || "Failed to fetch leads");
    }

    // Success - store data
    leadsData = responseData.data;
  } catch (err) {
    console.error("Admin leads page error:", {
      message: err.message,
      timestamp: new Date().toISOString(),
    });
    error = err.message;
  }

  // 6. If fetch failed, throw to error.js
  if (!leadsData) {
    throw new Error(error || "Failed to load leads");
  }

  // 7. Render the page with data
  return (
    <div>
      <LeadsPageLayout apiLead={leadsData} />
    </div>
  );
}
