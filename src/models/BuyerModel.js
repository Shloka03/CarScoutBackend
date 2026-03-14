const mongoose = require("mongoose")

const buyerSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },

    budgetPreference:{
        type:Number
    },

    preferredBrand:{
        type:String
    },

    savedCars:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"cars"
        }
    ]

},{
    timestamps:true
})

module.exports = mongoose.model("buyers",buyerSchema)