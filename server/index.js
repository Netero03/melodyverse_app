const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // For parsing request bodies (optional)
const cors = require('cors'); // For enabling CORS (if needed)
const config = require('./config'); // Load JWT secret and other configurations
const postRoutes = require('./routes/postRoutes'); // Import post routes
const userRoutes = require('./routes/userRoutes'); // Placeholder for future user routes

const app = express();

// Connect to MongoDB database

// Connect this URI below instead
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors()); // Enable CORS if needed
app.use(bodyParser.json()); // Parse JSON request bodies (optional)

// Routes
app.use('/api/posts', postRoutes); // Mount post routes under '/api/posts' prefix
app.use('/api/users', userRoutes); // Placeholder for user routes (implement later)

// Error handling (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ message: err.message || 'Server error' });
});

const port = process.env.PORT || 5000;  

app.listen(port, () => console.log(`Server listening on port ${port}`));

// Export the app instance
module.exports = app;