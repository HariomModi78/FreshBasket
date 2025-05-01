const mongoose = require("mongoose");

const referSchema = mongoose.Schema({
    userId:String,
    friendId:String,
    friendName:String,
    status:{
        type:Boolean,
        default:false
    },
    amount:Number,
})

module.exports = mongoose.model("refer",referSchema);