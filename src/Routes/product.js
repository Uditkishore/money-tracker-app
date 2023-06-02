const express = require('express');
const router = express.Router();
const productController = require("../Controllers/product.controller")

router.get("/getProduct", productController.getProduct);
router.post("/createProduct", productController.getProduct);

module.exports = router;
