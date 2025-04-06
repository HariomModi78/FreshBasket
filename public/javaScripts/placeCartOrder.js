let quantity = document.getElementsByClassName("quantity");
let amount = document.querySelector(".amount");
let itemPrice = document.getElementsByClassName("pricejs");
let totalAmount = 0;
// for(let i=0;i<quantity.length;i++){
//     totalAmount += parseFloat(itemPrice[i].innerText);
//     quantity[i].addEventListener("input",function(){
//         amount.innerText = (quantity[i].value *itemPrice[i].innerText + totalAmount - itemPrice[i].innerText) +3 ;
        
//     })
// }

amount.innerText = localStorage.getItem("cartAmount");

let 