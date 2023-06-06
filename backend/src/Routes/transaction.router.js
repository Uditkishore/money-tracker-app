const express = require('express');
const router = express.Router();
const transactionController = require("../Controllers/transaction.controller");

router.get('/getTransaction', transactionController.getTransaction);
router.put("/addBalance", transactionController.addBalance);
router.get("/getBalance", transactionController.getBalance);
router.get('/amountSpent', transactionController.amountSpent);
router.post('/createTransaction', transactionController.createTransaction);
router.put('/updateTransaction/:id', transactionController.updateTransaction);
router.delete('/deleteTransaction/:id', transactionController.deleteTransaction);

module.exports = router;
