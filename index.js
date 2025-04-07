const express = require("express");
const app = express();
const path = require("path");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const multer = require("multer");
const qrcode = require("qrcode");
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io")
const io = socket(server)
const mongoose = require("mongoose")
const userDataBase = require("./models/user.js");
const categaryDataBase = require("./models/categary.js");
const sellerDataBase = require("./models/seller.js");
const productDataBase = require("./models/product.js");
const transactionDataBase = require("./models/transaction.js");
const orderDataBase = require("./models/order.js");
const feedbackDataBase = require("./models/feedback.js");
const user = require("./models/user.js");

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
        //(user.email);
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
    

       sendMail(req.body.email,"OTP",otp);
        res.cookie("email",req.body.email);
    let data = jwt.sign({otp:otp,email:req.body.email},process.env.SECRET);
    res.cookie("otp",data)
    res.render("otp");
})
app.post("/verify",async function(req,res){
    try{
        let data = jwt.verify(req.cookies.otp,process.env.SECRET);
        let otp = `${req.body.one}${req.body.two}${req.body.three}${req.body.four}`;
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
    }catch(e){
        res.render("error")
    }
    
})
app.get("/sellerSignup",async function(req,res){
    try{
        let user = await userDataBase.findOne({email:req.cookies.email});
        if(user.type =="farmer"){
            res.render("sellerPage",{user:user});
        }
        else{
            res.render("sellerSignup",{user:user});
        }
    }catch(e){
        res.render("error")
    }
    
})
app.post("/sellerSignup1",upload.single("image"),async function(req,res){
    //.log("file data ",req.file)
    try{
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
    }catch(e){
        res.render("error")
    }
    
})
app.get("/home",async function(req,res){
    try{
        if(req.cookies.email){
            let user =  await userDataBase.findOne({email:req.cookies.email});
            let categary = await categaryDataBase.find();
            let product = await productDataBase.find();
            
             res.render("home",{user:user,categary:categary,product:product});
        }
        else{
            res.render("login")
        }
    }catch(e){
        res.render("error")
    }
    
})
app.get("/feed",async function(req,res){
    let product = await productDataBase.find({categary:"feed"});
    res.render("feed",{product:product});
})
app.get("/more",async function(req,res){
    try{
        let user =  await userDataBase.findOne({email:req.cookies.email});
        res.render("more",{user:user});
    }catch(e){
        res.render("error")
    }
   
})
app.get("/checkProfit",function(req,res){
    res.render("checkProfit");
})
app.get("/refer",function(req,res){
    res.render("refer");
})
app.get("/wallet",async function(req,res){
    try{
        let user = await userDataBase.findOne({email:req.cookies.email});
        res.render("wallet",{user:user});
    }catch(e){
        res.render("error")
    }
    
})
app.get("/transaction",async function(req,res){
    try{
        let user = await userDataBase.findOne({email:req.cookies.email});
    let transaction = await transactionDataBase.find({userId:user._id}).sort({date: -1 });
    res.render("transaction",{user:user,transaction:transaction});
    }catch(e){
        res.render("error")
    }
    
})
app.get("/profile",async function(req,res){
    try{
        let user =  await userDataBase.findOne({email:req.cookies.email});
        res.render("profile",{user:user});
    }catch(e){
        res.render("error")
    }
   
})
app.get("/subscription",function(req,res){
    res.render("subscription");
})
app.get("/order",async function(req,res){
    try{
        let user = await userDataBase.findOne({email:req.cookies.email});
        let order = await orderDataBase.find({userId:user._id}).sort({date: -1 });
        res.render("order",{order:order});
    }catch(e){
        res.render("error")
    }
    
})
app.get("/mySubscription",function(req,res){
    res.render("mySubscription");
}) 
app.get("/support",function(req,res){
    res.render("support");
}) 
app.get("/cart",async function(req,res){
    let user = await userDataBase.findOne({email:req.cookies.email});
    let product = await productDataBase.find({_id:user.cart});
    let saveForLater = await productDataBase.find({_id:user.saveForLater});
    res.render("cart",{product:product,saveForLater:saveForLater});
}) 
app.get("/addToCart/:productId",async function(req,res){
    let user  = await userDataBase.findOne({email:req.cookies.email});
    let flag = true;
        for(let i=0;i<user.cart.length;i++){
            if(user.cart[i] == req.params.productId){
                flag = false;
            }
        }
        if(flag){
            //("not working")
            let product = await productDataBase.findOne({_id:req.params.productId});
            await userDataBase.findOneAndUpdate({email:req.cookies.email},{
                $push:{cart:product._id},
                $pull:{saveForLater:new mongoose.Types.ObjectId(req.params.productId)},
            });
        }
       res.redirect("/cart");
    // res.redirect(`/productView/${req.params.productId}`);
})  
app.get("/productView/:productId",async function(req,res){
    try{
        let product = await productDataBase.findOne({_id:req.params.productId})
        let products = await productDataBase.find();
        let user = await userDataBase.findOne({email:req.cookies.email});
        let flag = false;
        for(let i=0;i<user.cart.length;i++){
            if(user.cart[i] == req.params.productId){
                flag = true;
            }
        }
        res.render("productView",{product:product,products:products,flag:flag});
    }catch(e){
        res.render("error")
    }
   
}) 
app.get("/categary/:productName",async function(req,res){
    try{
        let product  = await productDataBase.find({categary:req.params.productName})
        res.render("categary",{product:product});
    }catch(e){
        res.render("error")
    }
    
}) 
function admin(email){
    if(email==process.env.email){
        //(process.env.email)
        return true;
    }
    else{
        return false;
    }
}
app.get("/admin/product",async function(req,res){
    try{
        if(admin(req.cookies.email)){
            //.log("admin is watching")
             let categary = await categaryDataBase.find();
    
            res.render("adminProduct",{categary:categary});
        }
        else{
            res.render("error")
        } 
    }catch(e){
        res.render("error")
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
        res.render("error")
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
        res.render("error")
    } 
}catch(e){
    res.render("error")
}
})
app.get("/admin/add/product/:categary",async function(req,res){
    try{

    if(admin(req.cookies.email)){
            let categary = await categaryDataBase.findOne({name:req.params.categary})
            res.render("adminAddProduct",{categary:categary})
       
        
    }
    else{
        res.render("error")
    } 
    }catch(e){
    res.render("error")
    }
})
app.post("/admin/addProduct",async function(req,res){
    try{
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
    }catch(e){
        res.render("error")
    }
    
})
app.get("/admin/UpdateProduct/:productId",async function(req,res){
    try{
        let product = await productDataBase.findOne({_id:req.params.productId});
        res.render("adminUpdateProduct",{product:product});
    }catch(e){
        res.render("error")
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
        res.render("error")
    }
    
    // res.send("WOrkin")
})
app.get("/admin/user/:user",async function(req,res){
    try{
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
    }catch(e){
        res.render("error")
    }
    
})
app.post("/admin/categary/update/:categary",async function(req,res){
    try{
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
    }catch(e){
        res.render("error")
    }
    
})
app.post("/admin/add/categary",async function(req,res){
    try{
        await categaryDataBase.create({
            name:req.body.name,
            imagePath:req.body.imagePath
        })
        res.redirect("/admin/product");
    }catch(e){
        res.render("error")
    }
    
 
}) 
app.get("/admin/order",function(req,res){
    res.render("adminOrder");
})
app.post("/detail",async function(req,res){
    try{
        if(req.body.mobileNumber.length==10){
            let user =  await userDataBase.findOneAndUpdate({email:req.cookies.email},{
                username:req.body.username,
                mobileNumber:req.body.mobileNumber
            });
            if(req.body.flag){
                res.redirect("/profile")
            }
            else{
                res.redirect("/home");
            }
        }
        else{
            res.send("10 digit mobile number is required")
        }
    }catch(e){
        res.render("error")
    }
    
})



