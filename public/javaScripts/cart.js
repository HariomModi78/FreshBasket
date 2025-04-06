let socket =io();
let totalAmount = document.getElementsByClassName("totalAmount");
let quantity = document.getElementsByClassName("quantity");
let originalPrice = document.getElementsByClassName("pricejs")
let lastAmount = document.querySelector(".lastAmount");
let amount = 0;
localStorage.setItem("cartAmount",0);
let remove = document.getElementsByClassName("remove");
let buy = document.getElementsByClassName("buy");
let order = document.getElementsByClassName("order")
let saveForLater = document.getElementsByClassName("saveForLater")
let addToCart = document.getElementsByClassName("addToCart");
let product = new Array();

for(let i=0;i<addToCart.length;i++){
    addToCart[i].addEventListener("click",function(){
        window.location.href = `/addToCart/${addToCart[i].id}`;
    })
}
let submit = document.querySelector(".confirmOrder");
submit.addEventListener("click",function(){
    socket.emit("cartOrder",product);
})
for(let i=0;i<totalAmount.length;i++){
    product.push({
        productId:remove[i].id,
        item:1
    });
    console.log(product)
totalAmount[i].innerText = quantity[i].value*originalPrice[i].innerText;
 amount = parseFloat(localStorage.getItem("cartAmount")) +parseFloat(originalPrice[i].innerText);
 console.log(amount)
 
localStorage.setItem("cartAmount",amount);
// lastAmount.innerText = localStorage.getItem("cartAmount") 

    quantity[i].addEventListener("input",function(){
        product[i].item = parseInt(quantity[i].value);
        console.log(product);
        amount = 0;
        localStorage.setItem("cartAmount",0);
        totalAmount[i].innerText = quantity[i].value*originalPrice[i].innerText;
        for(let i=0;i<totalAmount.length;i++){
            amount = parseFloat(localStorage.getItem("cartAmount")) +parseFloat(totalAmount[i].innerText);
            console.log(amount)
           localStorage.setItem("cartAmount",amount);
        }
    lastAmount.innerText = localStorage.getItem("cartAmount")

    })
}
lastAmount.innerText = localStorage.getItem("cartAmount")




let main = document.querySelector("main");
for(let i=0;i<remove.length;i++){
    remove[i].addEventListener("click",function(){
        window.location.href = `/removeFromCart/${remove[i].id}`;
    })
    buy[i].addEventListener("click",function(){
        window.location.href = `/placeOrder/${remove[i].id}`;
    })
    saveForLater[i].addEventListener("click",function(event){
        window.location.href = `/saveForLater/${saveForLater[i].id}`;
    })
    // addToCart[i].addEventListener("click",function(event){
    //     window.location.href = `/saveForLater/${saveForLater[i].id}`;
    // })
}


