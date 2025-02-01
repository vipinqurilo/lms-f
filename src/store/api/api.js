import axios from "axios";

// const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: `https://6g2n7ff0-8000.inc1.devtunnels.ms/api`,
  withCredentials: true,
  // headers: {
  //   Authorization: token && `Bearer ${token}`,
  // },
});
