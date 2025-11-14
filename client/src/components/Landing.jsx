import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaTimes, FaUser } from 'react-icons/fa';
import { useState } from 'react';
import Register from '../pages/Register'; // Pastikan path benar
import { login } from '../services/authService';

const Landing = ({ onStart, onViewSaved, toggleDark, isDark }) => {
    const [showAuth, setShowAuth] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [loginValues, setLoginValues] = useState({ username: '', password: '' });
    const [loginMessage, setLoginMessage] = useState('');

    const openAuth = () => setShowAuth(true);
    const closeAuth = () => {
        setShowAuth(false);
        setIsRegister(false);
        setLoginMessage('');
        setLoginValues({ username: '', password: '' });
    };

    const handleLoginChange = (e) =>
        setLoginValues({ ...loginValues, [e.target.name]: e.target.value });

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginMessage('');
        try {
            const res = await login(loginValues);
            setLoginMessage('Login success!');
            // Simpan token atau user
            // localStorage.setItem('token', res.data.token);
            setTimeout(() => {
                closeAuth();
                onStart(); // Langsung masuk app
            }, 1000);
        } catch (err) {
            setLoginMessage(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-2xl w-full p-6 relative"
            >
                {/* Dark Mode + Login Button */}
                <div className="flex justify-end gap-3 mb-6">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleDark}
                        className="text-gray-700 hover:text-mint transition"
                    >
                        {isDark ? <FaSun size={28} /> : <FaMoon size={28} />}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={openAuth}
                        className="flex items-center gap-2 bg-mint text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:bg-blush transition"
                    >
                        <FaUser size={16} />
                        Login
                    </motion.button>
                </div>

                {/* === SISA KONTEN LANDING (TIDAK BERUBAH) === */}
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-mint mb-3 tracking-tight">
                        MoodBite
                    </h1>
                    <p className="text-lg md:text-xl text-gray-800 mb-8 font-medium">
                        Hey there! How’s your mood today?
                    </p>
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="mb-10"
                >
                    <img
                        src="https://img.freepik.com/free-vector/cute-cat-chef-cartoon_53876-128203.jpg"
                        alt="Cat Chef Mascot"
                        className="mx-auto w-40 h-40 md:w-48 md:h-48 rounded-full shadow-xl border-4 border-white object-cover"
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/200?text=Cat+Chef";
                        }}
                    />
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(168, 218, 220, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onStart}
                        className="bg-mint text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-blush transition-all duration-300"
                    >
                        Start Your Bite
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onViewSaved}
                        className="bg-blush text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-mint transition-all duration-300"
                    >
                        Saved Meals
                    </motion.button>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className="mt-2 text-mint underline text-sm font-medium"
                >
                    Or just surprise me!
                </motion.button>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-sm text-gray-600 italic"
                >
                    Let your mood cook something delicious
                </motion.p>
            </motion.div>

            {/* === MODAL AUTH === */}
            <AnimatePresence>
                {showAuth && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                        onClick={closeAuth}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-mint">
                                    {isRegister ? 'Create Account' : 'Welcome Back'}
                                </h2>
                                <button
                                    onClick={closeAuth}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>

                            {!isRegister ? (
                                // === LOGIN FORM ===
                                <form onSubmit={handleLoginSubmit} className="space-y-4">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={loginValues.username}
                                        onChange={handleLoginChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mint"
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={loginValues.password}
                                        onChange={handleLoginChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mint"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-mint text-white py-3 rounded-lg font-semibold hover:bg-blush transition"
                                    >
                                        Login
                                    </button>
                                    {loginMessage && (
                                        <p className={`text-center text-sm ${loginMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                                            {loginMessage}
                                        </p>
                                    )}
                                    <p className="text-center text-sm text-gray-600">
                                        Belum punya akun?{' '}
                                        <button
                                            type="button"
                                            onClick={() => setIsRegister(true)}
                                            className="text-mint font-medium hover:underline"
                                        >
                                            Register
                                        </button>
                                    </p>
                                </form>
                            ) : (
                                // === REGISTER COMPONENT ===
                                <Register
                                    onBack={() => setIsRegister(false)}
                                    onSuccess={() => {
                                        setLoginMessage('Register success! Please login.');
                                        setIsRegister(false);
                                    }}
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Landing;