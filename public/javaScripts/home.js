const socket = io();

socket.on("confirm",function(){
    let audio = new Audio("/audio/order_mcd.mp3");
    audio.play();
    console.log("working audio")
})
let item = document.getElementsByClassName("item");
let categary = document.getElementsByClassName("categary");
let input = document.querySelector(".input");
let main = document.querySelector("main");

let y=0; 
window.addEventListener("scroll",function(event){
    if(window.scrollY>0 && window.scrollY>y){
        home.style.cssText = "animation:move linear forwards 1s;"
        feed.style.cssText = "animation:move linear forwards 1s;"
        cart.style.cssText = "animation:move linear forwards 1s;"
        seller.style.cssText = "animation:move linear forwards 1s;"
        more.style.cssText = "animation:move linear forwards 1s;"
        setTimeout(function(){
            y = window.scrollY;
        },300);
        console.log("y = ",y);
    }
    else{
        home.style.cssText = "animation:move1 linear forwards 1s;"
        feed.style.cssText = "animation:move1 linear forwards 1s;"
        cart.style.cssText = "animation:move1 linear forwards 1s;"
        seller.style.cssText = "animation:move1 linear forwards 1s;"
        more.style.cssText = "animation:move1 linear forwards 1s;"
        setTimeout(function(){
            y = window.scrollY;
        },300);
        

    }
console.log(window.scrollX)
console.log(window.scrollY)
})
for(let i=0;i<item.length;i++){
    item[i].addEventListener("click",function(){
        window.location.href = `/productView/${item[i].id}`
    })
}
for(let i=0;i<categary.length;i++){
    categary[i].addEventListener("click",function(event){
        if(event.target.id!=""){
            window.location.href = `/categary/${event.target.id}`

        }
    })
}
if(localStorage.getItem("email")){
    
}
else{
    socket.emit("login",input.id);
    localStorage.setItem("email",input.id);
    socket.on("done",function(){
        window.location.href = `/token/${input.id}`
    })
}

input.addEventListener("click",function(){
    window.location.href = "/search"
})