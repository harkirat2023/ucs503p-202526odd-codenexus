// src/controllers/auth.controller.js
// Authentication logic: login with JWT
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// POST /auth/login
// Body: { username, password }
exports.login = async (req, res) => {
  try {
    const {username, password} = req.body;

    // Find user by username
    const user = await User.findOne({username});
    if (!user) return res.status(401).json({msg: "User not found"});

    // Compare passwords
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({msg: "Invalid credentials"});

    // Generate JWT token
    const token = jwt.sign(
      {id: user._id, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: "7d"}
    );

    res.json({
      token,
      user: {id: user._id, username: user.username, role: user.role},
    });
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};
