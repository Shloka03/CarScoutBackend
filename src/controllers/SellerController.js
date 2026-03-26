const Seller = require("../models/SellerModel");

// 🔥 GET ALL SELLERS
const getAllSellers = async (req, res) => {
  try {

    const sellers = await Seller.find()
      .populate("userId"); // 🔥 IMPORTANT

    res.status(200).json({
      message: "Sellers fetched",
      data: sellers
    });

  } catch (err) {
    res.status(500).json({
      message: "Error fetching sellers",
      err
    });
  }
};

// 🔥 TOGGLE VERIFICATION
const toggleVerification = async (req, res) => {
  try {

    const seller = await Seller.findById(req.params.id);

    if (!seller) {
      return res.status(404).json({
        message: "Seller not found"
      });
    }

    // 🔥 TOGGLE TRUE ↔ FALSE
    seller.verificationStatus = !seller.verificationStatus;

    await seller.save();

    res.status(200).json({
      message: "Verification updated",
      data: seller
    });

  } catch (err) {
    res.status(500).json({
      message: "Error updating verification",
      err
    });
  }
};

module.exports = {
  getAllSellers,
  toggleVerification
};