const InspectionReport = require("../models/InspectionReportModel")

// Create report
const createReport = async(req,res)=>{
    try{

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
    deleteReport
}