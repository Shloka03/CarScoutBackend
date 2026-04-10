const Offer = require("../models/OfferModel")
const Media = require("../models/MediaGalleryModel")

// Create offer
const createOffer = async (req, res) => {
  try {
    const { carId, offeredPrice } = req.body;

    // ✅ buyer from token
    const buyerId = req.user.id;

    // ✅ get seller from listing OR car (IMPORTANT)
    const Listing = require("../models/CarListingModel");

    const listing = await Listing.findOne({ carId });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found"
      });
    }

    const sellerId = listing.sellerId; // ✅ seller = userId

    // 🔁 prevent duplicate
    const existingOffer = await Offer.findOne({
      buyerId,
      carId,
      offerStatus: "pending"
    });

    if (existingOffer) {
      return res.status(400).json({
        message: "Offer already exists"
      });
    }

    const offer = await Offer.create({
      buyerId,
      sellerId,
      carId,
      offeredPrice
    });

    res.status(201).json({
      message: "Offer created successfully",
      data: offer
    });

  } catch (err) {
    console.log("CREATE OFFER ERROR:", err);
    res.status(500).json({
      message: "Error creating offer"
    });
  }
};

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
//buyer offer
const getBuyerOffers = async (req, res) => {
  try {

    const offers = await Offer.find({
      buyerId: req.user.id
    })
      .populate("carId")
      .populate("sellerId","fullName email");

    // 🔥 GET MEDIA
    const carIds = offers.map(o => o.carId?._id);

    const media = await Media.find({
      carId: { $in: carIds }
    });

    // 🔥 ATTACH MEDIA
    const finalData = offers.map(offer => {
      const carMedia = media.filter(
        m => m.carId.toString() === offer.carId._id.toString()
      );

      return {
        ...offer.toObject(),
        carId: {
          ...offer.carId.toObject(),
          media: carMedia
        }
      };
    });

    res.status(200).json({
      message: "Buyer offers fetched",
      data: finalData
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching buyer offers"
    });
  }
};
//seller offer
const getSellerOffers = async (req, res) => {
  try {

    const offers = await Offer.find({
      sellerId: req.user.id   // ✅ THIS IS YOUR SYSTEM
    })
      .populate("carId")
      .populate("buyerId", "fullName email");
      // 🔥 GET MEDIA
    const carIds = offers.map(o => o.carId?._id);

    const media = await Media.find({
      carId: { $in: carIds }
    });

    // 🔥 ATTACH MEDIA
    const finalData = offers.map(offer => {
      const carMedia = media.filter(
        m => m.carId.toString() === offer.carId._id.toString()
      );

      return {
        ...offer.toObject(),
        carId: {
          ...offer.carId.toObject(),
          media: carMedia
        }
      };
    });

    res.status(200).json({
      message: "Seller offers fetched",
      data: finalData
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching Seller offers"
    });
  }
};

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
    getBuyerOffers,
    getSellerOffers,
    updateOffer,
    deleteOffer
}