const express = require("express")
const router = express.Router()
const listingController = require("../controllers/CarListingController")
const authMiddleware = require("../middleware/AuthMiddleware")

router.post("/add",authMiddleware, listingController.createListing)
router.get("/get", listingController.getAllListings)
router.get("/my",authMiddleware,listingController.getMyListings)
router.get("/get/:id", listingController.getListingById)
router.put("/update/:id", listingController.updateListing)
router.delete("/delete/:id", listingController.deleteListing)

module.exports = router