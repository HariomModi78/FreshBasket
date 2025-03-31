let home = document.querySelector(".home");
let seller = document.querySelector(".seller");
let cart = document.querySelector(".cart");
let feed = document.querySelector(".feed");
let more = document.querySelector(".more");

home.addEventListener("click",function(){
    window.location.href = "/admin/product"
})
seller.addEventListener("click",function(){
    window.location.href = "/admin/user"
})
cart.addEventListener("click",function(){
    window.location.href = "/admin/order"
})
feed.addEventListener("click",function(){
    window.location.href = "/admin/revenue"
})
more.addEventListener("click",function(){
    window.location.href = "/admin/more"
})


