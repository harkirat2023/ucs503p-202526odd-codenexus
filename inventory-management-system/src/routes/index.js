// src/routes/index.js
// Main router: combines all route modules
const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/products", require("./product.routes"));
router.use("/inventory", require("./inventory.routes"));
router.use("/barcode", require("./barcode.routes"));
router.use("/orders", require("./order.routes"));


module.exports = router;
