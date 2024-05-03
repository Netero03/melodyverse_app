const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid'); // Import uuidv4 function for generating tokens

const router = express.Router();

// Register user with email verification
router.post('/signup', async (req, res) => {
  try {
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
    await user.save();

    // Generate verification token
    const verificationToken = uuidv4();

    // Store verification token and email in the database
    await storeVerificationToken(req.body.email, verificationToken);

    // Send verification email
    await sendVerificationEmail(req.body.email, verificationToken);

    res.status(201).json({ message: 'User created successfully. Verification email sent.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Function to store verification token and email in the database
const storeVerificationToken = async (email, token) => {
  // Store the token and email address in your database
};

// Function to send a verification email
const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password',
    },
  });

  const mailOptions = {
    from: 'Your Name <your-email@gmail.com>',
    to: email,
    subject: 'Verify your email address',
    text: `Please click on the following link to verify your email address: http://localhost:3000/verify?token=${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

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