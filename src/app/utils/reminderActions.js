"use server";

const { API_BASE_URL } = require("../../../config");
import { cookies } from "next/headers";

export async function allReminders() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("jwt")?.value;

    if (!authToken) {
      return {
        error: "Authentication required. Please log in.",
        statusCode: 401,
      };
    }

    const res = await fetch(`${API_BASE_URL}/reminder/all`, {
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
      console.error("API Error Response:", text);
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

export async function upcomingRemindersActions() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("jwt")?.value;

    if (!authToken) {
      return {
        error: "Authentication required. Please log in.",
        statusCode: 401,
      };
    }

    const res = await fetch(`${API_BASE_URL}/reminder/upcomingReminder`, {
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
      console.error("API Error Response:", text);
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
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      error: error.message || "Request failed",
      statusCode: 500,
    };
  }
}

export async function createReminderAction(formData) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("jwt")?.value;

    if (!authToken) {
      return {
        error: "Authentication required. Please log in.",
        statusCode: 401,
      };
    }

    const res = await fetch(`${API_BASE_URL}/reminder/createReminder`, {
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

export async function RemindernotifiedAction(formData) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("jwt")?.value;

    if (!authToken) {
      return {
        error: "Authentication required. Please log in.",
        statusCode: 401,
      };
    }

    const res = await fetch(`${API_BASE_URL}/reminder/notified`, {
      method: "PATCH",
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

export async function deleteReminderAction(formData) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("jwt")?.value;

    if (!authToken) {
      return {
        error: "Authentication required. Please log in.",
        statusCode: 401,
      };
    }

    const res = await fetch(`${API_BASE_URL}/reminder/deleteReminder`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    // First try to parse response as JSON (whether success or error)
    let responseData;
    try {
      responseData = await res.json();
    } catch {
      // If JSON parsing fails, return text error
      const text = await res.text();
      return {
        error: `Server returned ${res.status}: ${text.substring(0, 100)}`,
        statusCode: res.status,
      };
    }

    // Check if response is OK
    if (!res.ok) {
      // ✅ Return the clean message from JSON
      return {
        error: responseData.message || `Server error ${res.status}`,
        statusCode: res.status,
      };
    }

    // ✅ Success case
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

export async function clearAllNotifiedAction(formData) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("jwt")?.value;

    if (!authToken) {
      return {
        error: "Authentication required. Please log in.",
        statusCode: 401,
      };
    }

    const res = await fetch(`${API_BASE_URL}/reminder/clearAllNotified`, {
      method: "DELETE",
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
