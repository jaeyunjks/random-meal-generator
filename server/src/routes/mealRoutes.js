// mealRoutes.js
import express from 'express';
import { saveMeal, getSavedMeals, deleteMeal, editNote } from '../controllers/mealController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/save', auth, saveMeal);
router.get('/saved', auth, getSavedMeals);
router.delete('/saved/:id', auth, deleteMeal);
router.put('/saved/:id', auth, editNote);

router.get('/test', (req, res) => {
    res.json({ message: 'Meal routes OK!' });
});

export default router; // INI HARUS ADA!