// src/routes/inventory.routes.js
// Inventory management routes
const router = require("express").Router();
const controller = require("../controllers/inventory.controller");
const auth = require("../middlewares/auth.middleware");
const inventoryController = require("../controllers/inventory.controller"); 

// GET /inventory - List all inventory records
router.get("/", controller.getAll);

// POST /inventory/update - Adjust stock (auth required)
router.post("/update", auth, controller.updateStock);
router.post("/set-threshold", auth, inventoryController.setThreshold);


module.exports = router;
