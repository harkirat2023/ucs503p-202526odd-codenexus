// // src/controllers/report.controller.js
// // Reporting and analytics (optional, can expand)
// const Inventory = require("../models/inventory.model");
// const Transaction = require("../models/transaction.model");

// // GET /reports/summary - Inventory summary
// exports.summary = async (req, res) => {
//   try {
//     const totalProducts = await Inventory.countDocuments();
//     const lowStock = await Inventory.find({quantity: {$lt: 10}}).populate(
//       "productId"
//     );
//     res.json({totalProducts, lowStock});
//   } catch (error) {
//     res.status(500).json({msg: error.message});
//   }
// };

const Inventory = require("../models/inventory.model");

exports.summary = async (req, res) => {
  const products = await Inventory.find().populate("productId");
  const lowStock = products.filter((i) => i.quantity < i.threshold);
  res.json({
    totalProducts: products.length,
    lowStock: lowStock.length,
    lowStockList: lowStock,
  });
};
