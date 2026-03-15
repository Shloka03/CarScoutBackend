const express = require("express")
const router = express.Router()
const mediaController = require("../controllers/MediaGalleryController")

router.post("/add",mediaController.addMedia)
router.get("/get",mediaController.getAllMedia)
router.delete("/delete/:id",mediaController.deleteMedia)


module.exports = router