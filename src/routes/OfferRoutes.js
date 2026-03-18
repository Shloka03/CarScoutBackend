const express = require("express")
const router = express.Router()
const offerController = require("../controllers/OfferController")

router.post("/add",offerController.createOffer)
router.get("/get",offerController.getAllOffers)
router.put("/update/:id",offerController.updateOffer)
router.delete("/delete/:id",offerController.deleteOffer)

module.exports = router