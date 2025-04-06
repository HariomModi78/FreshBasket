let totalAmount = document.getElementsByClassName("totalAmount");
let quantity = document.getElementsByClassName("quantity");
let originalPrice = document.getElementsByClassName("pricejs")
let lastAmount = document.querySelector(".lastAmount");
let amount = 0;
localStorage.setItem("cartAmount",0);

for(let i=0;i<totalAmount.length;i++){
totalAmount[i].innerText = quantity[i].value*originalPrice[i].innerText;
 amount = parseFloat(localStorage.getItem("cartAmount")) +parseFloat(originalPrice[i].innerText);
 console.log(amount)
localStorage.setItem("cartAmount",amount);
// lastAmount.innerText = localStorage.getItem("cartAmount") 

    quantity[i].addEventListener("input",function(){
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

