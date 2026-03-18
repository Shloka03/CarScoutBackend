const mongoose = require("mongoose")

const feedbackSchema = new mongoose.Schema({

    buyerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },

    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"sellers",
        required:true
    },

    carId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cars"
    },

    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },

    comment:{
        type:String
    },

    feedbackDate:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("feedbacks",feedbackSchema)