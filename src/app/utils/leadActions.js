"use server";

const { API_BASE_URL } = require("../../../config");
import { cookies } from "next/headers";

export async function changeLeadStatusAction(formData, leadID) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("jwt")?.value;

    if (!authToken) {
      return {
        error: "Authentication required. Please log in.",
        statusCode: 401,
      };
    }

    const res = await fetch(`${API_BASE_URL}/lead/changeLeadStatus/${leadID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    // Try to parse response as JSON first
    let responseData;
    try {
      responseData = await res.json();
    } catch {
      const text = await res.text();
      return {
        error: `Server returned ${res.status}: ${text.substring(0, 100)}`,
        statusCode: res.status,
      };
    }

    // Check if response is OK
    if (!res.ok) {
      return {
        error: responseData.message || `Server error ${res.status}`,
        statusCode: res.status,
      };
    }

    // Success case
    return {
      success: true,
      data: responseData,
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
