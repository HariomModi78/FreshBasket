let home = document.querySelector(".home");
let seller = document.querySelector(".seller");
let cart = document.querySelector(".cart");
let feed = document.querySelector(".feed");
let more = document.querySelector(".more");
 
home.addEventListener("click",function(){
    window.location.href = "/home"
})
seller.addEventListener("click",function(){
    window.location.href = "/order"
})
cart.addEventListener("click",function(){
    window.location.href = "/cart"
})
feed.addEventListener("click",function(){
    window.location.href = "/wallet"
})
more.addEventListener("click",function(){
    window.location.href = "/more"
})


