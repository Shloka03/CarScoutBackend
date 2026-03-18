const express = require("express")
const router = express.Router()
const mediaController = require("../controllers/MediaGalleryController")
const upload = require("../middleware/UploadMiddleware")
router.post("/add",upload.single("media"),mediaController.addMedia)
router.get("/get",mediaController.getAllMedia)
router.put("/update/:id",mediaController.updateMedia)
router.delete("/delete/:id",mediaController.deleteMedia)


module.exports = router