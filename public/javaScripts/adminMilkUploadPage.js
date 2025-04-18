let time = document.querySelector("select");
let timeInput = document.querySelector(".timeInput")
time.addEventListener("input",function(){
    timeInput.value = time.value;
})