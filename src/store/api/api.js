import axios from "axios";

const baseUrlAshokSir = "https://6g2n7ff0-8000.inc1.devtunnels.ms";
const baseUrlAbhiSir = "https://56kjq9dz-8000.inc1.devtunnels.ms";
const baseURL = "https://rvdr9qkh-8000.inc1.devtunnels.ms/";
const tutorToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imluc3RydWN0b3JAZ21haWwuY29tIiwicm9sZSI6InRlYWNoZXIiLCJpZCI6IjY3OWRiZThiZjE2ODE5N2RmNzA1YTc5OSIsImlhdCI6MTczOTE4Njk0N30.HdqKTFX0Dowt_oLU8N8gNfxUG4WLcqxxxVY38fpUFoo`;
const studentToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGUyNDZhYjlhZDExNzM0YTM4ZWU5NSIsIm5hbWUiOiJWaXBpbkJlbml3YWwiLCJlbWFpbCI6Im5ldGhlYWQzMjFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM3NTM0NzgyLCJleHAiOjE3Mzc2MjExODJ9.1HgqSFgudSNNXpnX6htTtIzfOyItf8g65xKVNei3XnA`;
export const api = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${tutorToken}`,
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
