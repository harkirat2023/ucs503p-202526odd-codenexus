// src/config/appConfig.js
// Express app-level configurations: CORS, logging, rate limiting
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

module.exports = {
  // CORS: Allow frontend access (CHANGE: Set to your frontend URL in production)
  corsOptions: {origin: "*"},

  // Rate limiting: Max 200 requests per 15 minutes per IP
  limiter: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: "Too many requests, please try again later.",
  }),

  // HTTP request logger
  morganLog: morgan("dev"),
};
