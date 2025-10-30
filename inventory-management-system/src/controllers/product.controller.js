// src/controllers/product.controller.js
// Product CRUD operations
const Product = require("../models/product.model");

// GET /products - List all products
exports.getAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};

// GET /products/:id - Get single product
exports.getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({msg: "Product not found"});
    res.json(product);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};

// POST /products - Create new product
// Body: { name, category, unitPrice, barcode }
exports.create = async (req, res) => {
  try {
    const {name, category, unitPrice, barcode} = req.body;
    const product = await Product.create({name, category, unitPrice, barcode});
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};

// PUT /products/:id - Update product
exports.update = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({msg: "Product not found"});
    res.json(product);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};

// DELETE /products/:id - Delete product
exports.remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({msg: "Product not found"});
    res.status(204).end();
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};
