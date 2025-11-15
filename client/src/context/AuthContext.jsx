// client/src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';

// Buat context
export const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user & token dari localStorage saat app mulai
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');

        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
        }
        setLoading(false);
    }, []);

    // Login
    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
    };

    // Logout
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    // Nilai yang akan dipakai di seluruh app
    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};