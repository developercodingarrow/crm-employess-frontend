import React from "react";
import UserLayout from "../../../components/user_layout/UserLayout";
import { cookies } from "next/headers";
import { API_BASE_URL } from "../../../../config";

export default async function Userpage() {
  // ✅ Get JWT cookie safely
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  if (!token) {
    throw new Error("Not authenticated");
  }

  let apiResult;

  try {
    // 1. First API - Fetch project employees (already done)
    const response = await fetch(`${API_BASE_URL}/admin/getAllUsers`, {
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
      apiResult = apiData;
    }
  } catch (error) {
    console.log("error----", error);
  }

  console.log("apiResult users---", apiResult);
  return (
    <div>
      <UserLayout apiData={apiResult} />
    </div>
  );
}
