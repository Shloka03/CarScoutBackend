const express = require("express")
const router = express.Router()
const listingController = require("../controllers/CarListingController")

router.post("/add", listingController.createListing)
router.get("/get", listingController.getAllListings)
router.get("/get/:id", listingController.getListingById)
router.put("/update/:id", listingController.updateListing)
router.delete("/delete/:id", listingController.deleteListing)

module.exports = router