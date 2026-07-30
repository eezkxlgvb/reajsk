const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if panel password is "reza grootz"
    if (password !== process.env.PANEL_PASSWORD && password !== 'reza grootz') {
      return res.status(400).json({ msg: '❌ Invalid credentials' });
    }

    let user = await User.findOne({ username: username || 'admin' });
    
    if (!user) {
      user = new User({
        username: username || 'admin',
        password: process.env.PANEL_PASSWORD || 'reza grootz'
      });
      await user.save();
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, username: user.username });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
