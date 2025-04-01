let input = document.querySelector("input");
let input1 = document.querySelector(".amount");
let addMoney = document.querySelector(".addMoney")
addMoney.addEventListener("click",function(event){
    if(event.target.className == "box"){
        input.value =(event.target.innerText).replace("₹","");
        input1.value =(event.target.innerText).replace("₹","");
    }
})


