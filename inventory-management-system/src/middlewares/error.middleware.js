// src/middlewares/error.middleware.js
// Global error handler (always last middleware)
module.exports = (err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({msg: err.message || "Internal server error"});
};
