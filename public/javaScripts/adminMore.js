let permission = document.querySelector(".permission");
let revenue = document.querySelector(".revenue");
let subscription = document.querySelector(".subscription");
let bill = document.querySelector(".bill");
let refer = document.querySelector(".refer");
let employ = document.querySelector(".employ");
permission.addEventListener("click",function(){
    window.location.href = "/admin/permission"
})
revenue.addEventListener("click",function(){
    window.location.href = "/admin/revenue"
})

subscription.addEventListener("click",function(){
    window.location.href = "/admin/subscription"
})
bill.addEventListener("click",function(){
    window.location.href = "/admin/farmerBill"
})
refer.addEventListener("click",function(){
    window.location.href = "/admin/refer"
})
employ.addEventListener("click",function(){
    window.location.href = "/admin/employ"
})

