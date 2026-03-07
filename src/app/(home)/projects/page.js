import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"; // Add this for redirect
import ProjectPageLayout from "../../../components/projects_page_layout/ProjectPageLayout";
import { API_BASE_URL } from "../../../../config";

export default async function Projectspage() {
  // ✅ Get JWT cookie safely
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const userString = cookieStore.get("user")?.value;
  const loginUser = userString ? JSON.parse(userString) : null;
  const userRole = loginUser.role;

  if (!token) {
    // Better to redirect than throw error
    redirect("/auth/login");
  }

  try {
    // Fetch projects
    const response = await fetch(`${API_BASE_URL}/project/getmyProjects`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    // Parse response (whether success or error)
    let responseData;
    try {
      responseData = await response.json();
    } catch {
      // If JSON parsing fails, get text
      const text = await response.text();
      throw new Error(
        `Invalid response from server: ${text.substring(0, 100)}`,
      );
    }

    // Check if response is OK (status 200-299)
    if (!response.ok) {
      // Get error message from backend response
      const errorMessage =
        responseData.message || `Server error ${response.status}`;
      throw new Error(errorMessage);
    }

    // Check if API returned success status
    if (responseData.status !== "success") {
      throw new Error(responseData.message || "Failed to fetch projects");
    }

    // Success - render page with data
    return (
      <div>
        <ProjectPageLayout apiData={responseData.data} userRole={userRole} />
      </div>
    );
  } catch (error) {
    // Log error for debugging
    console.error("Projects page error:", error);

    // Throw error to be caught by error.js
    throw new Error(error.message);
  }
}
