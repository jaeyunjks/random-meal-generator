import axios from 'axios';

// Ambil base URL dari .env agar gampang pindah environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export default api;
