// src/routes/auth.routes.js
// Authentication routes: login
const router = require("express").Router();
const authController = require("../controllers/auth.controller");

// POST /auth/login - User login
router.post("/login", authController.login);

module.exports = router;
