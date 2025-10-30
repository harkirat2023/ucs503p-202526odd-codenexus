// src/models/inventory.model.js
// Inventory Schema: productId, quantity, location/warehouse
const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    location: {
      type: String,
      default: "Main Warehouse",
    },
    threshold: {
      type: Number,
      default: 10,
      min: 0},
  },
  {timestamps: true}
);


module.exports = mongoose.model("Inventory", inventorySchema);
