const express = require("express")
const router = express.Router()
const carController = require("../controllers/CarController")

router.post("/addcar", carController.addCar)
router.get("/getcar", carController.getAllCars)
router.get("/getcar/:id", carController.getCarById)
router.put("/update/:id", carController.updateCar)
router.delete("/delete/:id", carController.deleteCar)

module.exports = router