const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({

    userType:{
        type:String,
        enum:["user","seller","admin"],
        required:true
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },

    message:{
        type:String,
        required:true
    },

    isRead:{
        type:Boolean,
        default:false
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("notifications",notificationSchema)