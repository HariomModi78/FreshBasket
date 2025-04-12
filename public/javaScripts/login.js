socket = io();

if(localStorage.getItem("email")){
    socket.emit("login",localStorage.getItem("email"));
    socket.on("done",function(){
        window.location.href = "/pin"
    })
}
  