app.get("/logout",function(req,res){
    res.cookie("email",undefined);
    res.redirect("/")
})



app.get("/placeOrder/:productId",async function(req,res){
    try{
        let user = await userDataBase.findOne({email:req.cookies.email});
        let product = await productDataBase.findOne({_id:req.params.productId});
        res.render("placeOrder",{product:product,user:user});
    }catch(e){
        res.render("error")
    }
    
})   
app.post("/orderAddress/placeOrder/:productId",async function(req,res){
    try{
        let user = await userDataBase.findOneAndUpdate({email:req.cookies.email},{
            address:req.body.address
        });
        let product = await productDataBase.findOne({_id:req.params.productId});
        res.redirect(`/placeOrder/${product._id}`);
    }catch(e){
        res.render("error")
    }
    
}) 
app.post("/changeAddress",async function(req,res){
    try{
        let user = await userDataBase.findOneAndUpdate({email:req.cookies.email},{
            address:req.body.address
        });
       
        res.redirect(`/profile`);
    }catch(e){
        res.render("error")
    }
    
}) 
app.post("/feedback",async function(req,res){
    try{
        let user = await userDataBase.findOne({email:req.cookies.email});
       await feedbackDataBase.create({
        userId:user._id,
        feedback:req.body.feedback,
       })
        res.redirect(`/profile`);
    }catch(e){
        res.render("error")
    }
    
}) 
app.get("/orderAddress/:userId/:productId",async function(req,res){
    try{
        let user = await userDataBase.findOne({_id:req.params.userId});
        let product = await productDataBase.findOne({_id:req.params.productId});
        res.render("orderAddress",{user:user,product:product});
    }catch(e){
        res.render("error")
    }
    
}) 
app.post("/orderPayment/:productId",async function(req,res){
    try{
        let user = await userDataBase.findOne({email:req.cookies.email});
        let product  = await productDataBase.findOne({_id:req.params.productId});
        res.render("orderPayment",{user:user,product:product})
    }catch(e){
        res.render("error")
    }
    
})   
app.get("/token/:email",function(req,res){
    res.cookie("email",req.params.email);
    res.redirect("/home");
})

