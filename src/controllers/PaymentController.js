const Payment = require("../models/PaymentModel")

// Create Payment
const createPayment = async (req, res) => {
  try {
    const existingPayment = await Payment.findOne({
    transactionId:req.body.transactionId
  })

    if(existingPayment){
     return res.status(400).json({
     message:"Payment already completed"
 })
}

    const newPayment = await Payment.create(req.body)

    res.status(201).json({
      message: "Payment created successfully",
      data: newPayment
    })

  } catch (err) {
    res.status(500).json({
      message: "Error creating payment",
      err
    })
  }
}


// Get All Payments
const getAllPayments = async (req, res) => {
  try {

    const payments = await Payment.find()
      .populate("transactionId")

    res.status(200).json({
      message: "Payments fetched successfully",
      data: payments
    })

  } catch (err) {
    res.status(500).json({
      message: "Error fetching payments",
      err
    })
  }
}


// Get Payment By ID
const getPaymentById = async (req, res) => {
  try {

    const paymentId = req.params.id

    const payment = await Payment.findById(paymentId)
      .populate("transactionId")

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found"
      })
    }

    res.status(200).json({
      message: "Payment fetched successfully",
      data: payment
    })

  } catch (err) {
    res.status(500).json({
      message: "Error fetching payment",
      err
    })
  }
}


// Update Payment
const updatePayment = async (req, res) => {
  try {

    const paymentId = req.params.id

    const updatedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      req.body,
      { new: true }
    )

    res.status(200).json({
      message: "Payment updated successfully",
      data: updatedPayment
    })

  } catch (err) {
    res.status(500).json({
      message: "Error updating payment",
      err
    })
  }
}


// Delete Payment
const deletePayment = async (req, res) => {
  try {

    const paymentId = req.params.id

    const deletedPayment = await Payment.findByIdAndDelete(paymentId)

    res.status(200).json({
      message: "Payment deleted successfully",
      data: deletedPayment
    })

  } catch (err) {
    res.status(500).json({
      message: "Error deleting payment",
      err
    })
  }
}

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment
}