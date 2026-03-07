"use server";

const { API_BASE_URL } = require("../../../config");
import { cookies } from "next/headers";

export async function myRecentActivitiesCtion() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("jwt")?.value;

    if (!authToken) {
      return {
        error: "Authentication required. Please log in.",
        statusCode: 401,
      };
    }

    const res = await fetch(`${API_BASE_URL}/stats/myRecentActivities`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(formData),
      credentials: "include",
    });

    // Check if response is OK
    if (!res.ok) {
      const text = await res.text();

      return {
        error: `Server returned ${res.status}: ${text.substring(0, 100)}`,
        statusCode: res.status,
      };
    }

    // Try to parse as JSON
    const data = await res.json();

    // ✅ Return the data
    return {
      success: true,
      data: data,
      statusCode: res.status,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      error: error.message || "Request failed",
      statusCode: 500,
    };
  }
}
