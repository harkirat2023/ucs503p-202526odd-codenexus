/**
 * deleteData.js
 * ------------------------
 * Clears all products, barcodes, and inventory documents.
 * Use this before re-importing data to avoid duplicates.
 *
 * Run using: node src/scripts/deleteData.js
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const Product = require("../models/product.model");
const Inventory = require("../models/inventory.model");
const Barcode = require("../models/barcode.model");

dotenv.config({path: path.resolve(__dirname, "../../.env")});

if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    await Product.deleteMany({});
    await Inventory.deleteMany({});
    await Barcode.deleteMany({});

    console.log("🗑️ All collections cleared successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Failed to clear collections:", err);
    process.exit(1);
  });
