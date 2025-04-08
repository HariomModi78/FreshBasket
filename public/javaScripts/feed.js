let item = document.getElementsByClassName("item");
for(let i=0;i<item.length;i++){
    item[i].addEventListener("click",function(){
        window.location.href = `/productView/${item[i].id}`
    })
}