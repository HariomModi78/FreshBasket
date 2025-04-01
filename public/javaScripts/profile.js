let main = document.querySelector("main");
let feedbackjs = document.querySelector(".feedbackjs");

main.addEventListener("click",function(event){
    if(event.target.className == "input"){
        feedbackjs.style.cssText = "display:flex"
    }
    else{
        feedbackjs.style.cssText = "display:none"

    }
})
