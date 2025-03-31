const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    userId:String,
    date:String,
    buyingPrice:String,
    paymentStatus:String,
    orderStatus:String,
    name:String,
    price:String,
    quantity:String
})