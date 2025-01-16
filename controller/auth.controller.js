const User = require('../models/user'); // Update with your actual model path
const jwt = require('jsonwebtoken');
// Signup Controller
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check for all required fields
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    // Create a new user
    const user = await User.create({ name, email, password });
    res.status(201).json({
      success: true,
      data: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};
// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check for email and password
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    // Match password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    // Generate JWT token
    const token = user.getSignedJwtToken();
    // Store JWT in cookies
    res.cookie('token', token, {
      httpOnly: true, // Protect cookie from being accessed by client-side scripts
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(200).json({
      success: true,
      data: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
