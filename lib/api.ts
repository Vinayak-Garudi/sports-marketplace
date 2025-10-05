import nextConfig from "@/next.config";

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

interface ApiError extends Error {
  status?: number;
  data?: any;
}

const BASE_URL = nextConfig?.publicRuntimeConfig?.apiUrl || '';

/**
 * Handles API requests with proper error handling and type safety
 * @param endpoint - The API endpoint to call
 * @param options - Fetch options including method, headers, body, etc.
 * @returns Promise with the typed response data
 */
export async function apiRequest<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
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
  if (!headers.has('Content-Type') && !(fetchOptions.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    const response = await fetch(url.toString(), {
      ...fetchOptions,
      headers,
    });

    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      const error: ApiError = new Error('API request failed');
      error.status = response.status;
      try {
        error.data = await response.json();
      } catch {
        error.data = await response.text();
      }
      throw error;
    }

    // Handle empty responses
    if (response.status === 204) {
      return {} as T;
    }

    // Parse JSON response
    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
}

// Common HTTP method helpers
export const api = {
  get: <T>(endpoint: string, options: Omit<FetchOptions, 'method'> = {}) => 
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),
    
  post: <T>(endpoint: string, data?: any, options: Omit<FetchOptions, 'method' | 'body'> = {}) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data?: any, options: Omit<FetchOptions, 'method' | 'body'> = {}) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  patch: <T>(endpoint: string, data?: any, options: Omit<FetchOptions, 'method' | 'body'> = {}) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string, options: Omit<FetchOptions, 'method'> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};

// Export type for error handling
export type { ApiError };