app.get("/pay/:amount/:userId",async function(req,res){
    try{
        if(req.params.amount>0){
            let user = await userDataBase.findOne({_id:req.params.userId});
            await userDataBase.findOneAndUpdate({_id:req.params.userId},{
                walletBalance:(parseFloat(req.params.amount) + parseFloat(user.walletBalance)).toFixed(2)
            })
            await transactionDataBase.create({
                userId:user._id,
                amount:req.params.amount,
                paymentMode:"Online",
                utr:"12345679012",
                status:"complete",
                date:new Date(),
                totalBalance:(parseFloat(user.walletBalance) +parseFloat(req.params.amount)).toFixed(2),
                direction:"+"
        
            })
            res.redirect("/wallet")
        }else{
            res.render("error")

        }
    }catch(e){
        res.render("error")
    }
    
})
app.get("/qr",function(req,res){
    qrcode.toDataURL("chomu",function(err,url){
        res.render("error",{url:url})
    })
})
app.get("/paymentDone/:wallet/:productId/:item",async function(req,res){
    try{
        let product =  await productDataBase.findOne({_id:req.params.productId});
        let user =  await userDataBase.findOne({email:req.cookies.email});
        let amount =product.price *req.params.item +3;
        let otp = parseInt((Math.random()*9000)+1000);
       if(user.walletBalance>=(amount)){
        //("total AMount : ",amount);
        for(let i=0;i<parseInt(req.params.item);i++){
            //("order done")
            await userDataBase.findOneAndUpdate({email:req.cookies.email},{
                $push:{order:req.params.productId}
            })

        qrcode.toDataURL(`${otp}`,async function(err,url){ 
            
                     await orderDataBase.create({
                    userId:user._id,
                    productId:product._id,
                    date:new Date(),
                    buyingPrice:product.price,
                    paymentStatus:"paid",
                    orderStatus:"order placed",
                    name:product.name,
                    quantity:product.quantity,
                    imagePath:product.imagePath,
                    otp:otp,
                    qrUrl:url
                })
        })
                
            
        }
            
        await transactionDataBase.create({
            userId:user._id,
            amount:(amount).toString(),
            paymentMode:`${req.params.wallet}`,
            utr:"12345679012",
            status:"complete",
            date:new Date(),
            totalBalance:(parseFloat(user.walletBalance) -amount).toFixed(2),
            direction:"-"
        })
        
        await userDataBase.findOneAndUpdate({email:req.cookies.email},{
            walletBalance:(parseFloat(user.walletBalance) -amount).toFixed(2)
        })
        res.redirect(`/order`);
       }
       else{
        res.render("error")
       }
        
    }catch(e){
        res.render("error")
    } 
    
})
app.get("/orderStatus/:orderId",async function(req,res){
    let order = await orderDataBase.findOne({_id:req.params.orderId});
    res.render("orderStatus",{order:order});
})
app.get("/change",async function(req,res){
    await orderDataBase({},[
        {buyingPrice:{$toDouble:"$buyingPrice"}}
    ]);
    res.send("done");
})
app.get("/cancelOrder/:orderId",async function(req,res){
    let order = await orderDataBase.findOne({_id:req.params.orderId});
    if(new Date().getTime() - new Date(order.date).getTime() < 60000 ){
        let user  = await userDataBase.findOne({email:req.cookies.email});
        await userDataBase.findOneAndUpdate({email:req.cookies.email},{
            walletBalance:(user.walletBalance +order.buyingPrice).toFixed(2),
        })
        await orderDataBase.findOneAndUpdate({_id:req.params.orderId},{
            orderStatus:"cancel"
        });
        await transactionDataBase.create({
            userId:user._id,
            amount:order.buyingPrice,
            direction:"+",
            paymentMode:"refund",
            status:"complete",
            date:new Date(),
            totalBalance:(user.walletBalance +order.buyingPrice).toFixed(2),
        })
        res.redirect(`/orderStatus/${req.params.orderId}`);
    }
    else{
        res.render("error");
    }
     
})
app.get("/search",function(req,res){
    res.render("search");
})

