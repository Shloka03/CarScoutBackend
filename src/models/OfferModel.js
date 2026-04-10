const mongoose = require("mongoose")

const offerSchema = new mongoose.Schema({

    buyerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },

    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },

    carId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cars",
        required:true
    },

    offeredPrice:{
        type:Number,
        required:true
    },

    offerStatus:{
        type:String,
        enum:["pending","accepted","rejected","completed"],
        default:"pending"
    },

    offerDate:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("offers",offerSchema)