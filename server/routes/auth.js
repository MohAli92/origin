const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Placeholder for phone/Google auth (to be replaced with real logic)
router.post('/register', async (req, res) => {
  const { phone, googleId, name, email, avatar } = req.body;
  try {
    let user = await User.findOne({ $or: [{ phone }, { googleId }] });
    if (!user) {
      user = new User({ phone, googleId, name, email, avatar });
      await user.save();
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;