import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://kryzen-app.onrender.com/api/auth/signin', formData);
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                if (formData.email === "admin@gmail.com") {
                    setMessage('Logged in as admin successfully!');
                    setError('');
                    setTimeout(() => navigate('/admin'), 2000);
                } else {
                    setMessage('Logged in successfully!');
                    setError('');
                    setTimeout(() => navigate('/products'), 2000);
                }
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred. Please try again.');
            setMessage('');
        }
    };

    return (
        <div className="form-container">
            <h1>Login Page</h1>
            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Log In</button>
                <button onClick={() => navigate('/signup')}>Sign Up</button>
            </form>
        </div>
    );
};

export default Login;
