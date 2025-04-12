let one = document.querySelector(".one");
let two = document.querySelector(".two");
let three = document.querySelector(".three");
let four = document.querySelector(".four");
let otp = document.querySelector(".submitOtp")
let icon = document.querySelector(".logo")
let form = document.querySelector("form")

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
form.addEventListener("submit",function(){
        icon.classList = "motion logo";
        setTimeout(function(){
                icon.classList.remove("motion")
        },3000)
})


window.addEventListener("load", function() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("content").style.display = "block";
    });
