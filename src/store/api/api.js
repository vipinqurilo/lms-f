import axios from "axios";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczODU3NTYzN30.r5Vg-waz8Bixw3rkOAURnBxXZAWKM_k8bmTZmbq8Rs8`;
export const api = axios.create({
  baseURL: `https://rvdr9qkh-8000.inc1.devtunnels.ms/`,
  // withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// const token2 = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTFiMGNiYWZlODdlY2E2ZmFlYzRhMSIsImVtYWlsIjoidW1hcmtodXJzaGlkM0BnbWFpbC5jb20iLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTczODY1MzY5N30.9UTj06mItc78qWLA1TS38cdbsOJk9bYrGLur7qfkEug`;
const token2 = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0dWRlbnRAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpZCI6IjY3YTFiNWZiOTZkMWJkZWI0NmFhMzk1YyIsImlhdCI6MTczODgyNDc3NH0.DNR5n4hWp82AbmQ2jtpRvcZDuC2Lbwt2ehU7XccOx08`;
export const api2 = axios.create({
  baseURL: `https://rvdr9qkh-8000.inc1.devtunnels.ms/`,
  // withCredentials: true,
  headers: {
    Authorization: `Bearer ${token2}`,
  },
});
export const api3 = axios.create({
  baseURL: `https://56kjq9dz-8000.inc1.devtunnels.ms`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// api.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });
