import axios from "axios";

const baseUrlAshokSir = "https://6g2n7ff0-8000.inc1.devtunnels.ms";
const baseUrlAbhiSir = "https://56kjq9dz-8000.inc1.devtunnels.ms/api";

const baseURL = "https://rvdr9qkh-8000.inc1.devtunnels.ms/";

export const api = axios.create({
  baseURL: baseUrlAbhiSir,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
