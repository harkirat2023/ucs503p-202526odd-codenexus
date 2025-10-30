// src/utils/logger.js
// Simple console logger (can integrate Winston for production)
module.exports = {
  info: (msg) => console.log(`ℹ️ ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`),
  warn: (msg) => console.warn(`⚠️ ${msg}`),
};
