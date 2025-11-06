import { useState, useEffect } from 'react';

const SavedMeals = ({ onBack }) => {
    const [saved, setSaved] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('savedMeals')) || [];
        setSaved(stored);
    }, []);

    return (
        <div className="text-center max-w-4xl w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-mint mb-4">Saved Meals</h2>
            {saved.length === 0 ? (
                <p className="text-gray-800">No favorites yet? Let's find some!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {saved.map(meal => (
                        <div key={meal.idMeal} className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-gray-800">{meal.strMeal}</h3>
                            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-32 object-cover rounded mb-2" />
                            <p className="text-gray-800">{meal.funDesc}</p>
                        </div>
                    ))}
                </div>
            )}
            <button onClick={onBack} className="mt-6 bg-mint text-white px-6 py-3 rounded-lg hover:bg-blush transition">Back</button>
        </div>
    );
};

export default SavedMeals;