let pay = document.querySelector(".pay");

pay.innerText = `₹${localStorage.getItem("totalPrice")}/-`

let totalBalance  = document.querySelector(".balance");
let checkBox = document.querySelector(".check")
console.log(checkBox)
let flag = false;
checkBox.addEventListener("click",function(){
    if(parseFloat(totalBalance.innerText)>=parseFloat(localStorage.getItem("totalPrice")) || flag){
        flag = true;
        if(checkBox.checked){
            totalBalance.innerText = parseFloat(totalBalance.innerText)-localStorage.getItem("totalPrice")

            
        }else{
            totalBalance.innerText = parseFloat(totalBalance.innerText)+parseFloat(localStorage.getItem("totalPrice"))

        }

    }
    else{
        if(checkBox.checked){
        totalBalance.style.cssText = "color:red"
        }
        else{
            totalBalance.style.cssText = "color:black"

        }
    }
    
})