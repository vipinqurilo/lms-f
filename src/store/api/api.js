import axios from "axios";

// const baseUrlAshokSir = "https://6g2n7ff0-8000.inc1.devtunnels.ms/api";
// const baseUrlAbhiSir = "https://q1ztd2hs-8000.inc1.devtunnels.ms/api";
// const baseURLVipin = "https://rvdr9qkh-8000.inc1.devtunnels.ms/api";
// const verceUrl="https://lms-backend-rho-pink.vercel.app/api"
// const baseUrlKD = "https://wq1jbb9k-8000.inc1.devtunnels.ms/api";

export const api = axios.create({
  baseURL: "/api", // This will be forwarded by Next.js proxy
  withCredentials: true,
  // baseURL: baseUrlKD,
  // baseURL: baseURLVipin,
  headers: {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
});

// api.interceptors.request.use((config) => {
//   const userToken = localStorage.getItem("token");
//   const adminToken = localStorage.getItem("adminToken");

//   if (adminToken) {
//     config.headers.Authorization = `Bearer ${adminToken}`; // Prioritize admin token
//   } else if (userToken) {
//     config.headers.Authorization = `Bearer ${userToken}`;
//   }

//   // Ensure all requests disable caching
//   config.headers["Cache-Control"] =
//     "no-store, no-cache, must-revalidate, proxy-revalidate";
//   config.headers["Pragma"] = "no-cache";
//   config.headers["Expires"] = "0";
//   return config;
// });
