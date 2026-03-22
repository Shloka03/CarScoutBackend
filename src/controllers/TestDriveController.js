const TestDrive = require("../models/TestDriveModel")

// Book Test Drive
const createTestDrive = async (req, res) => {
  try {

    const { carId, sellerId, testDriveDate, testDriveTime } = req.body;

    if (!sellerId) {
      return res.status(400).json({
        message: "Seller ID required"
      });
    }

    const existingTestDrive = await TestDrive.findOne({
      buyerId: req.user.id,
      carId,
      testDriveDate,
      testDriveTime
    });

    if (existingTestDrive) {
      return res.status(400).json({
        message: "Test drive already requested"
      });
    }

    const newTestDrive = await TestDrive.create({
      buyerId: req.user.id,   // ✅ from token
      carId,
      sellerId,               // ✅ from frontend (userId)
      testDriveDate,
      testDriveTime
    });

    res.status(201).json({
      message: "Test drive scheduled successfully",
      data: newTestDrive
    });

  } catch (err) {
    res.status(500).json({
      message: "Error scheduling test drive",
      err
    });
  }
};

// Get All Test Drives
const getAllTestDrives = async (req, res) => {
  try {

    const testDrives = await TestDrive.find()
      .populate("buyerId")
      .populate("sellerId")
      .populate("carId")

    res.status(200).json({
      message: "Test drives fetched successfully",
      data: testDrives
    })

  } catch (err) {
    res.status(500).json({
      message: "Error fetching test drives",
      err
    })
  }
}


// Get Test Drive By ID
const getTestDriveById = async (req, res) => {
  try {

    const testDriveId = req.params.id

    const testDrive = await TestDrive.findById(testDriveId)
      .populate("buyerId")
      .populate("sellerId")
      .populate("carId")

    if (!testDrive) {
      return res.status(404).json({
        message: "Test drive not found"
      })
    }

    res.status(200).json({
      message: "Test drive fetched successfully",
      data: testDrive
    })

  } catch (err) {
    res.status(500).json({
      message: "Error fetching test drive",
      err
    })
  }
}


// Update Test Drive Status
const updateTestDrive = async (req, res) => {
  try {

    const testDriveId = req.params.id

    const updatedTestDrive = await TestDrive.findByIdAndUpdate(
      testDriveId,
      req.body,
      { new: true }
    )

    res.status(200).json({
      message: "Test drive updated successfully",
      data: updatedTestDrive
    })

  } catch (err) {
    res.status(500).json({
      message: "Error updating test drive",
      err
    })
  }
}


// Delete Test Drive
const deleteTestDrive = async (req, res) => {
  try {

    const testDriveId = req.params.id

    const deletedTestDrive = await TestDrive.findByIdAndDelete(testDriveId)

    res.status(200).json({
      message: "Test drive deleted successfully",
      data: deletedTestDrive
    })

  } catch (err) {
    res.status(500).json({
      message: "Error deleting test drive",
      err
    })
  }
}


module.exports = {
  createTestDrive,
  getAllTestDrives,
  getTestDriveById,
  updateTestDrive,
  deleteTestDrive
}