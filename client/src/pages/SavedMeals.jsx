// client/src/pages/SavedMeals.jsx
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { getSavedMeals, deleteMeal, editMealNote } from '../services/mealService';

const SavedMeals = () => {
    const { user } = useContext(AuthContext);
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [note, setNote] = useState('');

    useEffect(() => {
        if (user) fetchMeals();
    }, [user]);

    const fetchMeals = async () => {
        setLoading(true);
        try {
            const res = await getSavedMeals();
            setMeals(res.data);
        } catch (err) {
            alert('Gagal load saved meals');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus?')) return;
        try {
            await deleteMeal(id);
            setMeals(meals.filter(m => m._id !== id));
        } catch (err) {
            alert('Gagal hapus');
        }
    };

    const handleEdit = async (id) => {
        try {
            await editMealNote(id, note);
            setMeals(meals.map(m => m._id === id ? { ...m, note } : m));
            setEditingId(null);
            setNote('');
        } catch (err) {
            alert('Gagal edit');
        }
    };

    if (!user) return <p className="text-center">Login dulu!</p>;

    if (loading) return <p className="text-center">Loading...</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Saved Meals</h1>
            {meals.length === 0 ? (
                <p className="text-gray-500">Belum ada meal disimpan</p>
            ) : (
                <div className="grid gap-6">
                    {meals.map(meal => (
                        <div key={meal._id} className="bg-white p-6 rounded-lg shadow flex gap-4">
                            <img
                                src={meal.mealImage}
                                alt={meal.mealName}
                                className="w-32 h-32 object-cover rounded"
                            />
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold">{meal.mealName}</h3>
                                {editingId === meal._id ? (
                                    <div className="mt-2 flex gap-2">
                                        <input
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            placeholder="Tulis note..."
                                            className="border rounded px-3 py-1 flex-1"
                                        />
                                        <button onClick={() => handleEdit(meal._id)} className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
                                        <button onClick={() => { setEditingId(null); setNote(''); }} className="bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
                                    </div>
                                ) : (
                                    <p className="text-gray-600 mt-1">{meal.note || 'No note'}</p>
                                )}
                                <div className="mt-3 flex gap-2">
                                    <button
                                        onClick={() => { setEditingId(meal._id); setNote(meal.note || ''); }}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit Note
                                    </button>
                                    <button
                                        onClick={() => handleDelete(meal._id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedMeals;