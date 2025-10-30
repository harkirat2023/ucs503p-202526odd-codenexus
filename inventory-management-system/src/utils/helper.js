// src/utils/helper.js
// Helper utility functions
exports.generateRandomString = (length = 8) => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2)
    .toUpperCase();
};
