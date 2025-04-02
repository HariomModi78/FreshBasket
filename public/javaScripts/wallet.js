let input = document.querySelector("input");
let pay = document.querySelector(".pay");
let box= document.getElementsByClassName("box");
for(let i=0;i<box.length;i++){
    box[i].addEventListener("click",function(){
        input.value = (box[i].innerText).replace("₹","");
    })
}
pay.addEventListener("click",function(){
    console.log(input.value)
    window.location.href = `/pay/${input.value}/${pay.id}`
})

