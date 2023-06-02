const express = require('express');
const router = express.Router();
const brandController = require("../Controllers/brand.controller")

router.get("/getBrand", brandController.getBrand);
router.post("/createBrand", brandController.getBrand);

module.exports = router;
