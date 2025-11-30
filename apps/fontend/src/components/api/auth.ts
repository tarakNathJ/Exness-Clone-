import axios from "axios";
const api_init = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor
api_init.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// responce interceptor
api_init.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("access_token");
      console.warn("Unauthorized");
    }
    return Promise.reject(error);
  }
);
 

export  {api_init};