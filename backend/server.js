const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Config Variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/appgros';

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB: Appgros'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); 
  });

// Example Route using your Keys
app.get('/', (req, res) => {
  res.json({
    message: 'Appgros API is running...',
    status: 'Healthy',
    // We only expose the Public Key for safety
    serviceID: process.env.PUBLIC_KEY 
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server active on http://localhost:${PORT}`);
});