app.get("/deliveryBoyRegistration",function(req,res){
    res.render("deliveryBoyRegistration");
})
app.post("/deliveryBoyRegistration",function(req,res){
    res.send("Working")
})
app.get("/removeFromCart/:productId",async function(req,res){

    let user = await userDataBase.findOneAndUpdate({email:req.cookies.email},{
        $pull:{cart:new mongoose.Types.ObjectId(req.params.productId)}
    })
    //(req.params.productId," ",user.cart)
    res.redirect("/cart");
})
app.get("/saveForLater/:productId",async function(req,res){

    let user = await userDataBase.findOneAndUpdate({email:req.cookies.email},{
        $pull:{cart:new mongoose.Types.ObjectId(req.params.productId)},
        $push:{saveForLater:new mongoose.Types.ObjectId(req.params.productId)}
    })
    //(req.params.productId," ",user.cart)
    res.redirect("/cart");
})
app.get("/placeCartOrder/:idArray/:itemArray",async function(req,res){
    let productId = (req.params.idArray).split("-");
    let item = (req.params.itemArray).split("-");
    productId = productId.filter(function(val){
        if(val !="undefined"){
            return true;
        }
        else{
            return false;
        }
    })
    item = item.filter(function(val){
        if(val !="undefined"){
            return true;
        }
        else{
            return false;
        }
    })
    //(productId)
    //(item)
    let products  = await productDataBase.find({_id:productId});
    let user = await userDataBase.findOne({email:req.cookies.email});
    //(products);
    let url1 = (req.params.idArray).replace("undefined","");
     url1 = url1.replace("-","");
     let url2 = (req.params.itemArray).replace("undefined","");
     url2 = url2.replace("-","");
    //(url1)
    //(url2)
    res.render("placeCartOrder",{product:products,user:user,url1:url1,url2:url2,item:item})
})
app.post("/cartOrderPayment/:idArray/:itemArray",async function(req,res){
    let productId = (req.params.idArray).split("-");
    let item = (req.params.itemArray).split("-");
    productId = productId.filter(function(val){
        if(val !="undefined"){
            return true;
        }
        else{
            return false;
        }
    })
    item = item.filter(function(val){
        if(val !="undefined"){
            return true;
        }
        else{
            return false;
        }
    })
    let url1 = (req.params.idArray).replace("undefined","");
     let url2 = (req.params.itemArray).replace("undefined","");
    //(productId)
    //(item)
    let products  = await productDataBase.find({_id:productId});
    let user = await userDataBase.findOne({email:req.cookies.email});
    let amount = 0;
    for(let i=0;i<products.length;i++){
            amount += products[i].price * item[i];  
    }
    //(amount)
    //(url1)
    //(url2)
    res.render("cartOrderConfirm",{user:user,url1:url1,url2:url2,amount:amount})
})


