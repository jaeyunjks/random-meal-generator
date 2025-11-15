// client/src/services/mealService.js
import api from './api';

export const saveMeal = (data) => api.post('/meals/save', data);
export const getSavedMeals = () => api.get('/meals/saved');
export const deleteMeal = (id) => api.delete(`/meals/saved/${id}`);
export const editMealNote = (id, note) => api.put(`/meals/saved/${id}`, { note });