// // src/controllers/inventory.controller.js
// // Inventory management operations
// const Inventory = require("../models/inventory.model");
// const Product = require("../models/product.model");
// const Transaction = require("../models/transaction.model");

// // GET /inventory - List all inventory with product details
// exports.getAll = async (req, res) => {
//   try {
//     const inventory = await Inventory.find().populate("productId");
//     res.json(inventory);
//   } catch (error) {
//     res.status(500).json({msg: error.message});
//   }
// };

// // POST /inventory/update - Update stock quantity
// // Body: { productId, quantity (positive=add, negative=remove), reason }
// exports.updateStock = async (req, res) => {
//   try {
//     const {productId, quantity, reason} = req.body;

//     // Find or create inventory record
//     let inventory = await Inventory.findOne({productId});
//     if (!inventory) {
//       inventory = await Inventory.create({productId, quantity: 0,});
//     }

//     // Update quantity
//     inventory.quantity += quantity;
//     if (inventory.quantity < 0) {
//       return res.status(400).json({msg: "Insufficient stock"});
//     }
//     await inventory.save();

//     // Log transaction
//     await Transaction.create({
//       productId,
//       userId: req.user.id,
//       type: quantity > 0 ? "IN" : "OUT",
//       quantity: Math.abs(quantity),
//       reason,
//     });

//     res.json(inventory);
//   } catch (error) {
//     res.status(500).json({msg: error.message});
//   }
// };

const Inventory = require("../models/inventory.model");
const Product = require("../models/product.model");

exports.getAll = async (req, res) => {
  const inventory = await Inventory.find().populate("productId");
  res.json(inventory);
};

exports.updateStock = async (req, res) => {
  const {productId, quantity, reason, threshold} = req.body;
  let inv = await Inventory.findOne({productId});
  if (!inv) {
    // New inventory record if absent
    inv = await Inventory.create({
      productId,
      quantity,
      threshold: threshold || 10,
    });
  } else {
    // Add to quantity, don't just set it
    inv.quantity += quantity;
    if (threshold !== undefined) inv.threshold = threshold;
    await inv.save();
  }
  res.json(inv);
};


exports.setThreshold = async (req, res) => {
  const {productId, threshold} = req.body;
  let inv = await Inventory.findOne({productId});
  if (!inv) return res.status(404).json({msg: "Inventory not found"});
  inv.threshold = threshold;
  await inv.save();
  res.json(inv);
};
