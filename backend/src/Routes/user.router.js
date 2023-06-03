const express = require('express');
const router = express.Router();
const userController = require("../Controllers/user.controller")

router.get("/getUser", userController.getUser);
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;