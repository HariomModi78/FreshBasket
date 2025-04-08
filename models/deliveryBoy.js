const mongoose = require("mongoose");

const deliveryBoySchema = mongoose.Schema({
    userId:String,
    aadharFile:String,
    aadharNumber:String,
    drivingLicence:String,
    drivingLicenceNumber:String,
    vehical:String,
    vehicalNumber:String,
    deliveryCount:{
        type:Number,
        default:0
    },
    rating:Array,
    available:Boolean,
    joiningDate:{
        type:Date,
        default:new Date(),
    }
})