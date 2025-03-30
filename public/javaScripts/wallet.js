let input = document.querySelector("input");
let addMoney = document.querySelector(".addMoney")

addMoney.addEventListener("click",function(event){
    if(event.target.className == "box"){
        input.value =(event.target.innerText).replace("₹","");
    }
})
