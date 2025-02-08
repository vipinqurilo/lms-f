import axios from "axios";
const baseUrlAshokSir = "https://6g2n7ff0-8000.inc1.devtunnels.ms";
const baseUrlAbhiSir = "https://56kjq9dz-8000.inc1.devtunnels.ms";
const baseURL = "https://rvdr9qkh-8000.inc1.devtunnels.ms/";
const tutorToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imluc3RydWN0b3JAZ21haWwuY29tIiwicm9sZSI6InRlYWNoZXIiLCJpZCI6IjY3OWRiZThiZjE2ODE5N2RmNzA1YTc5OSIsImlhdCI6MTczODc1NzMxOX0.pTND9b4cNcbnHeTj3gcm4J-YI1mth12IxnsE99XitKY`;
const studentToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0dWRlbnRAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpZCI6IjY3YTFiNWZiOTZkMWJkZWI0NmFhMzk1YyIsImlhdCI6MTczODk5MDM1M30.QCQPcXScQ2meqIj3YhJCAMvnax1k_SviSZS03s70KSM`;
export const api = axios.create({
  baseURL: baseUrlAbhiSir,
  headers: {
    Authorization: `Bearer ${studentToken}`,
  },
});

// api.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });
