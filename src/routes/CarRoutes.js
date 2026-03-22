const express = require("express")
const router = express.Router()
const carController = require("../controllers/CarController")
const allowRoles = require("../middleware/RoleMiddleware");

const testMiddleware = require("../middleware/TestMiddleware")
const validateToken = require("../middleware/AuthMiddleware")
router.post("/add",validateToken,allowRoles("seller"),carController.addCar)
router.get("/get",carController.getAllCars)

router.get("/get/:id", carController.getCarById)
router.put("/update/:id", carController.updateCar)
router.delete("/delete/:id", carController.deleteCar)

module.exports = router