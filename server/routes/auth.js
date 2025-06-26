const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { sendWhatsAppOTP } = require('../utils/twilio');

// تخزين الأكواد مؤقتًا في الذاكرة (يمكن استبداله بـ Redis لاحقًا)
const otpStore = new Map();

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

// إرسال كود OTP على واتساب
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number is required' });
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phone, { code, expires: Date.now() + 5 * 60 * 1000 }); // صالح 5 دقائق
  try {
    await sendWhatsAppOTP(phone, code);
    res.json({ success: true, message: 'OTP sent via WhatsApp' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP', details: err.message });
  }
});

// التحقق من كود OTP
router.post('/verify-otp', async (req, res) => {
  const { phone, code, firstName, lastName, email, gender } = req.body;
  if (!phone || !code) return res.status(400).json({ error: 'Phone and code are required' });
  const record = otpStore.get(phone);
  if (!record || record.code !== code) return res.status(400).json({ error: 'Invalid code' });
  if (Date.now() > record.expires) return res.status(400).json({ error: 'Code expired' });
  otpStore.delete(phone);
  // إنشاء المستخدم إذا لم يكن موجودًا
  let user = await User.findOne({ phone });
  if (!user) {
    user = new User({ phone, firstName, lastName, email, gender });
    await user.save();
  }
  res.json({ success: true, message: 'OTP verified', user });
});

module.exports = router;