let one = document.querySelector(".one");
let two = document.querySelector(".two");
let three = document.querySelector(".three");
let four = document.querySelector(".four");
let otp = document.querySelector(".submitOtp")
one.addEventListener("input",function(){
        two.focus();
})
two.addEventListener("input",function(){
        three.focus();
})
three.addEventListener("input",function(){
        four.focus();
})
four.addEventListener("input",function(){
        otp.focus();
        otp.style.cssText = "background-color:green"
})