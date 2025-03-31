const express = require("express");
const app = express();
const path = require("path");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const multer = require("multer");

const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io")
const io = socket(server)

const userDataBase = require("./models/user.js");
const categaryDataBase = require("./models/categary.js");
const sellerDataBase = require("./models/seller.js");
const productDataBase = require("./models/product.js");
const product = require("./models/product.js");
require('dotenv').config();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:"dhgnqr8tz",
    api_key:process.env.File_KEY,
    api_secret:process.env.File_SECRET,
})

const storage = multer.diskStorage({
    // destination:function(req,file,cb){  //for local
    //     cb(null,`${path.join(__dirname,"public/images")}`);
    // },
    filename:function(res,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage});
//.log(process.env.SECRET);
const transporter = nodemailer.createTransport({
    secure:true,
    host:"smtp.gmail.com", 
    port:465,
    auth:{
        user:process.env.email,
        pass:process.env.pass
    }
})
function sendMail(to,sub,msg){
    transporter.sendMail({
        to:to,
        subject:sub,
        html:`<p>Hello,</p>
<p>Your OTP is: <strong>${msg}</strong></p>
<p>This OTP is valid for 5 minutes.</p>
<hr>
<p>Best Regards,</p>
<p><strong>Hariom Modi</strong></p>
<p>Contact us: hariommilk@gmail.com</p>
`
    })
}

server.listen(3000,function(){
    //.log("server is running ");
})

app.use(CookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.get("/",async function(req,res){
    try{
        let user = await userDataBase.findOne({email:req.cookies.email}); 
        console.log(user.email);
        if(req.cookies.otp){
     res.render("login");
        }
        else{
            res.redirect("/home")

        }
    }catch(e){
    res.render("login");
    }
}) 
// app.get("/",function(req,res){
//     res.render("feed");
// })
app.post("/otp",function(req,res){
    let otp = parseInt((Math.random()*9000)+1000);
    //.log(req.body.email);
    

        sendMail(req.body.email,"OTP",otp);
        res.cookie("email",req.body.email);
    
    
    let data = jwt.sign({otp:otp,email:req.body.email},process.env.SECRET);
    // //.log(otp)
    res.cookie("otp",data)
    //.log(data);
    res.render("otp");
})
app.post("/verify",async function(req,res){
    //.log(req.cookies.otp)
    let data = jwt.verify(req.cookies.otp,process.env.SECRET);
    //.log(data);
    let otp = `${req.body.one}${req.body.two}${req.body.three}${req.body.four}`;
    //.log(parseInt(otp))
    if(otp==data.otp){
        let user = await userDataBase.findOne({email:req.cookies.email});
        if(!user){ 
            await userDataBase.create({
                email:req.cookies.email
            })
        }
        
        res.redirect("/home");
    }
    else{
        res.send("invalid otp")
    } 
})
app.get("/sellerSignup",async function(req,res){
    let user = await userDataBase.findOne({email:req.cookies.email});
    if(user.type =="farmer"){
        res.render("sellerPage",{user:user});
    }
    else{
        res.render("sellerSignup",{user:user});
    }
})
app.post("/sellerSignup1",upload.single("image"),async function(req,res){
    //.log("file data ",req.file)
    
                const file = req.file.path;
    const cloudinaryResponce = await cloudinary.uploader.upload(file,{
            
        folder:"Uploads"
    })
    let user = await userDataBase.findOneAndUpdate({email:req.cookies.email},{
        type:"farmer",
        address:req.body.address,
        profilePicture:cloudinaryResponce.url
    })
    await sellerDataBase.create({
        userId:user._id
    })
    res.render("sellerPage",{user:user});
})
app.get("/home",async function(req,res){
    if(req.cookies.email){
        let user =  await userDataBase.findOne({email:req.cookies.email});
        let categary = await categaryDataBase.find();
        let product = await productDataBase.find();
        
         res.render("home",{user:user,categary:categary,product:product});
    }
    else{
        res.send("Page Not Found")
    }
})

app.get("/feed",function(req,res){
    res.render("feed");
})
app.get("/more",async function(req,res){
   let user =  await userDataBase.findOne({email:req.cookies.email});
    res.render("more",{user:user});
})
app.get("/checkProfit",function(req,res){
    res.render("checkProfit");
})
app.get("/refer",function(req,res){
    res.render("refer");
})
app.get("/wallet",async function(req,res){
    let user = await userDataBase.findOne({email:req.cookies.email});
    res.render("wallet",{user:user});
})
app.get("/transaction",function(req,res){
    res.render("transaction");
})
app.get("/profile",async function(req,res){
   let user =  await userDataBase.findOne({email:req.cookies.email});
    res.render("profile",{user:user});
})
app.get("/subscription",function(req,res){
    res.render("subscription");
})
app.get("/order",function(req,res){
    res.render("order");
})
app.get("/mySubscription",function(req,res){
    res.render("mySubscription");
}) 
app.get("/support",function(req,res){
    res.render("support");
}) 
app.get("/cart",function(req,res){
    res.render("cart");
}) 
app.get("/productView/:productId",async function(req,res){
    try{
        let product = await productDataBase.findOne({_id:req.params.productId})
        let products = await productDataBase.find();
        res.render("productView",{product:product,products:products});
    }catch(e){
        res.send("Page Not Found")
    }
   
}) 
app.get("/categary/:productName",async function(req,res){
    try{
        let product  = await productDataBase.find({categary:req.params.productName})
        res.render("categary",{product:product});
    }catch(e){
        res.send("page not found");
    }
    
}) 
function admin(email){
    if(email=="scmodi9@gmail.com"){
        return true;
    }
    else{
        return false;
    }
}
app.get("/admin/product",async function(req,res){
    if(admin(req.cookies.email)){
        //.log("admin is watching")
         let categary = await categaryDataBase.find();

        res.render("adminProduct",{categary:categary});
    }
    else{
        res.send("You are not admin");
    } 
}) 
app.get("/admin/user",function(req,res){
    if(admin(req.cookies.email)){
        //.log("admin is watching")
        res.render("adminUser");
    }
    else{
        res.send("You are not admin");
    } 
}) 
app.get("/admin/add/categary",function(req,res){
    if(admin(req.cookies.email)){
        //.log("admin is watching")
        res.render("adminAddCategary");
    }
    else{
        res.send("You are not admin");
    } 
}) 
app.get("/admin/categary/update/:categary",async function(req,res){
    try{

    if(admin(req.cookies.email)){
        //.log("admin is watching");
            let product = await productDataBase.find();
            let categary = await categaryDataBase.findOne({name:req.params.categary})
            res.render("adminCategaryUpdate",{categary:categary,product:product});
        
        
    }
    else{ 
        res.send("You are not admin");
    } 
}catch(e){
    res.send("page not found");
}
})
app.get("/admin/add/product/:categary",async function(req,res){
    if(admin(req.cookies.email)){
        try{
            let categary = await categaryDataBase.findOne({name:req.params.categary})
            res.render("adminAddProduct",{categary:categary})
        }catch(e){
            res.send("page not found")
        }
        
    }
    else{
        res.send("You are not admin");
    } 
})
app.post("/admin/addProduct",async function(req,res){
    let product = await productDataBase.create({
        name:req.body.name,
        price:req.body.price,
        discription:req.body.discription,
        quantity:req.body.quantity,
        categary:req.body.categary,
        imagePath:req.body.imagePath
    }) 
    await categaryDataBase.findOneAndUpdate({name:product.categary},{
        $push:{productId:product._id}
    })
    res.redirect("/admin/product")
    // res.send("WOrkin")
})
app.get("/admin/UpdateProduct/:productId",async function(req,res){
    try{
        let product = await productDataBase.findOne({_id:req.params.productId});
        res.render("adminUpdateProduct",{product:product});
    }catch(e){
        res.send("page not found")
    }
    
})
app.post("/admin/updateProduct/:productId",async function(req,res){
    try{
        let product = await productDataBase.findOneAndUpdate({_id:req.params.productId},{
            name:req.body.name,
            price:req.body.price,
            discription:req.body.discription,
            quantity:req.body.quantity,
            categary:req.body.categary,
            imagePath:req.body.imagePath
        }) 
        res.redirect("/admin/product")
    }catch(e){
        res.send("page not found")
    }
    
    // res.send("WOrkin")
})
app.get("/admin/user/:user",async function(req,res){
    
    if(admin(req.cookies.email)){
        //.log("admin is watching");
        if(req.params.user == "user"){
            try{
                let user = await userDataBase.find();
                res.render("adminUserView",{user:user});
            }catch(e){
                res.send("page not found")
            }
            
        }
        else{
            try{
                let user = await userDataBase.find({type:req.params.user});
                res.render("adminUserView",{user:user});
            }catch(e){
                res.send("page not found")
            }
            
        }
    
    }
    else{
        res.send("You are not admin");
    } 
})
app.post("/admin/categary/update/:categary",async function(req,res){
    if(admin(req.cookies.email)){
        //.log("admin is watching");
        if(req.body.delete == req.body.name){
            try{
                await categaryDataBase.findOneAndDelete({name:req.body.delete});
            }catch(e){
                res.send("page not found")
            }
        }
        else{
            try{
                await categaryDataBase.findOneAndUpdate({name:req.params.categary},{
                    name:req.body.name,
                    imagePath:req.body.imagePath
                })
            }catch(e){
                res.send("page not found")
            }
           
        }
        
        res.redirect("/admin/product");
    }
    else{
        res.send("You are not admin");
    } 
})
app.post("/admin/add/categary",async function(req,res){
    await categaryDataBase.create({
        name:req.body.name,
        imagePath:req.body.imagePath
    })
    res.redirect("/admin/product");
 
}) 
app.post("/detail",async function(req,res){
   let user =  await userDataBase.findOneAndUpdate({email:req.cookies.email},{
        username:req.body.username,
        mobileNumber:req.body.mobileNumber
    });
    res.redirect("home");
})



app.get("/logout",function(req,res){
    res.cookie("email",undefined);
    res.redirect("/")
})



app.get("/placeOrder/:productId",async function(req,res){
    let user = await userDataBase.findOne({email:req.cookies.email});
    let product = await productDataBase.findOne({_id:req.params.productId});
    res.render("placeOrder",{product:product,user:user});
})   
app.post("/orderAddress/placeOrder/:productId",async function(req,res){

    let user = await userDataBase.findOneAndUpdate({email:req.cookies.email},{
        address:req.body.address
    });
    let product = await productDataBase.findOne({_id:req.params.productId});
    res.redirect(`/placeOrder/${product._id}`);
}) 
app.get("/orderAddress/:userId/:productId",async function(req,res){

    let user = await userDataBase.findOne({_id:req.params.userId});
    let product = await productDataBase.findOne({_id:req.params.productId});
    res.render("orderAddress",{user:user,product:product});
}) 
app.post("/orderPayment/:productId",async function(req,res){
    let user = await userDataBase.findOne({email:req.cookies.email});
    let product  = await productDataBase.findOne({_id:req.params.productId});
    res.render("orderPayment",{user:user,product:product})
})   
app.get("/token/:email",function(req,res){
    res.cookie("email",req.params.email);
    res.redirect("/home")
})




io.on("connect",function(socket){
    console.log("connected")
    socket.on("login",function(email){
        socket.emit("done");
    })
    socket.on("disconnect",function(){
        console.log("disconnected");
    })
})
