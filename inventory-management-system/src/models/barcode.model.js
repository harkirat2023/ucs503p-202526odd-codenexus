// src/models/barcode.model.js
// Barcode Schema: code (unique barcode string), type (QR/Code128/etc), linked productId
const mongoose = require("mongoose");

const barcodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["QR", "Code128", "EAN", "UPC", "Code39"],
      default: "Code128",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("Barcode", barcodeSchema);
