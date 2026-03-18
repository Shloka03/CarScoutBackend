const Media = require("../models/MediaGalleryModel")
const uploadToCloudinary = require("../utils/CloudinaryUtil")

// Upload media
const addMedia = async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                message:"File is required"
            })
        }
        const cloudinaryResponse = await uploadToCloudinary(req.file.path)
        const existingMedia = await Media.findOne({
        carId:req.body.carId,
        mediaUrl:cloudinaryResponse.secure_url
    })

        if(existingMedia){
        return res.status(400).json({
        message:"Media already uploaded"
    })
}

        const media = await Media.create({
            carId:req.body.carId,
            mediaType:req.body.mediaType,
            mediaUrl:cloudinaryResponse.secure_url
        })

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

const updateMedia = async (req, res) => {
  try {

    const mediaId = req.params.id

    const updatedMedia = await Media.findByIdAndUpdate(
      mediaId,
      req.body,
      { new: true }
    )

    res.status(200).json({
      message: "Media updated successfully",
      data: updatedMedia
    })

  } catch (err) {
    res.status(500).json({
      message: "Error updating media",
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
    updateMedia,
    deleteMedia
}