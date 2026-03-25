const Media = require("../models/MediaGalleryModel")
const uploadToCloudinary = require("../utils/CloudinaryUtil")

// Upload media
const addMedia = async (req, res) => {
  try {

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "Files are required"
      });
    }

    const uploadedMedia = [];

    // 🔥 LOOP THROUGH ALL FILES
    for (let file of req.files) {

      const cloudinaryResponse = await uploadToCloudinary(file.path);

      const media = await Media.create({
        carId: req.body.carId,
        mediaType: req.body.mediaType,
        mediaUrl: cloudinaryResponse.secure_url
      });

      uploadedMedia.push(media);
    }

    res.status(201).json({
      message: "Media uploaded successfully",
      data: uploadedMedia
    });

  } catch (err) {
    res.status(500).json({
      message: "Error uploading media",
      err
    });
  }
};

// Get all media
const getAllMedia = async(req,res)=>{
    try{

        const media = await Media.find({
  carId: { $in: cars.map(c => c._id) }
});

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