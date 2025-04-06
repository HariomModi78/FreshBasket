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

let editDetail = document.querySelector(".editDetail");
let editAddress = document.querySelector(".editAddress");
let detailjs= document.querySelector(".detailjs");
let detailjs1= document.querySelector(".detailjs1");
editDetail.addEventListener("click",function(){
    detailjs1.style.cssText = "bottom:-20rem"

})
editAddress.addEventListener("click",function(){
    detailjs.style.cssText = "bottom:-20rem"
})
main.addEventListener("click",function(event){
    if(event.target.className=="editDetail"){
    detailjs.style.cssText = "bottom:0";
    }
    else if(event.target.className=="editAddress"){
        detailjs1.style.cssText = "bottom:0"
    }else{
        console.log(event.target.className)
        detailjs.style.cssText = "bottom:-20rem"
        detailjs1.style.cssText = "bottom:-20rem"
    }
})