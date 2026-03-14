const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({

    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"sellers",
        required:true
    },

    brand:{
        type:String,
        required:true
    },

    model:{
        type:String,
        required:true
    },

    year:{
        type:Number
    },

    price:{
        type:Number,
        required:true
    },

    distanceDriven:{
        type:Number
    },

    fuelType:{
        type:String
    },

    transmission:{
        type:String
    },

    color:{
        type:String
    },

    description:{
        type:String
    }

},{
    timestamps:true
})

module.exports = mongoose.model("cars",carSchema)