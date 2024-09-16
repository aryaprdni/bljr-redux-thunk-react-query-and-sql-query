import axios from "axios";

export const API = axios.create({
    baseURL: "http://localhost:3000/api",
});

export const APIWithToken = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

APIWithToken.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['X-API-TOKEN'] = `${token}`;
    }
    return config;
});
