import React, { useState } from 'react';
import { register } from '../services/authService';

function Register({ onBack }) {
    const [values, setValues] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) =>
        setValues({ ...values, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const res = await register(values);
            setMessage(res.data.message || 'Register success!');
            setValues({ username: '', password: '' });
        } catch (err) {
            setMessage(err.response?.data?.message || 'Register failed');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64 bg-white p-4 rounded shadow">
                <h2 className="text-lg font-bold">Register</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={values.username}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Register</button>
                <button type="button" onClick={onBack} className="bg-gray-200 p-2 rounded">Back</button>
                {message && <p className="mt-2 text-center">{message}</p>}
            </form>
        </div>
    );
}

export default Register;
