import axios from "axios";

export const api = axios.create({
  baseURL: `https://6g2n7ff0-8000.inc1.devtunnels.ms`,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTFiMGNiYWZlODdlY2E2ZmFlYzRhMSIsImVtYWlsIjoidW1hcmtodXJzaGlkM0BnbWFpbC5jb20iLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTczODY1MzY5N30.9UTj06mItc78qWLA1TS38cdbsOJk9bYrGLur7qfkEug`,
  },
});

export const apiWithCredentials = axios.create({
  baseURL: `https://6g2n7ff0-8000.inc1.devtunnels.ms`,
  // withCredentials: true,
});
