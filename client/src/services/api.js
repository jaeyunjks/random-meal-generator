// client/src/services/api.js
import axios from 'axios';

// Ambil base URL dari .env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// TAMBAH INI: Interceptor untuk otomatis kirim token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;