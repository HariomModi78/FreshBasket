const mongoose = require("mongoose");
require('dotenv').config();


const uri = process.env.MONGO_URL

// Connect Mongoose properly
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase timeout in case of connection issues
});

const db = mongoose.connection;

// Connection success
db.once("open", () => {
  console.log("Connected to MongoDB successfully!");
});

// Connection error handling
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});


const userSchema = mongoose.Schema({
    username:{
        type:String,
        default:"Hariom Milk User"
    },
    email:String,
    pin:String,
    mobileNumber:String,
    address:String,
    profilePicture:String,
    doorPicture:String,
    order:Array,
    cart:Array,
    saveForLater:Array,
    transaction:Array,
    type:{
        type:String,
        default:"user"
    },
    walletBalance:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model("user",userSchema);