const mongoose = require("mongoose");

const permissionSchema = mongoose.Schema({
    userId:String,
    type:String
})

module.exports = mongoose.model("permission",permissionSchema);