const express = require('express');
const router = express.Router();
const Post = require('../models/post'); // Import the Post model

// Get all posts (paginated)
router.get('/', async (req, res) => {
  const limit = 10; // Limit per page
  const lastPostId = req.query.lastPostId; // Optional query param for offset

  const query = {};
  if (lastPostId) { // Check for valid ObjectId
    query._id = { $lt: lastPostId };
  }

  try {
    let posts;
    if (lastPostId) {
      posts = await Post.find(query)
        .sort({ _id: -1 })
        .limit(limit);
    } else {
      posts = await Post.find()
        .sort({ _id: -1 })
        .limit(limit);
    }

    const hasNext = posts.length === limit;
    res.json({ posts, hasNext });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
