import axios from "axios";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWRiZThiZjE2ODE5N2RmNzA1YTc5OSIsImVtYWlsIjoiaW5zdHJ1Y3RvckBnbWFpbC5jb20iLCJyb2xlIjoiaW5zdHJ1Y3RvciIsImlhdCI6MTczODY1MDgzNn0.ZziknJC4qdMTDqZP5-5Cr2otcMwoEyLTIpo-48Sp06U`;
export const api = axios.create({
  baseURL: `https://6g2n7ff0-8000.inc1.devtunnels.ms/api`,
  // withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// const token2 = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTFiMGNiYWZlODdlY2E2ZmFlYzRhMSIsImVtYWlsIjoidW1hcmtodXJzaGlkM0BnbWFpbC5jb20iLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTczODY1MzY5N30.9UTj06mItc78qWLA1TS38cdbsOJk9bYrGLur7qfkEug`;
// export const api2 = axios.create({
//   baseURL: `https://6g2n7ff0-8000.inc1.devtunnels.ms`,
//   // withCredentials: true,
//   headers: {
//     Authorization: `Bearer ${token2}`,
//   },
// });

// api.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });
