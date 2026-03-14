const mongoose = require("mongoose")

const mediaSchema = new mongoose.Schema({

    carId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cars",
        required:true
    },

    mediaUrl:{
        type:String,
        required:true
    },

    mediaType:{
        type:String,
        enum:["image","video"]
    },

    uploadTime:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("mediagallery",mediaSchema)