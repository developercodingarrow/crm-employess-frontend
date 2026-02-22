import React from "react";
import { cookies } from "next/headers";
import ProjectPageLayout from "../../../components/projects_page_layout/ProjectPageLayout";
// import { dummyProjects } from "../../../jsonData/dummyData";
import { API_BASE_URL } from "../../../../config";
export default async function Projectspage() {
  // ✅ Get JWT cookie safely
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  if (!token) {
    throw new Error("Not authenticated");
  }

  let apiResult;

  try {
    // 1. First API - Fetch project employees (already done)
    const response = await fetch(`${API_BASE_URL}/project/getmyProjects`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch jobs: ${response.statusText}`);
    }

    const apiData = await response.json();

    if (apiData.status === "success") {
      apiResult = apiData?.data;
    }
  } catch (error) {}
  return (
    <div>
      <ProjectPageLayout apiData={apiResult} />
    </div>
  );
}
