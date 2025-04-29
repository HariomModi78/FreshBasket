let refer = document.querySelector(".refer");
let wallet = document.querySelector(".wallet");
let transaction = document.querySelector(".transaction");
let profile = document.querySelector(".profile");
let subscription = document.querySelector(".subscription");
let order = document.querySelector(".order");
let mySubscription = document.querySelector(".mySubscription");
let support = document.querySelector(".support");
let logout = document.querySelector(".logout"); 
let delivery = document.querySelector(".delivery"); 
refer.addEventListener("click",function(){
    refer.style.cssText = "background-color:black;color:white";
    setTimeout(function(){
    refer.style.cssText = "background-color:white;color:black";
    },1000)
    window.location.href = "/refer"
})
wallet.addEventListener("click",function(){
    wallet.style.cssText = "background-color:black;color:white";
    setTimeout(function(){
        wallet.style.cssText = "background-color:white;color:black";
    },1000)
    window.location.href = "/feed"
})
transaction.addEventListener("click",function(){
    transaction.style.cssText = "background-color:black;color:white";
    setTimeout(function(){
        transaction.style.cssText = "background-color:white;color:black";
    },1000)
    window.location.href = "/transaction"
})
profile.addEventListener("click",function(){
    profile.style.cssText = "background-color:black;color:white";
    setTimeout(function(){
        profile.style.cssText = "background-color:white;color:black";
    },1000)
    window.location.href = "/profile"
})
subscription.addEventListener("click",function(){
    subscription.style.cssText = "background-color:black;color:white";
    setTimeout(function(){
        subscription.style.cssText = "background-color:white;color:black";
    },1000)
    window.location.href = "/subscription"
})
order.addEventListener("click",function(){
    order.style.cssText = "background-color:black;color:white";
    setTimeout(function(){
        order.style.cssText = "background-color:white;color:black";
    },1000)
    window.location.href = "/sellerSignup"
})
mySubscription.addEventListener("click",function(){
    mySubscription.style.cssText = "background-color:black;color:white";
    setTimeout(function(){
        mySubscription.style.cssText = "background-color:white;color:black";
    },1000)
    window.location.href = "/mySubscription"
})
support.addEventListener("click",function(){
    support.style.cssText = "background-color:black;color:white";
    setTimeout(function(){
        support.style.cssText = "background-color:white;color:black";
    },1000)
    window.location.href = "/support"
})
logout.addEventListener("click",function(){
    logout.style.cssText = "background-color:black;color:white";
    setTimeout(function(){
        logout.style.cssText = "background-color:white;color:black";
    },1000)
    localStorage.removeItem("email");
    window.location.href = "/logout";
})
delivery.addEventListener("click",function(){
    delivery.style.cssText = "background-color:black;color:white";
    setTimeout(function(){
        delivery.style.cssText = "background-color:white;color:black";
    },1000)
    window.location.href = "/deliveryBoyRegistration"
})


