const mongoose = require("mongoose")

const sellerSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },

    companyName:{
        type:String
    },

    sellerType:{
        type:String,
        enum:["dealer","private"]
    },

    rating:{
        type:Number,
        default:0
    },

    verificationStatus:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})

module.exports = mongoose.model("sellers",sellerSchema)