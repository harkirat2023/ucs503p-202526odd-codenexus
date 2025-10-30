// src/app.js
// Express app configuration
require("./config/dotenvConfig");
const express = require("express");
const {corsOptions, limiter, morganLog} = require("./config/appConfig");
const app = express();

// Middleware
app.use(express.json());
app.use(require("cors")(corsOptions));
app.use(morganLog);
app.use(limiter);

// Routes
app.use("/api", require("./routes/index"));

// Error handler (must be last)
app.use(require("./middlewares/error.middleware"));

module.exports = app;
