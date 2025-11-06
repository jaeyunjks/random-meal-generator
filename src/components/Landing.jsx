import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';

const Landing = ({ onStart, onViewSaved, toggleDark, isDark }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center max-w-2xl w-full">
            <div className="flex justify-end mb-4">
                <button onClick={toggleDark} className="text-gray-800 hover:text-mint">
                    {isDark ? <FaSun size={24} /> : <FaMoon size={24} />}
                </button>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-mint mb-4">MoodBite</h1>
            <p className="text-xl text-gray-800 mb-6">Hey there! How’s your mood today?</p>
            <img src="https://via.placeholder.com/200?text=Mascot" alt="Mascot" className="mx-auto mb-6 rounded-full shadow-md" />
            <button onClick={onStart} className="bg-mint text-white px-6 py-3 rounded-lg hover:bg-blush transition md:px-8 md:py-4">Start</button>
            <button onClick={onViewSaved} className="ml-4 bg-blush text-white px-6 py-3 rounded-lg hover:bg-mint transition md:px-8 md:py-4">Saved Meals</button>
        </motion.div>
    );
};

export default Landing;