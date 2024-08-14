import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [verificationSent, setVerificationSent] = useState(false); // State to track verification email sent
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  
  useEffect(() => {
    // Check if redirected from signup and show popup
    const params = new URLSearchParams(window.location.search);
    if (params.get('signup') === 'success') {
      setShowPopup(true);
      setPopupMessage('Verification email sent. Check your inbox!');

      // Hide popup after 6 seconds
      const timeout = setTimeout(() => {
        setShowPopup(false);
      }, 6000);

      return () => clearTimeout(timeout); // Clear timeout on component unmount
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('https://melodyverse-backend.vercel.app/api/users/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('melodyverse-token', token);
      onLogin(token); // Pass the token to the parent component (App.jsx)
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response.data.message || 'An error occurred during login');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-screen-full flex flex-col justify-center items-center gap-5">
      <h2 className=' text-xl font-bold'>Login</h2>
      {verificationSent && (
        <div className="popup">
          <div className="popup-content">
            <h3>Verification Email Sent</h3>
            <p>A verification email has been sent to your email address. Login after verification</p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <div className="form-group flex flex-col gap-1">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='rounded px-1'
          />
        </div>
        <div className="form-group flex flex-col gap-1">
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='rounded px-1'
          />
          <div>
            <label className='gap-2 flex'>
              <input type="checkbox" checked={showPassword} onChange={togglePasswordVisibility} />
              <p>Show Password</p>
            </label>
          </div>
        </div>
        <button type="submit">Login</button>
        <p>
          New user?{' '}
          <a href="/signup">Create an account</a>
        </p>
      </form>
      {error && <p className="error mt-4">{error}</p>}
      {showPopup && (
        <div className="popup">
          <p className="popup-message">{popupMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
