import React from "react";
import { cookies } from "next/headers";
import { API_BASE_URL } from "../../../config";
import HomeDashbord from "../../components/home_dashbord/HomeDashbord";
export default async function Homepage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const loginUserString = cookieStore.get("user")?.value;
  const loginUser = loginUserString ? JSON.parse(loginUserString) : null;

  if (!token) {
    throw new Error("Not authenticated");
  }

  // Create fetch functions
  const fetchReminders = fetch(`${API_BASE_URL}/reminder/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  }).then((res) => (res.ok ? res.json() : Promise.reject("Reminders failed")));

  const fetchStats = fetch(`${API_BASE_URL}/stats/employee`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  }).then((res) => (res.ok ? res.json() : Promise.reject("Stats failed")));

  // Execute both, but don't fail completely if one fails
  const [remindersResult, statsResult] = await Promise.allSettled([
    fetchReminders,
    fetchStats,
  ]);

  // Process results
  let remindersData = null;
  let statsData = null;

  if (
    remindersResult.status === "fulfilled" &&
    remindersResult.value.status === "success"
  ) {
    remindersData = remindersResult.value.data;
  } else {
    console.log("Reminders fetch failed:", remindersResult.reason);
  }

  if (
    statsResult.status === "fulfilled" &&
    statsResult.value.status === "success"
  ) {
    statsData = statsResult.value.data;
  } else {
    console.log("Stats fetch failed:", statsResult.reason);
  }

  return (
    <div>
      <HomeDashbord
        loginUser={loginUser}
        remindersData={remindersData}
        statsData={statsData}
      />
    </div>
  );
}
