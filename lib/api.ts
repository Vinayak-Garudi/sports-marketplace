import nextConfig from "@/next.config";
import { handleClientLogout } from "./authHandlerClient";
import { toast } from "sonner";

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

interface ApiError extends Error {
  status?: number;
  data?: any;
}

type ApiResponse = {
  data: any;
  message: string;
  success: boolean;
};

const BASE_URL = nextConfig?.publicRuntimeConfig?.apiUrl || "";

/**
 * Handles API requests with proper error handling and type safety
 * @param endpoint - The API endpoint to call
 * @param options - Fetch options including method, headers, body, etc.
 * @returns Promise with the typed response data
 */
export async function apiRequest(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse> {
  const { params, ...fetchOptions } = options;
  // Construct URL with query parameters if they exist
  const url = new URL(endpoint, BASE_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  // Default headers
  const headers = new Headers(fetchOptions.headers);
  if (
    !headers.has("Content-Type") &&
    !(fetchOptions.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  // Add authorization token from cookies if present
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split("; ");
    const userTokenCookie = cookies.find((cookie) =>
      cookie.startsWith("user-token")
    );
    if (userTokenCookie) {
      const token = userTokenCookie.split("=")[1];
      if (token && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
  }

  try {
    const response = await fetch(url.toString(), {
      ...fetchOptions,
      headers,
    });

    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      // Handle 401 Unauthorized - trigger logout
      if (response.status === 401) {
        if (typeof window !== "undefined") {
          // Client-side: redirect to home after logout
          handleClientLogout();
          window.location.href = "/";
        }
      }

      const errorData = await response.json();
      const errorMessage =
        errorData.message || "Something went wrong from the server side";
      console.error("API Error:", errorData);

      // Show error toast on client side
      if (typeof window !== "undefined") {
        toast.error(errorMessage);
      }

      return {
        data: null,
        message: errorMessage,
        success: false,
      };
    }

    // Handle empty responses
    if (response.status === 204) {
      return {
        data: null,
        message: "No Content",
        success: true,
      };
    }

    // Parse JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Something went wrong from the server side";
    console.error("Network error:", error);

    // Show error toast on client side
    if (typeof window !== "undefined") {
      toast.error(errorMessage);
    }

    return {
      data: null,
      message: errorMessage,
      success: false,
    };
  }
}

// Common HTTP method helpers
export const api = {
  get: <T>(endpoint: string, options: Omit<FetchOptions, "method"> = {}) =>
    apiRequest(endpoint, { ...options, method: "GET" }),

  post: <T>(
    endpoint: string,
    data?: any,
    options: Omit<FetchOptions, "method" | "body"> = {}
  ) =>
    apiRequest(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: <T>(
    endpoint: string,
    data?: any,
    options: Omit<FetchOptions, "method" | "body"> = {}
  ) =>
    apiRequest(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    }),

  patch: <T>(
    endpoint: string,
    data?: any,
    options: Omit<FetchOptions, "method" | "body"> = {}
  ) =>
    apiRequest(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string, options: Omit<FetchOptions, "method"> = {}) =>
    apiRequest(endpoint, { ...options, method: "DELETE" }),
};

// Export type for error handling
export type { ApiError };
