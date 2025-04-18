socket = io();

if(localStorage.getItem("email") ){
        window.location.href = `/token/${localStorage.getItem("email")}`
}
  
