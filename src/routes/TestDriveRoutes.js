const express = require("express")
const router = express.Router()
const testDriveController = require("../controllers/TestDriveController")

const validateToken = require("../middleware/AuthMiddleware")
const allowRoles = require("../middleware/RoleMiddleware");
const authMiddleware = require("../middleware/AuthMiddleware");
router.post("/add",validateToken,allowRoles("user"), testDriveController.createTestDrive)
router.get("/get", testDriveController.getAllTestDrives)
router.get("/seller", validateToken,allowRoles("seller"), testDriveController.getSellerTestDrives);
router.put("/approve/:id", validateToken,allowRoles("seller"), testDriveController.approveTestDrive);
router.put("/reject/:id",validateToken,allowRoles("seller"),testDriveController.rejectTestDrive);
router.get("/user", validateToken, allowRoles("user"), testDriveController.getUserTestDrives);
router.get("/get/:id", testDriveController.getTestDriveById)
router.put("/update/:id", testDriveController.updateTestDrive)
router.delete("/delete/:id", testDriveController.deleteTestDrive)

module.exports = router