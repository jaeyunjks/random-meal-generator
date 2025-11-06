import { useState, useEffect } from 'react';

const moods = ['happy', 'sad', 'tired', 'lazy', 'adventurous', 'excited'];
const diets = ['vegan', 'halal', 'low-carb', 'none'];

const MoodSelection = ({ onSelect }) => {
    const [selectedMood, setSelectedMood] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDiet, setSelectedDiet] = useState('');

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(res => res.json())
            .then(data => setCategories(data.categories.map(cat => cat.strCategory)))
            .catch(() => setCategories(['Beef', 'Chicken', 'Dessert', 'Seafood', 'Vegetarian'])); // Fallback
    }, []);

    const handleSubmit = () => {
        if (selectedMood) onSelect(selectedMood, selectedCategory, selectedDiet === 'none' ? '' : selectedDiet);
    };

    return (
        <div className="text-center max-w-2xl w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-mint mb-4">Pick Your Mood!</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {moods.map(mood => (
                    <button key={mood} onClick={() => setSelectedMood(mood)} className={`p-4 rounded-lg shadow-md text-gray-800 ${selectedMood === mood ? 'bg-blush' : 'bg-mint hover:bg-blush'}`}>
                        {mood.charAt(0).toUpperCase() + mood.slice(1)} 😊
                    </button>
                ))}
            </div>
            <select onChange={e => setSelectedCategory(e.target.value)} className="block mx-auto mb-4 p-2 rounded border border-gray-300 w-full md:w-1/2 text-gray-800">
                <option value="">Ingin makan apa?</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
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