const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

// Register user
router.post('/signup', async (req, res) => {
  // Validation (replace with your validation library)
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Please fill in all required fields' });
  }

  // Check for existing user
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // Create new user
  const user = new User(req.body);
  try {
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).json({ message: 'User created successfully', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validation (replace with your validation library)
  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate JWT token
  const token = user.generateAuthToken();
  res.json({ message: 'Login successful', token });
});

module.exports = router;