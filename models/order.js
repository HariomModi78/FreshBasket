const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    userId:String,
    productId:String,
    date:Date,
    buyingPrice:Number,
    paymentStatus:String,
    orderStatus:String,
    name:String,
    quantity:String,
    imagePath:String,
    qrUrl:String,
    otp:String,
})

module.exports = mongoose.model("order",orderSchema);