import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});

// ✅ now accepts token
export const getNextMessage = (data, token) =>
  API.post("/ai/next", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });