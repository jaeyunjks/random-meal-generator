// server/src/index.js (Main server file - fixed with correct imports and mounting)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js'; // import authRoutes
import mealRoutes from './routes/mealRoutes.js'; // import mealRoutes

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/meals', mealRoutes); // Correct mounting with mealRoutes

app.get('/', (req, res) => {
    res.json({ message: 'Meal Generator API is running!' });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});