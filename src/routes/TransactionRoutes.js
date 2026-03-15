const express = require("express")
const router = express.Router()
const transactionController = require("../controllers/TransactionController")

router.post("/add", transactionController.createTransaction)
router.get("/get", transactionController.getAllTransactions)
router.get("/get/:id", transactionController.getTransactionById)
router.put("/update/:id", transactionController.updateTransaction)
router.delete("/delete/:id", transactionController.deleteTransaction)

module.exports = router