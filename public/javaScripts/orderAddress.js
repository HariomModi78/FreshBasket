let editAddress = document.querySelector(".addressText");
let newAddress = document.querySelector("input");
editAddress.addEventListener("input",function(){
    newAddress.value = editAddress.innerText;
})

// 