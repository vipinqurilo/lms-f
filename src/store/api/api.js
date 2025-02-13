import axios from "axios";

const baseUrlAshokSir = "https://6g2n7ff0-8000.inc1.devtunnels.ms/api";
const baseUrlAbhiSir = "https://56kjq9dz-8000.inc1.devtunnels.ms/api";
const baseURLVipin = "https://rvdr9qkh-8000.inc1.devtunnels.ms/api";

export const api = axios.create({
  baseURL: baseUrlAbhiSir, // Change this as needed
  headers: {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
});

// Request interceptor to add Authorization token and disable caching
api.interceptors.request.use((config) => {
  const userToken = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");

  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`; // Prioritize admin token
  } else if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  // Ensure every request includes no-cache headers
  config.headers["Cache-Control"] =
    "no-store, no-cache, must-revalidate, proxy-revalidate";
  config.headers["Pragma"] = "no-cache";
  config.headers["Expires"] = "0";

  return config;
});










