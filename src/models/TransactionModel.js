const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({

    buyerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"buyers",
        required:true
    },

    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"sellers",
        required:true
    },

    carId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cars",
        required:true
    },

    finalPrice:{
        type:Number
    },

    status:{
        type:String,
        enum:["pending","completed","cancelled"],
        default:"pending"
    },

    transactionTime:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("transactions",transactionSchema)