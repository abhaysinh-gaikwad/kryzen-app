import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

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
                    const getnameFromemail = formData.email.split('@')[0];
                    setError('');
                    setTimeout(() => navigate(`/products/${getnameFromemail}`), 2000);
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
            <div className="server-delay-notice" style={ { marginBottom: '10px', padding: '10px', border: '1px solid #ffa', backgroundColor: '#fff5e6', borderRadius: '5px', textAlign: 'center' } }>
                <p style={ { fontSize: '14px', color: '#e68a00' } }>
                    <strong style={ { color: '#e68a00',  fontSize: '16px'} }>Notice:</strong> <br /> If the server has been inactive for 15 minutes, there might be a slight delay in response when you log in or sign up. <br />Please be patient during this initial period. <br />Once the server is active, your experience will be much smoother.                </p>
            </div>
            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={ {textAlign: 'center', border: '1px solid #ccc'}}>
                    <span style={{fontWeight: 'bold', margin: '10px'}} >login as admin</span><br />
                    <span><b> email:</b> admin@gmail.com</span>
                    <span><b> password:</b> admin</span>

                </div>
                
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
