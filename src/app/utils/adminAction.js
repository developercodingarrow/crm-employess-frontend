"use server";

const { API_BASE_URL } = require("../../../config");
import { cookies } from "next/headers";

export async function createNewLead(formData) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("jwt")?.value;

    if (!authToken) {
      return {
        error: "Authentication required. Please log in.",
        statusCode: 401,
      };
    }

    const res = await fetch(`${API_BASE_URL}/admin/createFormLead`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    // Check if response is OK
    if (!res.ok) {
      const text = await res.text();
      console.error("API Error Response:", text);
      return {
        error: `Server returned ${res.status}: ${text.substring(0, 100)}`,
        statusCode: res.status,
      };
    }

    // Try to parse as JSON
    const data = await res.json();
    console.log("Response data:", data);

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

// app/_actions/leadActions.js
export async function bulkUploadLeads(formData) {
  try {
    // Get auth token from cookies
    const cookieStore = await cookies();
    const authToken = cookieStore.get("jwt")?.value;

    if (!authToken) {
      return {
        error: "Authentication required. Please log in.",
        statusCode: 401,
      };
    }

    const res = await fetch(`${API_BASE_URL}/bulklead/upload-csv`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        // Don't set Content-Type for FormData - browser sets it with boundary
      },
      body: formData,
      credentials: "include",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("API Error Response:", text);
      return {
        error: `Server returned ${res.status}: ${text.substring(0, 100)}`,
        statusCode: res.status,
      };
    }

    const data = await res.json();

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

export async function createNewUser(formData) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("jwt")?.value;

    if (!authToken) {
      return {
        error: "Authentication required. Please log in.",
        statusCode: 401,
      };
    }

    const res = await fetch(`${API_BASE_URL}/admin/createUser`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    // Check if response is OK
    if (!res.ok) {
      const text = await res.text();
      console.error("API Error Response:", text);
      return {
        error: `Server returned ${res.status}: ${text.substring(0, 100)}`,
        statusCode: res.status,
      };
    }

    // Try to parse as JSON
    const data = await res.json();
    console.log("Response data:", data);

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
