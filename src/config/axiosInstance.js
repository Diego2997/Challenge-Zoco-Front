import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 12000,
    headers: {
        "Content-Type": "application/json",
    },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const data = sessionStorage.getItem("token");

    if (data && !config.url.includes("/auth/login")) {
      config.headers.Authorization = `Bearer ${JSON.parse(data).token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);