app.get("/cartOrderConfirm/:idArray/:itemArray",async function(req,res){
    try{
        //("Deisire output items :",req.params.itemArray);
        //("Deisire output items :",req.params.idArray);
        let productId = (req.params.idArray).split("-");
        let item = (req.params.itemArray).split("-");
        


        let product =  await productDataBase.find({_id:productId});
        let user =  await userDataBase.findOne({email:req.cookies.email});
        let amount = 0;
        for(let i=0;i<product.length;i++){
                amount += product[i].price * item[i];  
        }
        let otp = parseInt((Math.random()*9000)+1000);
       if(user.walletBalance>=(amount)){
        //("total AMount : ",amount);

        for(let i=0;i<product.length;i++){
            for(let j=0;j<item[i];j++){
                await userDataBase.findOneAndUpdate({email:req.cookies.email},{
                    $push:{order:product[i]._id}
                })
    
            qrcode.toDataURL(`${otp}`,async function(err,url){ 
                
                         await orderDataBase.create({
                        userId:user._id,
                        productId:product[i]._id,
                        date:new Date(),
                        buyingPrice:product[i].price,
                        paymentStatus:"paid",
                        orderStatus:"order placed",
                        name:product[i].name,
                        quantity:product[i].quantity,
                        imagePath:product[i].imagePath,
                        otp:otp,
                        qrUrl:url
                    })
            })
            }
        }

        await transactionDataBase.create({
            userId:user._id,
            amount:(amount).toString(),
            paymentMode:`wallet`,
            utr:"12345679012",
            status:"complete",
            date:new Date(),
            totalBalance:(parseFloat(user.walletBalance) -amount).toFixed(2),
            direction:"-"
        })
        
        await userDataBase.findOneAndUpdate({email:req.cookies.email},{
            walletBalance:(parseFloat(user.walletBalance) -amount).toFixed(2)
        })
        res.redirect(`/order`);
       }
       else{
        res.render("error")
       }
        
    }catch(e){
        res.render("error")
    } 
    
})


io.on("connect",function(socket){
    //("connected");
    socket.on("cartOrder",function(product){

        //(product);
        socket.emit("confirmOrder",product)
        
    })
    socket.on("login",function(email){
        socket.emit("done");
    })
    socket.on("disconnect",function(){
        //("disconnected");
    })
    socket.on("searchItem",async function(name){
        // const regex = new RegExp("^" + name, "i"); // 'i' for case-insensitive
        // //(regex)
        let product = await productDataBase.find({ name: { $regex: `${name}` ,$options:`i` } });
        if(product.length==0){
            let product = await productDataBase.find({ categary: { $regex: `${name}` ,$options:`i` } });
            socket.emit("searchResult", product);
        }else{
            //("mela");
            socket.emit("searchResult", product);
        }
    })
    
})
