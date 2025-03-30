const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    type:String,
    userId:String,
    amount:String,
    utl:String,
    status:String,
    paymentMode:String,
    date:String,
    totalBalance:String
})