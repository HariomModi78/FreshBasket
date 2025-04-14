let home = document.querySelector(".home");
let seller = document.querySelector(".seller");
let cart = document.querySelector(".cart");
let milk = document.querySelector(".milk");
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
milk.addEventListener("click",function(){
    window.location.href = "/admin/milkUpload"
})
more.addEventListener("click",function(){
    window.location.href = "/admin/more"
})


