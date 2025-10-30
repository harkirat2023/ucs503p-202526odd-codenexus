// src/services/product.service.js
// Business logic for products (can extend)
const Product = require("../models/product.model");

exports.findByBarcode = async (barcode) => {
  return await Product.findOne({barcode});
};
