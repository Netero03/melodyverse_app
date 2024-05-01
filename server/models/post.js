const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  // Define your post structure
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true,
  },
  // You can add other fields like:
  // - createdAt: { type: Date, default: Date.now },
  // - comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Array of comment references
  // - likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user references for likes
});

module.exports = mongoose.model('post', postSchema);
