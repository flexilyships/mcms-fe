import axios from "axios";

/**
 * Enterprise Axios client instance configured for Flexy Maritime backend APIs.
 */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
    
  },
  timeout: 30000,
});

// Request interceptor (attach JWT bearer token if available)
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("flexy_auth_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      const tenantSlug = localStorage.getItem("flexy_tenant_slug");
      if (tenantSlug && config.headers && !config.headers["x-tenant-slug"]) {
        config.headers["x-tenant-slug"] = tenantSlug;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handle global errors like 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("flexy_auth_token");
    }
    return Promise.reject(error);
  }
);
