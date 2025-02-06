import axios from "axios";
const baseUrlAshokSir = "https://6g2n7ff0-8000.inc1.devtunnels.ms";
const baseUrlAshokSir2 = "https://6g2n7ff0-8000.inc1.devtunnels.ms/api";

const baseUrlAbhiSir = "https://56kjq9dz-8000.inc1.devtunnels.ms";

const baseURL = "https://rvdr9qkh-8000.inc1.devtunnels.ms/";

const tutorToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWRiZThiZjE2ODE5N2RmNzA1YTc5OSIsImVtYWlsIjoiaW5zdHJ1Y3RvckBnbWFpbC5jb20iLCJyb2xlIjoiaW5zdHJ1Y3RvciIsImlhdCI6MTczODY1MDgzNn0.ZziknJC4qdMTDqZP5-5Cr2otcMwoEyLTIpo-48Sp06U`;
const studentToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0dWRlbnRAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpZCI6IjY3YTFiNWZiOTZkMWJkZWI0NmFhMzk1YyIsImlhdCI6MTczODgyNDc3NH0.DNR5n4hWp82AbmQ2jtpRvcZDuC2Lbwt2ehU7XccOx08`;
export const api = axios.create({
  baseURL: baseUrlAshokSir2,

  headers: {
    Authorization: `Bearer ${tutorToken}`,
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
