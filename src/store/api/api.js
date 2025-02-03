import axios from "axios";

export const api = axios.create({
  baseURL: `https://6g2n7ff0-8000.inc1.devtunnels.ms`,
  withCredentials: true,
});


