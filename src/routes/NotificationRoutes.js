const express = require("express")
const router = express.Router()
const notificationController = require("../controllers/NotificationController")

router.post("/add",notificationController.createNotification)
router.get("/get",notificationController.getAllNotifications)
router.put("/read/:id",notificationController.markAsRead)

module.exports = router