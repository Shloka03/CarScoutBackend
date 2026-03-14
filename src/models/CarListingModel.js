const mongoose = require("mongoose")

const listingSchema = new mongoose.Schema({

    carId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cars",
        required:true
    },

    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"sellers",
        required:true
    },

    status:{
        type:String,
        enum:["active","sold","hidden"],
        default:"active"
    },

    postingDate:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("listings",listingSchema)