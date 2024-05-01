  import axios from 'axios';
  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';

  const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);

      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }

      try {
        const response = await axios.post('http://localhost:5000/api/users/login', {
          email,
          password
        });

        console.log('Login response:', response);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          console.log('User logged in successfully!');
          setSuccess('Welcome back to MelodyVerse! You are now logged in.');
          navigate('/posts'); // Navigate to the /posts route after successful login
        } else {
          setError('Login failed: Token not found in response');
        }
      } catch (err) {
        console.error('Login error:', err);
        setError(err.response.data.message || 'An error occurred during login');
      }
    };

    return (
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
          <p>
            New user?{' '}
            <a href="/signup">Create an account</a>
          </p>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
    );
  };

  export default Login;