const express = require("express")
const router = express.Router()
const feedbackController = require("../controllers/FeedbackController")

router.post("/add",feedbackController.addFeedback)
router.get("/get",feedbackController.getAllFeedback)
router.delete("/delete/:id",feedbackController.deleteFeedback)

module.exports = router