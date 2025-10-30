// src/config/dbConfig.js
// MongoDB Connection using Mongoose
// CHANGE: Update MONGODB_URI in .env to match your local/cloud MongoDB

require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Exit if DB connection fails
  }
};

module.exports = connectDB;
