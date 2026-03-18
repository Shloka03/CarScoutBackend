const Transaction = require("../models/TransactionModel")

// Create Transaction
const createTransaction = async (req, res) => {
  try {
    const existingTransaction = await Transaction.findOne({
    carId:req.body.carId
  })

    if(existingTransaction){
      return res.status(400).json({
      message:"Transaction already exists for this car"
 })
}

    const newTransaction = await Transaction.create(req.body)

    res.status(201).json({
      message: "Transaction created successfully",
      data: newTransaction
    })

  } catch (err) {
    res.status(500).json({
      message: "Error creating transaction",
      err
    })
  }
}


// Get All Transactions
const getAllTransactions = async (req, res) => {
  try {

    const transactions = await Transaction.find()
      .populate("buyerId")
      .populate("sellerId")
      .populate("carId")

    res.status(200).json({
      message: "Transactions fetched successfully",
      data: transactions
    })

  } catch(err){
  res.status(500).json({
    message:"Error fetching transactions",
    err: err.message
  })
}
}


// Get Transaction By ID
const getTransactionById = async (req, res) => {
  try {

    const transactionId = req.params.id

    const transaction = await Transaction.findById(transactionId)
      .populate("buyerId")
      .populate("sellerId")
      .populate("carId")

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      })
    }

    res.status(200).json({
      message: "Transaction fetched successfully",
      data: transaction
    })

  } catch (err) {
    res.status(500).json({
      message: "Error fetching transaction",
      err
    })
  }
}


// Update Transaction
const updateTransaction = async (req, res) => {
  try {

    const transactionId = req.params.id

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      req.body,
      { new: true }
    )

    res.status(200).json({
      message: "Transaction updated successfully",
      data: updatedTransaction
    })

  } catch (err) {
    res.status(500).json({
      message: "Error updating transaction",
      err
    })
  }
}


// Delete Transaction
const deleteTransaction = async (req, res) => {
  try {

    const transactionId = req.params.id

    const deletedTransaction = await Transaction.findByIdAndDelete(transactionId)

    res.status(200).json({
      message: "Transaction deleted successfully",
      data: deletedTransaction
    })

  } catch (err) {
    res.status(500).json({
      message: "Error deleting transaction",
      err
    })
  }
}


module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction
}