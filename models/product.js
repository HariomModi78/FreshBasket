const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:String,
    price:String,
    discription:String,
    quantity:String,
    userId:Array,
    categary:String,
    imagePath:String
})

module.exports = mongoose.model("product",productSchema);