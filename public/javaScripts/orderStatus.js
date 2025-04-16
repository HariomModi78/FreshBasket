// console.log(new Date().getTime());
let count = 0;
if(count ==0){
    let cancel = document.querySelector(".cancel");
    cancel.addEventListener("click",function(){
        cancel.style.cssText = "display:none"
        window.location.href = `/cancelOrder/${cancel.id}`
    })
    count++;
}
