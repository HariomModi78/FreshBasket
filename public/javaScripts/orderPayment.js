let pay = document.querySelector(".pay");
 
pay.innerText = `${localStorage.getItem("totalPrice")}`;

let totalBalance  = document.querySelector(".balance");
let checkBox = document.querySelector(".check");
console.log(checkBox); 
let payOldValue = parseFloat(pay.innerText).toFixed(2);
let balanceOldValue = parseFloat(totalBalance.innerText).toFixed(2);
checkBox.addEventListener("click",function(){
    
        if(checkBox.checked){
            let number = parseFloat(totalBalance.innerText)-parseFloat(localStorage.getItem("totalPrice")).toFixed(2);
            if(number<0){
                pay.innerText = (parseFloat(localStorage.getItem("totalPrice"))-parseFloat(totalBalance.innerText)).toFixed(2);
                totalBalance.innerText = 0;
            }
            else{
                totalBalance.innerText = (number).toFixed(2);
                pay.innerText = 0;
            }

        }else{
            totalBalance.innerText =balanceOldValue;
            pay.innerText = payOldValue;
        }
     
    
})

let confirmOrder =  document.querySelector(".confirmOrder");
let userId =  document.querySelector(".walletDetail");
let done = document.querySelector(".done");
let num = 0;

confirmOrder.addEventListener("click",function(){
    if(num==0){
        if(checkBox.checked && pay.innerText == 0){
            let count = 0;
    
            let interval = setInterval(function(){
                done.style.cssText = `width:${count}%`
                count++;
                if(count==100){
                    clearInterval(interval);
                    done.style.cssText = `width:${0}%`
        
                }
            },10)
            num++;
            window.location.href = `/paymentDone/wallet/${confirmOrder.id}/${localStorage.getItem("item")}`
        }
       
    }
})
