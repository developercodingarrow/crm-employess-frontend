"use server";

const { API_BASE_URL } = require("../../../config");
import { cookies } from "next/headers";

export async function leadRemarksAction(leadID) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("jwt")?.value;

    if (!authToken) {
      return {
        error: "Authentication required. Please log in.",
        statusCode: 401,
      };
    }

    const res = await fetch(
      `${API_BASE_URL}/remarks/getMyLeadRemarks/${leadID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(formData),
        credentials: "include",
      },
    );

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

// export async function createLeadRemak(formData, leadID) {
//   try {
//     const cookieStore = await cookies();
//     const authToken = cookieStore.get("jwt")?.value;

//     if (!authToken) {
//       return {
//         error: "Authentication required. Please log in.",
//         statusCode: 401,
//       };
//     }

//     const res = await fetch(`${API_BASE_URL}/remarks/addNewRemark/${leadID}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//       credentials: "include",
//     });

//     const responseText = await res.text(); // Get raw response

//     if (!res.ok) {
//       return {
//         error: `Server returned ${res.status}: ${responseText.substring(0, 200)}`,
//         statusCode: res.status,
//       };
//     }

//     // Try to parse JSON
//     try {
//       const data = JSON.parse(responseText);
//       return {
//         success: true,
//         data: data,
//         statusCode: res.status,
//       };
//     } catch (e) {
//       return {
//         error: "Invalid JSON response from server",
//         statusCode: 500,
//         rawResponse: responseText,
//       };
//     }
//   } catch (error) {
//     console.error("Fetch error:", error);
//     return {
//       error: error.message || "Request failed",
//       statusCode: 500,
//     };
//   }
// }

export async function createLeadRemak(formData, leadID) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("jwt")?.value;

    if (!authToken) {
      return {
        error: "Authentication required. Please log in.",
        statusCode: 401,
      };
    }

    const res = await fetch(`${API_BASE_URL}/remarks/addNewRemark/${leadID}`, {
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
      // If JSON parsing fails, get text
      const text = await res.text();
      return {
        error: `Server returned ${res.status}: ${text.substring(0, 200)}`,
        statusCode: res.status,
      };
    }

    // Check if response is OK
    if (!res.ok) {
      // Extract just the message from the error object
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
