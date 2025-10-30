// // const Order = require("../models/order.model");
// // const Inventory = require("../models/inventory.model");
// // const Product = require("../models/product.model");

// // exports.createOrder = async (req, res) => {
// //   try {
// //     const {items} = req.body;
// //     const userId = req.user.id;
// //     let total = 0;
// //     // Build products lookup to reduce DB calls
// //     const productIds = items.map((i) => i.productId);
// //     const products = await Product.find({_id: {$in: productIds}});
// //     const productsMap = Object.fromEntries(
// //       products.map((p) => [p._id.toString(), p])
// //     );

// //     // Check & update inventory
// //     for (const item of items) {
// //       const {productId, quantity} = item;
// //       const prod = productsMap[productId];
// //       if (!prod)
// //         return res.status(404).json({msg: `Product not found: ${productId}`});
// //       total += prod.unitPrice * quantity;

// //       const inventory = await Inventory.findOne({productId});
// //       if (!inventory || inventory.quantity < quantity) {
// //         return res
// //           .status(400)
// //           .json({msg: `Insufficient stock for ${prod.name}`});
// //       }
// //       inventory.quantity -= quantity;
// //       await inventory.save();
// //     }

// //     // Create order
// //     const order = await Order.create({items, total, createdBy: userId});
// //     res.status(201).json(order);
// //   } catch (err) {
// //     res.status(500).json({msg: err.message || "Order creation failed"});
// //   }
// // };

// // exports.listOrders = async (req, res) => {
// //   const orders = await Order.find()
// //     .populate("items.productId")
// //     .populate("createdBy");
// //   res.json(orders);
// // };

// const Order = require("../models/order.model");
// const Inventory = require("../models/inventory.model");
// const Product = require("../models/product.model");

// exports.createOrder = async (req, res) => {
//   try {
//     const {items} = req.body; // [{ productId, quantity }]
//     const userId = req.user.id;
//     let total = 0;

//     // Get all relevant products and inventories in advance for efficiency:
//     const productIds = items.map((i) => i.productId);
//     const products = await Product.find({_id: {$in: productIds}});
//     const inventories = await Inventory.find({productId: {$in: productIds}});

//     // Map for quick access
//     const idToProduct = Object.fromEntries(
//       products.map((p) => [p._id.toString(), p])
//     );
//     const idToInv = Object.fromEntries(
//       inventories.map((i) => [i.productId.toString(), i])
//     );

//     // Check & Deduct Inventory, Build Total
//     for (const {productId, quantity} of items) {
//       const prod = idToProduct[productId];
//       const inv = idToInv[productId];
//       if (!prod || !inv) {
//         return res
//           .status(404)
//           .json({
//             msg: `Product or inventory missing for productId: ${productId}`,
//           });
//       }
//       if (inv.quantity < quantity) {
//         return res
//           .status(400)
//           .json({msg: `Insufficient stock for ${prod.name}`});
//       }
//       inv.quantity -= quantity;
//       total += prod.unitPrice * quantity;
//     }
//     // Save all updated inventories
//     await Promise.all(Object.values(idToInv).map((i) => i.save()));

//     // Create order
//     const order = await Order.create({items, total, createdBy: userId});
//     res.status(201).json(order);
//   } catch (error) {
//     res.status(500).json({msg: error.message || "Order creation failed"});
//   }
//   exports.listOrders = async (req, res) => {
//     try {
//       const orders = await Order.find().populate("items.productId"); // optional populate
//       res.status(200).json(orders);
//     } catch (error) {
//       res.status(500).json({msg: error.message || "Failed to fetch orders"});
//     }
//   };

// };


const Order = require("../models/order.model");
const Inventory = require("../models/inventory.model");
const Product = require("../models/product.model");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const {items} = req.body; // [{ productId, quantity }]
    const userId = req.user.id;
    let total = 0;

    if (!items || !items.length) {
      return res.status(400).json({msg: "No items provided"});
    }

    // Get all relevant products and inventories in advance
    const productIds = items.map((i) => i.productId);
    const products = await Product.find({_id: {$in: productIds}});
    const inventories = await Inventory.find({productId: {$in: productIds}});

    // Map for quick access
    const idToProduct = Object.fromEntries(
      products.map((p) => [p._id.toString(), p])
    );
    const idToInventory = Object.fromEntries(
      inventories.map((i) => [i.productId.toString(), i])
    );

    // Check inventory and calculate total
    for (const {productId, quantity} of items) {
      const product = idToProduct[productId];
      const inventory = idToInventory[productId];

      if (!product || !inventory) {
        return res
          .status(404)
          .json({
            msg: `Product or inventory missing for productId: ${productId}`,
          });
      }

      if (inventory.quantity < quantity) {
        return res
          .status(400)
          .json({msg: `Insufficient stock for ${product.name}`});
      }

      inventory.quantity -= quantity;
      total += product.unitPrice * quantity;
    }

    // Save updated inventories
    await Promise.all(Object.values(idToInventory).map((inv) => inv.save()));

    // Create the order
    const order = await Order.create({items, total, createdBy: userId});
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({msg: error.message || "Order creation failed"});
  }
};

// List all orders
exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.productId") // optional: populate product details
      .populate("createdBy", "name email"); // optional: populate user info

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({msg: error.message || "Failed to fetch orders"});
  }
};
