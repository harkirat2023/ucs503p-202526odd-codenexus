// src/services/inventory.service.js
// Business logic for inventory
const Inventory = require("../models/inventory.model");

exports.getLowStockItems = async (threshold = 10) => {
  return await Inventory.find({quantity: {$lt: threshold}}).populate(
    "productId"
  );
};
