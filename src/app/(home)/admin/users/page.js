// app/admin/users/page.js
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_BASE_URL } from "../../../../../config";
import UserLayout from "../../../../components/user_layout/UserLayout";

export default async function Userpage() {
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
    redirect("/"); // Send non-admins to home
  }

  // 5. Fetch users data
  let usersData = null;
  let error = null;

  try {
    const response = await fetch(`${API_BASE_URL}/admin/getAllUsers`, {
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
      throw new Error(responseData.message || "Failed to fetch users");
    }

    // Success - store data
    usersData = responseData;
  } catch (err) {
    console.error("Admin users page error:", {
      message: err.message,
      timestamp: new Date().toISOString(),
    });
    error = err.message;
  }

  // 6. If fetch failed, throw to error.js
  if (!usersData) {
    throw new Error(error || "Failed to load users");
  }

  // 7. Render the page with data
  return (
    <div>
      <UserLayout apiData={usersData} />
    </div>
  );
}
