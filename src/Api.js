import axios from "axios";

export const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

export const authAPI = axios.create({
    baseURL: "http://localhost:5000/api"
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