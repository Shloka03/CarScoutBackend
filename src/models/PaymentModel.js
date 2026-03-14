const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({

    transactionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"transactions",
        required:true
    },

    paymentMethod:{
        type:String,
        enum:["card","upi","netbanking","cash"]
    },

    paymentStatus:{
        type:String,
        enum:["pending","completed","failed"],
        default:"pending"
    },

    paymentTime:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("payments",paymentSchema)