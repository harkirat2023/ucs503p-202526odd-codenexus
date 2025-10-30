// src/routes/barcode.routes.js
// Barcode scanning and generation routes
const router = require("express").Router();
const controller = require("../controllers/barcode.controller");
const auth = require("../middlewares/auth.middleware");

// POST /barcode/scan - Scan barcode and fetch product
router.post("/scan", controller.scan);

// POST /barcode/generate - Generate barcode for product (auth required)
router.post("/generate", auth, controller.generate);

module.exports = router;
