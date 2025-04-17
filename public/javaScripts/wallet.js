let input = document.querySelector("input");
let pay = document.querySelector(".pay");
let box= document.getElementsByClassName("box");
let balance = document.querySelector(".balance");
balance.addEventListener("click",function(){
        window.location.href = "/wallet"
})
for(let i=0;i<box.length;i++){
    box[i].addEventListener("click",function(){
        input.value = (box[i].innerText).replace("₹","");
    })
}
pay.addEventListener("click",function(){
    console.log(input.value)
    if(input.value>0){
        window.location.href = `/pay/${input.value}/${pay.id}`
    }else{
        input.value = input.value * -1;
    }
})