let order = document.getElementsByClassName("order");

for(let i=0;i<order.length;i++){
    order[i].addEventListener("click",function(){
        window.location.href = `/orderStatus/${order[i].id}`
    })
}
