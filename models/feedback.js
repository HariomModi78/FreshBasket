const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
    userId:String,
    feedback:String,

})

module.exports = mongoose.model("feedback",feedbackSchema);