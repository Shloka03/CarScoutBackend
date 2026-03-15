const Media = require("../models/MediaGalleryModel")

// Upload media
const addMedia = async(req,res)=>{
    try{

        const media = await Media.create(req.body)

        res.status(201).json({
            message:"Media uploaded successfully",
            data:media
        })

    }catch(err){
        res.status(500).json({
            message:"Error uploading media",
            err
        })
    }
}

// Get all media
const getAllMedia = async(req,res)=>{
    try{

        const media = await Media.find().populate("carId")

        res.status(200).json({
            message:"Media fetched",
            data:media
        })

    }catch(err){
        res.status(500).json({
            message:"Error fetching media",
            err
        })
    }
}

// Delete media
const deleteMedia = async(req,res)=>{
    try{

        const media = await Media.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message:"Media deleted",
            data:media
        })

    }catch(err){
        res.status(500).json({
            message:"Error deleting media",
            err
        })
    }
}

module.exports = {
    addMedia,
    getAllMedia,
    deleteMedia
}