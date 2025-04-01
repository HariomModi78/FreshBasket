let refer = document.querySelector(".refer");
let wallet = document.querySelector(".wallet");
let transaction = document.querySelector(".transaction");
let profile = document.querySelector(".profile");
let subscription = document.querySelector(".subscription");
let order = document.querySelector(".order");
let mySubscription = document.querySelector(".mySubscription");
let support = document.querySelector(".support");
let logout = document.querySelector(".logout");
refer.addEventListener("click",function(){
    window.location.href = "/refer"
})
wallet.addEventListener("click",function(){
    window.location.href = "/wallet"
})
transaction.addEventListener("click",function(){
    window.location.href = "/transaction"
})
profile.addEventListener("click",function(){
    window.location.href = "/profile"
})
subscription.addEventListener("click",function(){
    window.location.href = "/subscription"
})
order.addEventListener("click",function(){
    window.location.href = "/order"
})
mySubscription.addEventListener("click",function(){
    window.location.href = "/mySubscription"
})
support.addEventListener("click",function(){
    window.location.href = "/support"
})
logout.addEventListener("click",function(){
    localStorage.removeItem("email");
    window.location.href = "/logout"
})
