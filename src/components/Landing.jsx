import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';

const Landing = ({ onStart, onViewSaved, toggleDark, isDark }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl w-full p-6"
        >
            {/* Dark Mode Toggle */}
            <div className="flex justify-end mb-6">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleDark}
                    className="text-gray-700 hover:text-mint transition"
                >
                    {isDark ? <FaSun size={28} /> : <FaMoon size={28} />}
                </motion.button>
            </div>

            {/* Logo + Title */}
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

            {/* Mascot - FIX: Gambar baru free dari Freepik */}
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
                    src="https://img.freepik.com/free-vector/cute-cat-chef-cartoon_53876-128203.jpg"  // Gambar cat chef cute, free
                    alt="Cat Chef Mascot"
                    className="mx-auto w-40 h-40 md:w-48 md:h-48 rounded-full shadow-xl border-4 border-white object-cover"
                    onError={(e) => {  // Fallback kalau gagal load
                        e.target.src = "https://via.placeholder.com/200?text=Cat+Chef";  // Placeholder sederhana
                    }}
                />
            </motion.div>

            {/* Buttons */}
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

            {/* Surprise Me Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStart}
                className="mt-2 text-mint underline text-sm font-medium"
            >
                Or just surprise me!
            </motion.button>

            {/* Tagline */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 text-sm text-gray-600 italic"
            >
                Let your mood cook something delicious
            </motion.p>
        </motion.div>
    );
};

export default Landing;