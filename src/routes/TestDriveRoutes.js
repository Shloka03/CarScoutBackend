const express = require("express")
const router = express.Router()
const testDriveController = require("../controllers/TestDriveController")

router.post("/add", testDriveController.createTestDrive)
router.get("/get", testDriveController.getAllTestDrives)
router.get("/get/:id", testDriveController.getTestDriveById)
router.put("/update/:id", testDriveController.updateTestDrive)
router.delete("/delete/:id", testDriveController.deleteTestDrive)

module.exports = router