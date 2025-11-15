// server/src/controllers/mealController.js

import SavedMeal from '../models/SavedMeal.js'; // GANTI DARI require

export const saveMeal = async (req, res) => {
    try {
        const { mealId, mealName, mealImage } = req.body;
        const userId = req.userId;

        const existing = await SavedMeal.findOne({ userId, mealId });
        if (existing) {
            return res.status(400).json({ message: 'Meal already saved' });
        }

        const saved = await SavedMeal.create({
            userId,
            mealId,
            mealName,
            mealImage
        });

        res.status(201).json({ message: 'Meal saved!', data: saved });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getSavedMeals = async (req, res) => {
    try {
        const meals = await SavedMeal.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json(meals);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteMeal = async (req, res) => {
    try {
        const result = await SavedMeal.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Meal deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const editNote = async (req, res) => {
    try {
        const { note } = req.body;
        const updated = await SavedMeal.findByIdAndUpdate(
            req.params.id,
            { note },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Note updated', data: updated });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};