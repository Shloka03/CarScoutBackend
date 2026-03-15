const User = require("../models/UserModel")
const Seller = require("../models/SellerModel")
const Listing = require("../models/CarListingModel")

// Get all users
const getAllUsers = async (req,res)=>{
    try{

        const users = await User.find()

        res.status(200).json({
            message:"Users fetched successfully",
            data:users
        })

    }catch(err){
        res.status(500).json({
            message:"Error fetching users",
            err
        })
    }
}

// Block user
const blockUser = async (req,res)=>{
    try{

        const userId = req.params.id

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {accountStatus:"blocked"},
            {new:true}
        )

        res.status(200).json({
            message:"User blocked",
            data:updatedUser
        })

    }catch(err){
        res.status(500).json({
            message:"Error blocking user",
            err
        })
    }
}

// Verify seller
const verifySeller = async (req,res)=>{
    try{

        const sellerId = req.params.id

        const seller = await Seller.findByIdAndUpdate(
            sellerId,
            {verificationStatus:true},
            {new:true}
        )

        res.status(200).json({
            message:"Seller verified",
            data:seller
        })

    }catch(err){
        res.status(500).json({
            message:"Error verifying seller",
            err
        })
    }
}

// Get all listings
const getAllListings = async (req,res)=>{
    try{

        const listings = await Listing.find().populate("carId")

        res.status(200).json({
            message:"Listings fetched",
            data:listings
        })

    }catch(err){
        res.status(500).json({
            message:"Error fetching listings",
            err
        })
    }
}

module.exports = {
    getAllUsers,
    blockUser,
    verifySeller,
    getAllListings
}