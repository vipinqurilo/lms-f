import axios from "axios";

const baseUrlAshokSir = "https://6g2n7ff0-8000.inc1.devtunnels.ms";
<<<<<<< HEAD
const baseUrlAbhiSir = "https://56kjq9dz-8000.inc1.devtunnels.ms";

//  const baseURL = "https://6g2n7ff0-8000.inc1.devtunnels.ms";

const adminToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlkIjoiNjdhMDhmMGYyYzQwNWQ4ZTRlYWMwZGNjIiwibmFtZSI6IkFkbWluICIsInByb2ZpbGVQaG90byI6bnVsbCwiaWF0IjoxNzM5MjU1OTc3fQ.dLp1wtrKPDjhIiVzEsbaPNjTvDGPkxbhJqX9GA4ONw4`;
const tutorToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imluc3RydWN0b3JAZ21haWwuY29tIiwicm9sZSI6InRlYWNoZXIiLCJpZCI6IjY3OWRiZThiZjE2ODE5N2RmNzA1YTc5OSIsImlhdCI6MTczODc1NzMxOX0.pTND9b4cNcbnHeTj3gcm4J-YI1mth12IxnsE99XitKY`;
const studentToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0dWRlbnRAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpZCI6IjY3YTFiNWZiOTZkMWJkZWI0NmFhMzk1YyIsImlhdCI6MTczODgyNDc3NH0.DNR5n4hWp82AbmQ2jtpRvcZDuC2Lbwt2ehU7XccOx08`;
export const api = axios.create({
  // baseURL: baseUrlAbhiSir,

  //  const baseURL = "https://rvdr9qkh-8000.inc1.devtunnels.ms/";
  // const tutorToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imluc3RydWN0b3JAZ21haWwuY29tIiwicm9sZSI6InRlYWNoZXIiLCJpZCI6IjY3OWRiZThiZjE2ODE5N2RmNzA1YTc5OSIsImlhdCI6MTczOTE4Njk0N30.HdqKTFX0Dowt_oLU8N8gNfxUG4WLcqxxxVY38fpUFoo`;
  // const studentToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGUyNDZhYjlhZDExNzM0YTM4ZWU5NSIsIm5hbWUiOiJWaXBpbkJlbml3YWwiLCJlbWFpbCI6Im5ldGhlYWQzMjFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM3NTM0NzgyLCJleHAiOjE3Mzc2MjExODJ9.1HgqSFgudSNNXpnX6htTtIzfOyItf8g65xKVNei3XnA`;

  baseURL: baseUrlAbhiSir,
  headers: {
    Authorization: `Bearer ${adminToken}`,
  },
=======
const baseUrlAbhiSir = "https://56kjq9dz-8000.inc1.devtunnels.ms/api";
const baseURLVipin = "https://rvdr9qkh-8000.inc1.devtunnels.ms/api";
export const api = axios.create({
  baseURL: baseURLVipin,
>>>>>>> main
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
