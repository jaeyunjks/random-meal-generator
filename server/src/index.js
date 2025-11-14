import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';


// Load environment variables
dotenv.config();

// to connect with database
connectDB();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
// BENAR (ganti jadi ini)
app.use(cors({
    origin: 'http://localhost:5173', // frontend kamu
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes); // to connect auth routes

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Meal Generator API is running!' });
});

// API routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
