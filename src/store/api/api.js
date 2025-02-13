import axios from "axios";

const baseUrlAshokSir = "https://6g2n7ff0-8000.inc1.devtunnels.ms/api";
const baseUrlAbhiSir = "https://56kjq9dz-8000.inc1.devtunnels.ms/api";
const baseURLVipin = "https://rvdr9qkh-8000.inc1.devtunnels.ms/api";
export const api = axios.create({
  baseURL: baseUrlAshokSir,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
