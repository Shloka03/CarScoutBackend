const Feedback = require("../models/FeedbackModel")

const addFeedback = async(req,res)=>{
    try{
        const existingFeedback = await Feedback.findOne({
        buyerId:req.body.buyerId,
        carId:req.body.carId
    })

        if(existingFeedback){
          return res.status(400).json({
          message:"Feedback already submitted"
    })
}

        const feedback = await Feedback.create(req.body)

        res.status(201).json({
            message:"Feedback added",
            data:feedback
        })

    }catch(err){
        res.status(500).json({
            message:"Error adding feedback",
            err
        })
    }
}

const getAllFeedback = async(req,res)=>{
    try{

        const feedback = await Feedback.find()
        .populate("buyerId")
        .populate("sellerId")
        .populate("carId")

        res.status(200).json({
            message:"Feedback fetched",
            data:feedback
        })

    }catch(err){
        res.status(500).json({
            message:"Error fetching feedback",
            err
        })
    }
}

const deleteFeedback = async(req,res)=>{
    try{

        const feedback = await Feedback.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message:"Feedback deleted",
            data:feedback
        })

    }catch(err){
        res.status(500).json({
            message:"Error deleting feedback",
            err
        })
    }
}

module.exports = {
    addFeedback,
    getAllFeedback,
    deleteFeedback
}