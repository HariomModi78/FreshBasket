const mongoose = require("mongoose");

const deliveryBoySchema = mongoose.Schema({
    userId:String,
    aadharCard:String,
    aadharCardNumber:String,
    vehical:String,
    vehicalNumber:String,
    deliveryCount:{
        type:Number,
        default:0
    },
    rating:Array,
    available:Boolean,
    createdAt:Date
})

module.exports = mongoose.model("deliveryBoy",deliveryBoySchema);