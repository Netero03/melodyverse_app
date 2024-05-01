const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config'); // Load JWT secret and other configurations
const Post = require('../models/post'); // Import the Post model

// Middleware for authentication (replace with your implementation)
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.userId = decoded.id;
    next();
  });
};

// Get all posts (paginated)
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Limit per page (optional)

  try {
    const posts = await Post.find()
      .skip((page - 1) * limit) // Skip posts for previous pages
      .limit(limit)
      .populate('author', 'username'); // Populate author details

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new post (protected)
router.post('/', verifyToken, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Please provide both title and content' });
  }

  const newPost = new Post({
    title,
    content,
    author: req.userId, // Get author ID from verified token
  });

  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// (Optional) Implement routes for specific post actions (like, comment, etc.) based on your requirements.

module.exports = router;
