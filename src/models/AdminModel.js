const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },

    accessModules:[
        {
            type:String
        }
    ],

    usersHandled:{
        type:Number,
        default:0
    },

    listingsVerified:{
        type:Number,
        default:0
    },

    reportsGenerated:{
        type:Number,
        default:0
    }

},{
    timestamps:true
})

module.exports = mongoose.model("admins",adminSchema)