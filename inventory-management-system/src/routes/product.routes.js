// src/routes/product.routes.js
// Product CRUD routes
const router = require("express").Router();
const controller = require("../controllers/product.controller");
const auth = require("../middlewares/auth.middleware");

// GET /products - List all products (public)
router.get("/", controller.getAll);

// GET /products/:id - Get single product (public)
router.get("/:id", controller.getOne);

// POST /products - Create product (auth required)
router.post("/", auth, controller.create);

// PUT /products/:id - Update product (auth required)
router.put("/:id", auth, controller.update);

// DELETE /products/:id - Delete product (auth required)
router.delete("/:id", auth, controller.remove);

module.exports = router;
