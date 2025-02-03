import axios from "axios";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczODU3NTYzN30.r5Vg-waz8Bixw3rkOAURnBxXZAWKM_k8bmTZmbq8Rs8`;

export const api = axios.create({
  baseURL: `https://6g2n7ff0-8000.inc1.devtunnels.ms`,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
