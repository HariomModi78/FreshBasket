let report = document.querySelector(".report");

let reportjs = document.querySelector(".reportjs");
let main = document.querySelector("main");
let body = document.querySelector("body");
let download = document.querySelector(".reportDownload");
let downloadCopy = download;
let reportBar = document.querySelector(".reportBar");
main.addEventListener("click",function(event){
    console.log(event.target.id)
    if(event.target.id == "report" || event.target.id == "earning" ){
        reportjs.style.cssText = "display:block";
        console.log("if");
        if(event.target.id == "report"){
            reportBar.appendChild(downloadCopy);
        }
    }
    else{
        reportjs.style.cssText = "display:none"
        console.log("else")
    }
    if(event.target.id == "earning"){
        reportBar.removeChild(download);
    }
    
})

let profit = document.querySelector(".profit");
profit.addEventListener("click",function(){
    window.location.href = "/checkProfit"
})