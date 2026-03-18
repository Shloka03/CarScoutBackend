const express = require("express")
const router = express.Router()
const reportController = require("../controllers/InspectionReportController")

router.post("/add",reportController.createReport)
router.get("/get",reportController.getAllReports)
router.get("/get/:id",reportController.getReportById)
router.put("/update/:id",reportController.updateReport)
router.delete("/delete/:id",reportController.deleteReport)

module.exports = router