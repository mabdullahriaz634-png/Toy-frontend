import axios from "axios";

export const API = axios.create({
    baseURL: "https://toy-backend-api.vercel.app/api"
});

export const authAPI = axios.create({
    baseURL: "https://toy-backend-api.vercel.app/api"
});

authAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const setToken = (token) => {
  localStorage.setItem("token",token);
};

export const logout = (token) => {
    localStorage.removeItem("token")
};