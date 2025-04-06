// console.log(new Date().getTime());

let cancel = document.querySelector(".cancel");
cancel.addEventListener("click",function(){
    window.location.href = `/cancelOrder/${cancel.id}`
})