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



// 🔥 GET SELLER TEST DRIVES
const getSellerTestDrives = async (req, res) => {
  try {

    const sellerId = req.user.id;

    const testDrives = await TestDrive.find({ sellerId })
      .populate("carId")
      .populate("buyerId");

    res.status(200).json({
      message: "Seller test drives fetched",
      data: testDrives
    });

  } catch (err) {
    res.status(500).json({
      message: "Error fetching test drives",
      err
    });
  }
};

// 🔥 APPROVE TEST DRIVE
{/*const approveTestDrive = async (req, res) => {
  try {

    const testDrive = await TestDrive.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    res.status(200).json({
      message: "Test drive approved",
      data: testDrive
    });

  } catch (err) {
    res.status(500).json({
      message: "Error approving test drive",
      err
    });
  }
};*/}

const approveTestDrive = async (req, res) => {
  try {

    const testDrive = await TestDrive.findById(req.params.id);

    // 🔥 SECURITY CHECK
    if (testDrive.sellerId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    testDrive.status = "approved";
    await testDrive.save();

    res.status(200).json({
      message: "Test drive approved",
      data: testDrive
    });

  } catch (err) {
    res.status(500).json({
      message: "Error approving test drive",
      err
    });
  }
};

// 🔥 REJECT TEST DRIVE
{/*const rejectTestDrive = async (req, res) => {
  try {

    const testDrive = await TestDrive.findById(req.params.id);

    // 🔐 SECURITY CHECK
    if (testDrive.sellerId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    testDrive.status = "rejected";
    await testDrive.save();

    res.status(200).json({
      message: "Test drive rejected",
      data: testDrive
    });

  } catch (err) {
    res.status(500).json({
      message: "Error rejecting test drive",
      err
    });
  }
};*/}

const rejectTestDrive = async (req, res) => {
  try {

    
    const testDrive = await TestDrive.findById(req.params.id);

    // ✅ FIX 1: check if exists
    if (!testDrive) {
      return res.status(404).json({
        message: "Test drive not found"
      });
      
    }

    // ✅ FIX 2: proper string comparison
    if (testDrive.sellerId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "Not authorized"
        
      });
      
    }

    testDrive.status = "rejected";
    //console.log("REQ USER:", req.user.id);
//console.log("TEST DRIVE SELLER:", testDrive?.sellerId);
    await testDrive.save();

    res.status(200).json({
      message: "Test drive rejected",
      data: testDrive
    });

  } catch (err) {
    console.log("Reject Error:", err); // 🔥 ADD THIS
    res.status(500).json({
      message: "Error rejecting test drive",
      err
    });
  }
  
};

// 🔥 GET USER TEST DRIVES
const getUserTestDrives = async (req, res) => {
  try {

    const testDrives = await TestDrive.find({
      buyerId: req.user.id
    })
      .populate("carId")
      .populate("sellerId");

    res.status(200).json({
      message: "User test drives fetched",
      data: testDrives
    });

  } catch (err) {
    res.status(500).json({
      message: "Error fetching user test drives",
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
  getSellerTestDrives,
  approveTestDrive,
  rejectTestDrive,
  getUserTestDrives,
  getTestDriveById,
  updateTestDrive,
  deleteTestDrive
}