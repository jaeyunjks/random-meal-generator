import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username dan password wajib diisi' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password minimal 6 karakter' });
    }
    try {
        const hash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hash });
        res.status(201).json({ message: 'User registered!', user: newUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: 'User not found' });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: 'Wrong password' });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
        res.json({ message: 'Login successful', token, user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
