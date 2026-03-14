const Car = require("../models/CarModel")

// Add Car
const addCar = async (req, res) => {
  try {

    const newCar = await Car.create(req.body)

    res.status(201).json({
      message: "Car added successfully",
      data: newCar
    })

  } catch (err) {
    res.status(500).json({
      message: "Error while adding car",
      err
    })
  }
}


// Get All Cars
const getAllCars = async (req, res) => {
  try {

    const cars = await Car.find().populate("sellerId")

    res.status(200).json({
      message: "Cars fetched successfully",
      data: cars
    })

  } catch (err) {
    res.status(500).json({
      message: "Error fetching cars",
      err
    })
  }
}


// Get Car By ID
const getCarById = async (req, res) => {
  try {

    const carId = req.params.id

    const car = await Car.findById(carId).populate("sellerId")

    if (!car) {
      return res.status(404).json({
        message: "Car not found"
      })
    }

    res.status(200).json({
      message: "Car fetched successfully",
      data: car
    })

  } catch (err) {
    res.status(500).json({
      message: "Error fetching car",
      err
    })
  }
}


// Update Car
const updateCar = async (req, res) => {
  try {

    const carId = req.params.id

    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      req.body,
      { new: true }
    )

    res.status(200).json({
      message: "Car updated successfully",
      data: updatedCar
    })

  } catch (err) {
    res.status(500).json({
      message: "Error updating car",
      err
    })
  }
}


// Delete Car
const deleteCar = async (req, res) => {
  try {

    const carId = req.params.id

    const deletedCar = await Car.findByIdAndDelete(carId)

    res.status(200).json({
      message: "Car deleted successfully",
      data: deletedCar
    })

  } catch (err) {
    res.status(500).json({
      message: "Error deleting car",
      err
    })
  }
}


module.exports = {
  addCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar
}