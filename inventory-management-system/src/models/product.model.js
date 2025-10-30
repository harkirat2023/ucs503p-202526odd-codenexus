// src/models/product.model.js
// Product Schema: name, category, unitPrice, barcode
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    barcode: {
      type: String,
      unique: true,
      sparse: true, // Allows null values but enforces uniqueness when present
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);
