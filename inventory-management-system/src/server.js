// src/server.js
// Server startup and MongoDB connection
const app = require("./app");
const connectDB = require("./config/dbConfig");
const {seedAdmin} = require("./utils/dbSeeder");

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
const startServer = async () => {
  await connectDB();
  await seedAdmin(); // Create admin user on first run
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
