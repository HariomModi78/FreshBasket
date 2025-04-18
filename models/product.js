const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:String,
    price:Number,
    discription:String,
    quantity:String,
    categary:String,
    imagePath:String,
    stock:Number
})

module.exports = mongoose.model("product",productSchema);