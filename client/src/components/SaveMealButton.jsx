// client/src/components/SaveMealButton.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { saveMeal } from '../services/mealService';

const SaveMealButton = ({ meal }) => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = async () => {
        if (!user) {
            alert('Login dulu!');
            return;
        }

        setLoading(true);
        try {
            await saveMeal({
                mealId: meal.idMeal,
                mealName: meal.strMeal,
                mealImage: meal.strMealThumb
            });
            setSaved(true);
            alert('Meal saved!');
        } catch (err) {
            alert('Gagal save: ' + (err.response?.data?.message || 'Error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleSave}
            disabled={loading || saved}
            className={`px-4 py-2 rounded text-white font-medium ${saved ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
                }`}
        >
            {loading ? 'Saving...' : saved ? 'Saved!' : 'Save Meal'}
        </button>
    );
};

export default SaveMealButton;