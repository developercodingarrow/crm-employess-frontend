import React from "react";
import LeadsPageLayout from "../../../components/lead_page/LeadsPageLayout";
import { cookies } from "next/headers";
import { API_BASE_URL } from "../../../../config";

export default async function Leadpage() {
  // ✅ Get JWT cookie safely
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  if (!token) {
    throw new Error("Not authenticated");
  }

  let apiResult;

  try {
    // 1. First API - Fetch project employees (already done)
    const response = await fetch(`${API_BASE_URL}/admin/getAllLeads`, {
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
  } catch (error) {
    console.log("error----", error);
  }

  console.log("apiResult---", apiResult);
  return (
    <div>
      <LeadsPageLayout apiLead={apiResult} />
    </div>
  );
}
