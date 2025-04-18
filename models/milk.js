const mongoose = require("mongoose");

const milkSchema = mongoose.Schema({
    userId:String,
    quantity:Number,
    fat:Number,
    date:Date,
    time:String,
    day:String
})

module.exports = mongoose.model("milk",milkSchema);