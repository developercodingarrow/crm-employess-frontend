import React from "react";
import { cookies } from "next/headers";
import { API_BASE_URL } from "../../../../../config";
import ProjectLeadLayout from "../../../../components/project_lead_layout/ProjectLeadLayout";

export default async function page({ params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }
  const { slug } = await params;
  let projectLeads = [];
  let leadStats;

  try {
    // 1. First API - Fetch project Leads (already done)
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

    if (!response.ok) {
      throw new Error(`Failed to fetch jobs: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status === "success") {
      projectLeads = data?.data?.leads;
      leadStats = data?.data?.statistics;
    }
  } catch (error) {}
  return (
    <div>
      <ProjectLeadLayout projectLeads={projectLeads} satats={leadStats} />
    </div>
  );
}
