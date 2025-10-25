
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // 👈 added /api here
  
});

// ✅ Request interceptor: attach token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // read token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
