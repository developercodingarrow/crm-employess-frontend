// app/(home)/page.js
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_BASE_URL } from "../../../config";
import HomeDashbord from "../../components/home_dashbord/HomeDashbord";

export default async function Homepage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const loginUserString = cookieStore.get("user")?.value;
  const loginUser = loginUserString ? JSON.parse(loginUserString) : null;

  if (!token) {
    redirect("/auth/login");
  }

  try {
    // Fetch reminders
    const remindersRes = await fetch(`${API_BASE_URL}/reminder/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!remindersRes.ok) {
      const errorData = await remindersRes.json();
      // Extract just the message from the error object
      throw new Error(errorData.message || `API Error ${remindersRes.status}`);
    }

    const remindersJson = await remindersRes.json();

    if (remindersJson.status !== "success") {
      throw new Error(remindersJson.message || "Failed to fetch reminders");
    }

    // Fetch stats
    const statsRes = await fetch(`${API_BASE_URL}/stats/employee`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!statsRes.ok) {
      const errorData = await statsRes.json();
      throw new Error(errorData.message || `API Error ${statsRes.status}`);
    }

    const statsJson = await statsRes.json();

    if (statsJson.status !== "success") {
      throw new Error(statsJson.message || "Failed to fetch stats");
    }

    return (
      <div>
        <HomeDashbord
          loginUser={loginUser}
          remindersData={remindersJson.data}
          statsData={statsJson.data}
        />
      </div>
    );
  } catch (error) {
    // Now error.message will be just: "You do not have permission to access this"
    throw new Error(error.message);
  }
}
