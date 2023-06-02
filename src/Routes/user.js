const express = require('express');
const router = express.Router();
const userController = require("../Controllers/user.controller")

router.get("/getUser", userController.getUser);
router.post("/createUsers", userController.createUsers);

module.exports = router;