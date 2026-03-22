const express = require("express")
const router = express.Router()
const testDriveController = require("../controllers/TestDriveController")

const validateToken = require("../middleware/AuthMiddleware")
const allowRoles = require("../middleware/RoleMiddleware");

router.post("/add",validateToken,allowRoles("user"), testDriveController.createTestDrive)
router.get("/get", testDriveController.getAllTestDrives)
router.get("/get/:id", testDriveController.getTestDriveById)
router.put("/update/:id", testDriveController.updateTestDrive)
router.delete("/delete/:id", testDriveController.deleteTestDrive)

module.exports = router