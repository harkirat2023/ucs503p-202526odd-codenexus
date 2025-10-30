// src/services/barcode.service.js
// Business logic for barcodes
const Barcode = require("../models/barcode.model");

exports.findByCode = async (code) => {
  return await Barcode.findOne({code}).populate("productId");
};
