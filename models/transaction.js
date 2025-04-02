const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    direction:String,
    paymentMode:String,
    userId:String,
    amount:String,
    utl:String,
    status:String,
    date:String,
    totalBalance:String
})

module.exports = mongoose.model("transaction",transactionSchema);