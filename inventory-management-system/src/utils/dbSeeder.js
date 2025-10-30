// src/utils/dbSeeder.js
// Database seeder for initial admin user
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({username: "admin"});
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        username: "admin",
        password: hashedPassword,
        role: "admin",
      });
      console.log("✅ Admin user created: username=admin, password=admin123");
    }
  } catch (error) {
    console.error("❌ Seed error:", error.message);
  }
};
