const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/order.controller");

// Create a new order
router.post("/", auth, controller.createOrder);

// List all orders
router.get("/", auth, controller.listOrders);

module.exports = router;
