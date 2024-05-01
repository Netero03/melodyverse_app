import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validator from 'validator'; // Email validation library

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Basic validation
        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill in all required fields');
            return;
        }

        // Email format validation
        if (!validator.isEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users/signup', {
                username,
                email,
                password,
                name,
                profilePicture
            });
            console.log('Signup successful:', response.data);
            if (response.data.success) {
                setSuccess('Welcome to MelodyVerse! A verification email has been sent.');
                navigate('/posts'); // Redirect to post list
            } else {
                setError(response.data.message || 'Signup failed');
            }
            localStorage.setItem('token', response.data.token); // Store token in local storage (temporary solution)
        } catch (err) {
            setError(err.response.data.message);
            console.error('Signup error:', error.response.data);
        }

        navigate('/posts');
    };

    return (
        <div className="signup-form">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name (Optional):</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="profilePicture">Profile Picture (Optional):</label>
                    <input
                        type="file"
                        id="profilePicture"
                        onChange={(e) => setProfilePicture(e.target.files[0])} // Handle file selection
                    />
                </div>
                <div className="form-group checkbox">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                    />
                    <label htmlFor="terms">I agree to the Terms & Conditions</label>
                </div>
                <button type="submit" disabled={!isChecked}>
                    Signup
                </button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default Signup;
