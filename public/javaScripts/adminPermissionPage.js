let approve = document.querySelector(".approve");
let reject = document.querySelector(".reject");

approve.addEventListener("click",function(){
    window.location.href = `/permission/approve/${approve.id}`
})
reject.addEventListener("click",function(){
    window.location.href = `/permission/reject/${approve.id}`
})