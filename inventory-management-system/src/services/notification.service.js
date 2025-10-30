// // src/services/notification.service.js
// // Notification logic (email/SMS) - stub for now
// exports.sendLowStockAlert = async (productName) => {
//   // TODO: Integrate with email service (Nodemailer, SendGrid, etc)
//   console.log(`⚠️ Low stock alert for: ${productName}`);
//   return true;
// };

exports.sendLowStockAlert = async (productName) => {
  console.log(`ALERT: Low stock for ${productName}`);
  // Integrate with nodemailer, sms api if required
};
