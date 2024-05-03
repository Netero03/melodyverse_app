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
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('post', postSchema);
