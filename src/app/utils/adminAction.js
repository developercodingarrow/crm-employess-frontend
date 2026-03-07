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

    // Check API success status
    if (responseData.status !== "success") {
      return {
        error: responseData.message || "Failed to create lead",
        statusCode: 400,
      };
    }

    // Success case
    return {
      success: true,
      data: responseData.data,
      message: responseData.message,
      statusCode: res.status,
      status: "success",
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      error: error.message || "Request failed",
      statusCode: 500,
    };
  }
}

export async function bulkUploadLeads(formData) {
  try {
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
      },
      body: formData,
      credentials: "include",
    });

    // Try to parse response as JSON first
    let responseData;
    try {
      responseData = await res.json();
    } catch {
      const text = await res.text();
      return {
        error: `Server returned ${res.status}: ${text.substring(0, 200)}`,
        statusCode: res.status,
      };
    }

    // Check if response is OK
    if (!res.ok) {
      // Extract clean error message
      const errorMessage =
        responseData.message ||
        responseData.error ||
        `Upload failed (${res.status})`;
      return {
        error: errorMessage,
        statusCode: res.status,
        details: responseData.errors || null, // Pass validation errors if any
      };
    }

    // Check API success status
    if (responseData.status !== "success") {
      return {
        error: responseData.message || "Upload failed",
        statusCode: 400,
        details: responseData.data?.errors || null,
      };
    }

    // Success - format the response data nicely
    const uploadResult = {
      success: true,
      message: responseData.message || "Upload successful",
      data: {
        totalRows: responseData.data?.totalRows || 0,
        inserted: responseData.data?.inserted || 0,
        failed: responseData.data?.failed || 0,
        leads: responseData.data?.leads || [],
        errors: responseData.data?.errors || [], // Row-level errors
      },
      statusCode: res.status,
    };

    return uploadResult;
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      error: error.message || "Upload failed. Please try again.",
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

    // Try to parse response as JSON first
    let responseData;
    try {
      responseData = await res.json();
    } catch {
      const text = await res.text();
      return {
        error: `Server returned ${res.status}: ${text.substring(0, 200)}`,
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

    // Check API success status
    if (responseData.status !== "success") {
      return {
        error: responseData.message || "Failed to create user",
        statusCode: 400,
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
