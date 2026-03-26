const mongoose = require("mongoose")

const testDriveSchema = new mongoose.Schema({

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
        ref:"cars",
        required:true
    },

    testDriveDate:{
        type:Date,
        required:true
    },
    testDriveTime: {
  type: String,
  required: true
},

    status:{
        type:String,
        enum:["requested","approved","completed","rejected"],
        default:"requested"
    }

},{
    timestamps:true
})

module.exports = mongoose.model("testdrives",testDriveSchema)