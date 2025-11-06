import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const funDescriptions = {
    happy: 'This will make your day even brighter! 🌟',
    sad: 'A cozy hug in meal form! 🤗',
    tired: 'Easy and energizing – no fuss! ☕',
    lazy: 'Minimal effort, maximum yum! 🛋️',
    adventurous: 'A bold flavor adventure! 🏔️',
    excited: 'Full of excitement and flavors! 🚀',
};

const MealResult = ({ mood, category, diet, onTryAgain, onViewSaved }) => {
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMeal = async (retryCount = 0) => {
            setLoading(true);
            setError('');
            try {
                let url = 'https://www.themealdb.com/api/json/v1/1/random.php';
                if (category) {
                    // Handle custom categories seperti 'Dessert' atau 'High Protein'
                    if (category === 'Dessert') url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert`;
                    else if (category === 'High Protein') url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken`; // Fallback ke high-protein category
                    else url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
                }
                let res = await fetch(url);
                let data = await res.json();
                if (!data.meals || data.meals.length === 0) {
                    if (retryCount < 2) {
                        setError('No exact match, trying alternative...');
                        return fetchMeal(retryCount + 1); // Retry dengan random
                    }
                    url = 'https://www.themealdb.com/api/json/v1/1/random.php';
                    res = await fetch(url);
                    data = await res.json();
                }
                let selectedMeal = data.meals[Math.floor(Math.random() * data.meals.length)] || data.meals[0];
                const fullRes = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedMeal.idMeal}`);
                const fullData = await fullRes.json();
                selectedMeal = fullData.meals[0];
                // Handle diet: Cek tags atau fallback
                if (diet) {
                    const mealTags = selectedMeal.strTags ? selectedMeal.strTags.toLowerCase() : '';
                    if (diet === 'high-protein' && !mealTags.includes('chicken') && !mealTags.includes('beef')) {
                        setError(`Switched to high-protein option! 💪`);
                    } else if (diet === 'dessert' && !category.includes('Dessert')) {
                        setError(`Added a sweet twist! 🍰`);
                    }
                }
                selectedMeal.funDesc = `${funDescriptions[mood] || 'Yummy!'} (Pref: ${category || 'Any'}, Diet: ${diet || 'Any'})`;
                setMeal(selectedMeal);
            } catch (err) {
                if (retryCount < 2) return fetchMeal(retryCount + 1);
                setError('Oops, network hiccup! Try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchMeal();
    }, [mood, category, diet]);

    const handleSave = () => {
        const saved = JSON.parse(localStorage.getItem('savedMeals')) || [];
        if (!saved.some(m => m.idMeal === meal.idMeal)) {
            saved.push(meal);
            localStorage.setItem('savedMeals', JSON.stringify(saved));
        }
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    const handleCopy = () => {
        const recipe = `${meal.strMeal}\n\n${meal.funDesc}\n\nIngredients:\n${Array.from({ length: 20 })
            .map((_, i) => {
                const ing = meal[`strIngredient${i + 1}`];
                const meas = meal[`strMeasure${i + 1}`];
                return ing ? `- ${meas} ${ing}` : '';
            }).filter(Boolean).join('\n')}\n\nInstructions:\n${meal.strInstructions}`;

        navigator.clipboard.writeText(recipe);
        alert('Recipe copied to clipboard!');
    };

    <button onClick={handleCopy} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition">
        Copy Recipe
    </button>

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({ title: meal.strMeal, text: meal.funDesc, url: meal.strSource || '' });
        } else {
            alert('Share not supported, copy link manually!');
        }
    };

    if (loading) return <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-mint text-xl">Whipping up something magical... 🍲</motion.p>;
    if (!meal && error) return <p className="text-red-500 text-gray-800">{error}</p>;

    const videoId = meal.strYoutube ? meal.strYoutube.split('v=')[1]?.split('&')[0] : null;

    return (
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center max-w-2xl w-full bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-mint mb-4">{meal.strMeal}</h2>
            <img src={meal.strMealThumb} alt={meal.strMeal} className="mx-auto mb-4 rounded-lg w-full md:w-3/4" />
            <p className="text-gray-800 mb-4">{meal.funDesc}</p>
            {error && <p className="text-yellow-600 mb-4">{error}</p>}
            <h3 className="text-lg font-semibold text-gray-800">Ingredients:</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-800 text-left mx-auto max-w-md">
                {Array.from({ length: 20 }).map((_, i) => {
                    const ing = meal[`strIngredient${i + 1}`];
                    const meas = meal[`strMeasure${i + 1}`];
                    return ing ? <li key={i}>{meas} {ing}</li> : null;
                })}
            </ul>
            <h3 className="text-lg font-semibold text-gray-800">Instructions:</h3>
            <p className="mb-6 text-gray-800 text-left mx-auto max-w-md">{meal.strInstructions.slice(0, 300)}...</p>

            {/* New: YouTube Tutorial */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">YouTube Tutorial:</h3>
            {videoId ? (
                <div className="mb-6">
                    <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="Tutorial"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg max-w-md mx-auto"
                    ></iframe>
                </div>
            ) : (
                <p className="text-gray-800 mb-6">No video available? <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(meal.strMeal + ' recipe')}`} target="_blank" rel="noopener noreferrer" className="text-mint underline">Search on YouTube!</a></p>
            )}

            <div className="flex flex-col md:flex-row justify-center gap-4">
                <button onClick={onTryAgain} className="bg-mint text-white px-4 py-2 rounded hover:bg-blush transition">Try Again 🎲</button>
                <button onClick={handleSave} className="bg-blush text-white px-4 py-2 rounded hover:bg-mint transition">Save</button>
                <button onClick={handleShare} className="bg-mint text-white px-4 py-2 rounded hover:bg-blush transition">Share</button>
                <button onClick={onViewSaved} className="bg-blush text-white px-4 py-2 rounded hover:bg-mint transition">View Saved</button>
            </div>
        </motion.div>
    );
};

export default MealResult;