const express = require("express")
const router = express.Router()
const paymentController = require("../controllers/PaymentController")

router.post("/add", paymentController.createPayment)
router.get("/get", paymentController.getAllPayments)
router.get("/get/:id", paymentController.getPaymentById)
router.put("/update/:id", paymentController.updatePayment)
router.delete("/delete/:id", paymentController.deletePayment)

module.exports = router