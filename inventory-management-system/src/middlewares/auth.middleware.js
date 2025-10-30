// src/middlewares/auth.middleware.js
// JWT authentication middleware
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Extract token from Authorization header (Bearer token)
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({msg: "No authentication token provided"});
  }

  try {
    // Verify and decode JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    res.status(403).json({msg: "Invalid or expired token"});
  }
};
