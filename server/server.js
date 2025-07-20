const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./apiRoutes');
const { connectToMongoDB } = require('./db');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/api', apiRoutes);

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    await connectToMongoDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server due to MongoDB connection failure');
    process.exit(1);
  }
};

startServer();
