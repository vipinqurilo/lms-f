import axios from "axios";

const baseUrlAshokSir = "https://6g2n7ff0-8000.inc1.devtunnels.ms/api";
const baseUrlAbhiSir = "https://56kjq9dz-8000.inc1.devtunnels.ms/api";
const baseURLVipin = "https://rvdr9qkh-8000.inc1.devtunnels.ms/api";

export const api = axios.create({
  baseURL: "https://wq1jbb9k-8000.inc1.devtunnels.ms/api", // Change this as needed
  // baseURL: baseUrlAbhiSir, // Change this as needed
  headers: {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
  // Disable ETag validation (Prevents cached responses)
  validateStatus: function (status) {
    return status >= 200 && status < 300; // Allow only successful responses
  },
}); 

// Request Interceptor: Add Authorization Token & Enforce No-Cache Headers
api.interceptors.request.use((config) => {
  const userToken = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");

  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`; // Prioritize admin token
  } else if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  // Ensure all requests disable caching
  config.headers["Cache-Control"] =
    "no-store, no-cache, must-revalidate, proxy-revalidate";
  config.headers["Pragma"] = "no-cache";
  config.headers["Expires"] = "0";
  return config;
});

// Response Interceptor: Ensure no caching from API side
api.interceptors.response.use(
  (response) => {
    // Override cache headers from API response
    response.headers["Cache-Control"] =
      "no-store, no-cache, must-revalidate, proxy-revalidate";
    response.headers["Pragma"] = "no-cache";
    response.headers["Expires"] = "0";

    return response;
  },
  (error) => Promise.reject(error)
);
