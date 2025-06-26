const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, unique: true, required: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  email: { type: String, unique: true, sparse: true },
  gender: { type: String, enum: ['male', 'female', 'other', 'prefer-not-to-say'], default: 'prefer-not-to-say' },
  googleId: { type: String, unique: true, sparse: true },
  avatar: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);