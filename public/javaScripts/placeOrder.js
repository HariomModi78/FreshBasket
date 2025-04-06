
let socket = io();

let change = document.querySelector(".addressChange");
let product = document.querySelector(".order");
change.addEventListener("click",function(){
    window.location.href = `/orderAddress/${change.id}/${product.id}`
})
let totalAmount = document.querySelector(".totalAmount");
let originalPrice = parseFloat(totalAmount.innerText);
let quantity = document.querySelector(".quantity");
let price = document.querySelector(".pricejs");
totalAmount.innerText = `${(quantity.value*originalPrice)+3}`
quantity.addEventListener("input",function(){
    console.log(quantity.value);
    totalAmount.innerText = `${(quantity.value*originalPrice)+3}`
    localStorage.setItem("totalPrice",parseFloat(totalAmount.innerText));
    localStorage.setItem("item",quantity.value);
})

localStorage.setItem("totalPrice",parseFloat(totalAmount.innerText));
localStorage.setItem("item",1);

window.addEventListener("load", function() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("content").style.display = "block";
});
