const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema({
    userId:String,

})

module.exports = mongoose.model("seller",sellerSchema);