import axios from "axios";

const baseUrlAshokSir = "https://6g2n7ff0-8000.inc1.devtunnels.ms";
const baseUrlAbhiSir = "https://56kjq9dz-8000.inc1.devtunnels.ms";
 
// const baseURL = "https://rvdr9qkh-8000.inc1.devtunnels.ms";

const baseURL = "https://6g2n7ff0-8000.inc1.devtunnels.ms";

const adminToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczODU3NTYzN30.r5Vg-waz8Bixw3rkOAURnBxXZAWKM_k8bmTZmbq8Rs8`;
const tutorToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imluc3RydWN0b3JAZ21haWwuY29tIiwicm9sZSI6InRlYWNoZXIiLCJpZCI6IjY3OWRiZThiZjE2ODE5N2RmNzA1YTc5OSIsImlhdCI6MTczODc1NzMxOX0.pTND9b4cNcbnHeTj3gcm4J-YI1mth12IxnsE99XitKY`;
const studentToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0dWRlbnRAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpZCI6IjY3YTFiNWZiOTZkMWJkZWI0NmFhMzk1YyIsImlhdCI6MTczODgyNDc3NH0.DNR5n4hWp82AbmQ2jtpRvcZDuC2Lbwt2ehU7XccOx08`;
export const api = axios.create({
  baseURL: baseURL,

  headers: {
    Authorization: `Bearer ${adminToken}`,
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
 const baseURL = "https://rvdr9qkh-8000.inc1.devtunnels.ms/";
const tutorToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imluc3RydWN0b3JAZ21haWwuY29tIiwicm9sZSI6InRlYWNoZXIiLCJpZCI6IjY3OWRiZThiZjE2ODE5N2RmNzA1YTc5OSIsImlhdCI6MTczODc1NzMxOX0.pTND9b4cNcbnHeTj3gcm4J-YI1mth12IxnsE99XitKY`;
const studentToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0dWRlbnQxQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWQiOiI2N2E3NGJkMjAzYjE3MmMxODg1NzY0YjEiLCJuYW1lIjoiU3R1ZGVudCAiLCJwcm9maWxlUGhvdG8iOm51bGwsImlhdCI6MTczOTAxNzIxM30.4wvj6bGxV2kC-xUi8QCoDs1OP7YZ-EyvlpVtjF_M9Js`;
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
 