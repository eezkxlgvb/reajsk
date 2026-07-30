require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/reza-grootz')
  .then(() => console.log('✅ MongoDB connected — Ultra Luxury Database Ready'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/configs', require('./routes/configs'));

// Serve panel
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 REZA GROOTZ Panel running on port ${PORT}`);
});
