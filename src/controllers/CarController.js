const Car = require("../models/CarModel")
const Media = require("../models/MediaGalleryModel")


// Add Car
const addCar = async (req, res) => {
  try {
    {/*const existingCar = await Car.findOne({
    sellerId:req.body.sellerId,
    brand:req.body.brand,
    model:req.body.model,
    year:req.body.year
})

  if(existingCar){
   return res.status(400).json({
     message:"Car already exists"
 })
}*/}


console.log("USER:", req.user);
    const newCar = await Car.create({
  ...req.body,
  sellerId: req.user.id
});

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

    const { brand, fuelType, transmission, minPrice, maxPrice, search } = req.query;

let filter = {};

// 🔍 ADVANCED SEARCH
if (search) {
  const words = search.split(" ");

  filter.$and = words.map((word) => ({
    $or: [
      { brand: { $regex: word, $options: "i" } },
      { model: { $regex: word, $options: "i" } }
    ]
  }));
}

// BRAND
if (brand) {
  filter.brand = { $regex: brand, $options: "i" };
}

// FUEL
if (fuelType) {
  filter.fuelType = { $regex: fuelType, $options: "i" };
}

// TRANSMISSION
if (transmission) {
  filter.transmission = { $regex: transmission, $options: "i" };
}

// PRICE
if (minPrice && maxPrice) {
  filter.price = {
    $gte: Number(minPrice),
    $lte: Number(maxPrice),
  };
}

    const cars = await Car.find(filter);

    const media = await Media.find({
  carId: { $in: cars.map(c => c._id) }
});

    const carsWithMedia = cars.map(car => {
      const carMedia = media.filter(
        m => m.carId.toString() === car._id.toString()
      );

      return {
        ...car.toObject(),
        media: carMedia
      };
    });

    res.status(200).json({
      message: "Cars fetched successfully",
      data: carsWithMedia
    });

  } catch (err) {
    res.status(500).json({
      message: "Error fetching cars",
      err
    });
  }
};


// Get Car By ID
const getCarById = async (req, res) => {
  try {

    const carId = req.params.id
    //get car

    const car = await Car.findById(carId)

    if (!car) {
      return res.status(404).json({
        message: "Car not found"
      })
    }
    // Get media for this car
    const media = await Media.find({
  carId: car._id
})

    // Combine car + media
    const carWithMedia = {
      ...car.toObject(),
      media: media
    }
    

    res.status(200).json({
      message: "Car fetched successfully",
      data: carWithMedia
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