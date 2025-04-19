const mongoose = require("mongoose");

const categarySchema = mongoose.Schema({
    productId:Array,
    name:String,
    imagePath:String
})

module.exports = mongoose.model("categary",categarySchema);