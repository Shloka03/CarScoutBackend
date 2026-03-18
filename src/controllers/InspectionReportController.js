const InspectionReport = require("../models/InspectionReportModel")

// Create report
const createReport = async(req,res)=>{
    try{
        const existingReport = await InspectionReport.findOne({
        carId:req.body.carId
    })

        if(existingReport){
        return res.status(400).json({
        message:"Inspection report already exists"
    })
}

        const report = await InspectionReport.create(req.body)

        res.status(201).json({
            message:"Inspection report created",
            data:report
        })

    }catch(err){
        res.status(500).json({
            message:"Error creating report",
            err
        })
    }
}

// Get all reports
const getAllReports = async(req,res)=>{
    try{

        const reports = await InspectionReport.find().populate("carId")

        res.status(200).json({
            message:"Reports fetched",
            data:reports
        })

    }catch(err){
        res.status(500).json({
            message:"Error fetching reports",
            err
        })
    }
}

// Get report by id
const getReportById = async(req,res)=>{
    try{

        const report = await InspectionReport.findById(req.params.id)

        res.status(200).json({
            message:"Report fetched",
            data:report
        })

    }catch(err){
        res.status(500).json({
            message:"Error fetching report",
            err
        })
    }
}

const updateReport = async (req, res) => {
  try {

    const reportId = req.params.id

    const updatedReport = await InspectionReport.findByIdAndUpdate(
      reportId,
      req.body,
      { new: true }
    )

    res.status(200).json({
      message: "Inspection report updated successfully",
      data: updatedReport
    })

  } catch (err) {
    res.status(500).json({
      message: "Error updating inspection report",
      err
    })
  }
}

// Delete report
const deleteReport = async(req,res)=>{
    try{

        const report = await InspectionReport.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message:"Report deleted",
            data:report
        })

    }catch(err){
        res.status(500).json({
            message:"Error deleting report",
            err
        })
    }
}

module.exports = {
    createReport,
    getAllReports,
    getReportById,
    updateReport,
    deleteReport
}