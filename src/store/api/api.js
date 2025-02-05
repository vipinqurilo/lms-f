import axios from "axios";
export const api = axios.create({
  baseURL: `https://56kjq9dz-8000.inc1.devtunnels.ms/`,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0dWRlbnRAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpZCI6IjY3YTFiNWZiOTZkMWJkZWI0NmFhMzk1YyIsImlhdCI6MTczODc0Nzg1NX0.kbhlK2nj3eMq7YgevNhL0XjBuFkYN4rWwVw3SMYdTcI`,
  },
});
