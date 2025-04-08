const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    direction:String,
    paymentMode:String,
    userId:String,
    amount:Number,
    utl:String,
    status:String,
    date:Date,
    totalBalance:Number
})

module.exports = mongoose.model("transaction",transactionSchema);