let discriptionButton = document.querySelector(".discriptionButton");
let discription = document.querySelector(".discription");
let arrow = document.querySelector("#arrow");
let count = 0;
discriptionButton.addEventListener("click",function(){
    if(count%2==0){
    discription.style.cssText = "display:block";
    arrow.classList = "ri-arrow-down-s-line";
    }
    else{
    discription.style.cssText = "display:none";
    arrow.classList = "ri-arrow-right-s-line";

    }
    count++;
})

let item = document.getElementsByClassName("item");
for(let i=0;i<item.length;i++){
    item[i].addEventListener("click",function(){
        window.location.href = `/productView/${item[i].id}`
    })
}

let buy = document.querySelector(".buy");
let addToCart = document.querySelector(".addToCart");

buy.addEventListener("click",function(){
    window.location.href = `/placeOrder/${buy.id}`
})