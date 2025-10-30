// src/controllers/barcode.controller.js
// Barcode scanning and generation
const Barcode = require("../models/barcode.model");
const Product = require("../models/product.model");

// POST /barcode/scan - Scan barcode and return product info
// Body: { code }
exports.scan = async (req, res) => {
  try {
    const {code} = req.body;
    const barcode = await Barcode.findOne({code}).populate("productId");
    if (!barcode) return res.status(404).json({msg: "Barcode not found"});
    res.json(barcode);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};

// POST /barcode/generate - Create barcode for product
// Body: { code, type, productId }
exports.generate = async (req, res) => {
  try {
    const {code, type, productId} = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({msg: "Product not found"});

    const barcode = await Barcode.create({code, type, productId});
    res.status(201).json(barcode);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};
