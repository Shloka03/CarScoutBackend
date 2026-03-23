const router = require("express").Router()
const userController = require("../controllers/UserController")
const { getProfile} = require("../controllers/UserController");
const validateToken = require("../middleware/AuthMiddleware");
router.post("/register",userController.registerUser)
router.post("/login",userController.loginUser)
router.get("/profile",validateToken,getProfile)

module.exports = router