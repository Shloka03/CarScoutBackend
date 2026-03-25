const Listing = require("../models/CarListingModel")
const Media = require("../models/MediaGalleryModel")


// Create Listing
const createListing = async (req, res) => {
  try {
    const existingListing = await Listing.findOne({
    carId:req.body.carId,
    status:"active"
 })

  if(existingListing){
    return res.status(400).json({
    message:"Car is already listed"
 })
}

    //const newListing = await Listing.create(req.body)
    const newListing = await Listing.create({
  ...req.body,
  sellerId: req.user.id
});

    res.status(201).json({
      message: "Car listing created successfully",
      data: newListing
    })

  } catch (err) {
    res.status(500).json({
      message: "Error creating listing",
      err
    })
  }
}


// Get All Listings
const getAllListings = async (req, res) => {
  try {

    const listings = await Listing.find()
      .populate("carId")
      .populate("sellerId");

    const carIds = listings.map(l => l.carId._id);

    const media = await Media.find({
      carId: { $in: carIds }
    });

    const listingsWithMedia = listings.map(listing => {
      const carMedia = media.filter(
        m => m.carId.toString() === listing.carId._id.toString()
      );

      return {
        ...listing.toObject(),
        carId: {
          ...listing.carId.toObject(),
          media: carMedia
        }
      };
    });

    res.status(200).json({
      message: "Listings fetched successfully",
      data: listingsWithMedia
    });

  } catch (err) {
    res.status(500).json({
      message: "Error fetching listings",
      err
    });
  }
};
//mylistings
const getMyListings = async (req, res) => {
  try {

    // 🔥 STEP 1: get listings
    const listings = await Listing.find({
      sellerId: req.user.id
    })
      .populate("carId")
      .populate("sellerId");

    // 🔥 STEP 2: get all car IDs
    const carIds = listings.map(l => l.carId._id);

    // 🔥 STEP 3: fetch media
    const media = await Media.find({
      carId: { $in: carIds }
    });

    // 🔥 STEP 4: attach media to each car
    const listingsWithMedia = listings.map(listing => {
      const carMedia = media.filter(
        m => m.carId.toString() === listing.carId._id.toString()
      );

      return {
        ...listing.toObject(),
        carId: {
          ...listing.carId.toObject(),
          media: carMedia
        }
      };
    });

    res.status(200).json({
      message: "My listings fetched successfully",
      data: listingsWithMedia
    });

  } catch (err) {
    res.status(500).json({
      message: "Error fetching my listings",
      err
    });
  }
};

// Get Listing By ID
const getListingById = async (req, res) => {
  try {

    const listingId = req.params.id

    const listing = await Listing.findById(listingId)
      .populate("carId")
      .populate("sellerId")

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found"
      })
    }

    res.status(200).json({
      message: "Listing fetched successfully",
      data: listing
    })

  } catch (err) {
    res.status(500).json({
      message: "Error fetching listing",
      err
    })
  }
}


// Update Listing Status
const updateListing = async (req, res) => {
  try {

    const listingId = req.params.id

    const updatedListing = await Listing.findByIdAndUpdate(
      listingId,
      req.body,
      { new: true }
    )

    res.status(200).json({
      message: "Listing updated successfully",
      data: updatedListing
    })

  } catch (err) {
    res.status(500).json({
      message: "Error updating listing",
      err
    })
  }
}


// Delete Listing
const deleteListing = async (req, res) => {
  try {

    const listingId = req.params.id

    const deletedListing = await Listing.findByIdAndDelete(listingId)

    res.status(200).json({
      message: "Listing deleted successfully",
      data: deletedListing
    })

  } catch (err) {
    res.status(500).json({
      message: "Error deleting listing",
      err
    })
  }
}


module.exports = {
  createListing,
  getAllListings,
  getMyListings,
  getListingById,
  updateListing,
  deleteListing
}