const Offer = require("../models/OfferModel")

// Create offer
const createOffer = async(req,res)=>{
    try{
        const existingOffer = await Offer.findOne({
        buyerId:req.body.buyerId,
        carId:req.body.carId,
        offerStatus:"pending"
   })

        if(existingOffer){
        return res.status(400).json({
        message:"Offer already exists"
   })
}

        const offer = await Offer.create(req.body)

        res.status(201).json({
            message:"Offer created successfully",
            data:offer
        })

    }catch(err){
        res.status(500).json({
            message:"Error creating offer",
            err
        })
    }
}

// Get all offers
const getAllOffers = async(req,res)=>{
    try{

        const offers = await Offer.find()
        .populate("buyerId")
        .populate("sellerId")
        .populate("carId")

        res.status(200).json({
            message:"Offers fetched",
            data:offers
        })

    }catch(err){
        res.status(500).json({
            message:"Error fetching offers",
            err
        })
    }
}

// Update offer status
const updateOffer = async(req,res)=>{
    try{

        const offer = await Offer.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )

        res.status(200).json({
            message:"Offer updated",
            data:offer
        })

    }catch(err){
        res.status(500).json({
            message:"Error updating offer",
            err
        })
    }
}

// Delete offer
const deleteOffer = async(req,res)=>{
    try{

        const offer = await Offer.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message:"Offer deleted",
            data:offer
        })

    }catch(err){
        res.status(500).json({
            message:"Error deleting offer",
            err
        })
    }
}

module.exports = {
    createOffer,
    getAllOffers,
    updateOffer,
    deleteOffer
}