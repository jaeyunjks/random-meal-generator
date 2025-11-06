import { useState, useEffect } from 'react';
import { FaSmile, FaFrown, FaCoffee, FaBed, FaMountain, FaRocket } from 'react-icons/fa';

const moods = [
    { key: 'happy', icon: <FaSmile className="text-3xl" /> },
    { key: 'sad', icon: <FaFrown className="text-3xl" /> },
    { key: 'tired', icon: <FaCoffee className="text-3xl" /> },
    { key: 'lazy', icon: <FaBed className="text-3xl" /> },
    { key: 'adventurous', icon: <FaMountain className="text-3xl" /> },
    { key: 'excited', icon: <FaRocket className="text-3xl" /> }
];
const categories = ['Beef', 'Chicken', 'Dessert', 'High Protein', 'Seafood', 'Vegetarian'];
const diets = ['vegan', 'halal', 'low-carb', 'high-protein', 'dessert', 'none'];

const MoodSelection = ({ onSelect }) => {
    const [selectedMood, setSelectedMood] = useState('');
    const [categoriesList, setCategoriesList] = useState(categories); // Fallback, bisa fetch dynamic
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDiet, setSelectedDiet] = useState('');

    // Fetch categories dynamic (opsional, untuk variasi lebih)
    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(res => res.json())
            .then(data => {
                const dynamicCats = data.categories.map(cat => cat.strCategory);
                setCategoriesList([...dynamicCats, 'Dessert', 'High Protein']); // Tambah custom
            })
            .catch(() => { }); // Gunakan fallback
    }, []);

    const handleSubmit = () => {
        if (selectedMood) onSelect(selectedMood, selectedCategory, selectedDiet === 'none' ? '' : selectedDiet);
    };

    return (
        <div className="text-center max-w-2xl w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-mint mb-4">Pick Your Mood!</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {moods.map(mood => (
                    <button
                        key={mood.key}
                        onClick={() => setSelectedMood(mood.key)}
                        className={`p-4 rounded-lg shadow-md text-gray-800 flex flex-col items-center justify-center h-20 md:h-24 ${selectedMood === mood.key ? 'bg-blush border-2 border-mint' : 'bg-mint hover:bg-blush'
                            }`}
                    >
                        {mood.icon}
                        <span className="text-sm mt-1">{mood.key.charAt(0).toUpperCase() + mood.key.slice(1)}</span>
                    </button>
                ))}
            </div>
            <select onChange={e => setSelectedCategory(e.target.value)} className="block mx-auto mb-4 p-2 rounded border border-gray-300 w-full md:w-1/2 text-gray-800">
                <option value="">What do you want to eat?</option>
                {categoriesList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select onChange={e => setSelectedDiet(e.target.value)} className="block mx-auto mb-4 p-2 rounded border border-gray-300 w-full md:w-1/2 text-gray-800">
                <option value="">Diet preference?</option>
                {diets.map(diet => <option key={diet} value={diet}>{diet.charAt(0).toUpperCase() + diet.slice(1)}</option>)}
            </select>
            <button onClick={handleSubmit} className="bg-mint text-white px-6 py-3 rounded-lg hover:bg-blush transition">Generate Meal</button>
        </div>
    );
};

export default MoodSelection;