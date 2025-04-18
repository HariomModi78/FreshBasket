const socket = io();
let card = document.getElementsByClassName("card");
let main = document.querySelector("main");

for(let i=0;i<card.length;i++){
    card[i].addEventListener("click",function(){
        socket.emit("scratch",main.id);
    })
}
socket.on("refresh",function(){
    window.location.href = "/wallet"
})