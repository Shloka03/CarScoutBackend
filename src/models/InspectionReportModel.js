const mongoose = require("mongoose")

const inspectionReportSchema = new mongoose.Schema({

    carId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cars",
        required:true
    },

    healthScore:{
        type:Number
    },

    accidentDetails:{
        type:String
    },

    serviceDetails:{
        type:String
    },

    inspector:{
        type:String
    },

    inspectionDate:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("inspectionreports",inspectionReportSchema)