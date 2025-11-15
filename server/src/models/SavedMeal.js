// server/src/models/SavedMeal.js

import mongoose from 'mongoose';

const savedMealSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mealId: { type: String, required: true },
    mealName: { type: String, required: true },
    mealImage: { type: String },
    note: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('SavedMeal', savedMealSchema);