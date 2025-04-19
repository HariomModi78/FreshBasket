const mongoose = require("mongoose");

const scratchCardSchema = mongoose.Schema({
    userId:String,
    amount:Number,
    status:{
        type:Boolean,
        default:true
    },
    time:{
        type:Date,
    }
})

module.exports = mongoose.model("scratchCard",scratchCardSchema);