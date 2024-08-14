import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
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
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

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
        navigate('/login'); // Redirect to login page after successful signup
        setUsername(''); // Reset form fields
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setProfilePicture('');
        setIsChecked(false);
      } else {
        setError(response.data.message || 'Signup failed');
      }
      localStorage.setItem('token', response.data.token); // Store token in local storage (temporary solution)
    } catch (err) {
      setError(err.response.data.message);
      console.error('Signup error:', error.response.data);
    }
    navigate(`/login?signup=success`);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-screen-full flex flex-col justify-center items-center mx-[99px] gap-5 sm:mx-[400px] md:mx-[600px] ">
      <h2 className=' text-xl font-bold'>Signup</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <div className="form-group flex flex-col gap-1">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='rounded px-1'
          />
        </div>
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
          <div >
            <label className='gap-2 flex'>
              <input type="checkbox" checked={showPassword} onChange={togglePasswordVisibility} />
              <p >Show Password</p>
            </label>
          </div>
        </div>
        <div className="form-group flex flex-col gap-1">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='rounded px-1'
          />
        </div>
        <div className="form-group flex flex-col gap-1">
          <label htmlFor="name">Name (Optional):</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='rounded px-1'
          />
        </div>
        <div className="form-group flex flex-col gap-1">
          <label htmlFor="profilePicture">Profile Picture (Optional):</label>
          <input
            type="file"
            id="profilePicture"
            onChange={(e) => setProfilePicture(e.target.files[0])} // Handle file selection
            className='rounded px-1'
          />
        </div>
        <div className="form-group checkbox flex flex-row gap-1 my-3">
          <input
            type="checkbox"
            id="terms"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <Link htmlFor="terms">I agree to the Terms & Conditions</Link>
        </div>
        <button type="submit" disabled={!isChecked}>
          Signup
        </button>
      </form>

      <p>
        Already Have an Account?{' '}
        <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;
