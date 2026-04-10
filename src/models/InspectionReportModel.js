const mongoose = require("mongoose")

const inspectionReportSchema = new mongoose.Schema({

    carId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cars",
        required:true
    },

    serviceDetails:{    
        type:String
    },

    inspector:{
        type:String
    },

    verificationStatus: {
    type: String,
    enum: ["approved", "pending", "rejected"],
    default: "approved"
    },

    inspectionDate:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("inspectionreports",inspectionReportSchema)