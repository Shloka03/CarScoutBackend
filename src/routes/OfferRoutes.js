const express = require("express")
const router = express.Router()
const offerController = require("../controllers/OfferController")
const validateToken = require("../middleware/AuthMiddleware")

router.post("/add",validateToken,offerController.createOffer)
router.get("/get",validateToken,offerController.getAllOffers)
router.get("/buyer",validateToken,offerController.getBuyerOffers)
router.get("/seller",validateToken,offerController.getSellerOffers)
router.put("/update/:id",validateToken,offerController.updateOffer)
router.delete("/delete/:id",validateToken,offerController.deleteOffer)

module.exports = router