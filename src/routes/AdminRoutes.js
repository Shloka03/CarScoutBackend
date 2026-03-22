const express = require("express")
const router = express.Router()
const adminController = require("../controllers/AdminController")
const validateToken = require("../middleware/AuthMiddleware")
const allowRoles = require("../middleware/RoleMiddleware")


router.get("/users",validateToken,allowRoles("admin"),adminController.getAllUsers)
router.put("/block/:id",validateToken,allowRoles("admin"),adminController.blockUser)
router.put("/verify-seller/:id",adminController.verifySeller)
router.get("/listings",adminController.getAllListings)

module.exports = router