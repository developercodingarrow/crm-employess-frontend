import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_BASE_URL } from "../../../../../config";
import ProjectLeadLayout from "../../../../components/project_lead_layout/ProjectLeadLayout";

export default async function Page({ params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  // 1. Check authentication
  if (!token) {
    redirect("/auth/login");
  }

  // 2. Safely get params
  const { slug } = await params;

  // 3. Initialize with defaults
  let projectLeads = [];
  let leadStats = null;
  let project = null;
  let error = null;

  try {
    // 4. Fetch project leads
    const response = await fetch(
      `${API_BASE_URL}/lead/getProjectLeads/${slug}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    // 5. Parse response (handle both JSON and text)
    let responseData;
    try {
      responseData = await response.json();
    } catch {
      const text = await response.text();
      throw new Error(`Invalid server response: ${text.substring(0, 100)}`);
    }

    // 6. Check HTTP status
    if (!response.ok) {
      throw new Error(
        responseData.message || `Server error ${response.status}`,
      );
    }

    // 7. Check API success status
    if (responseData.status !== "success") {
      throw new Error(responseData.message || "Failed to fetch project leads");
    }

    // 8. Extract data with safe defaults
    project = responseData?.data?.project || null;
    projectLeads = responseData?.data?.leads || [];
    leadStats = responseData?.data?.statistics || {
      totalLeads: 0,
      byStatus: {},
      unreadLeads: 0,
      bookmarkedLeads: 0,
    };
  } catch (err) {
    // 9. Log error for debugging
    console.error("Project leads page error:", {
      message: err.message,
      slug,
      timestamp: new Date().toISOString(),
    });

    error = err.message;

    // 10. If it's an auth error, redirect to login
    if (
      err.message.includes("Not authenticated") ||
      err.message.includes("token") ||
      err.message.includes("401")
    ) {
      redirect("/auth/login");
    }

    // 11. For other errors, throw to error.js
    throw new Error(error);
  }

  // 12. If no project found, show appropriate error
  if (!project && !error) {
    throw new Error("Project not found");
  }

  return (
    <div>
      <ProjectLeadLayout
        project={project}
        projectLeads={projectLeads}
        stats={leadStats}
      />
    </div>
  );
}
