let addProduct = document.querySelector(".addProduct");

addProduct.addEventListener("click",function(){
    window.location.href = `/admin/add/product/${addProduct.id}`
})

let item = document.getElementsByClassName("item");
for(let i=0;i<item.length;i++){
    item[i].addEventListener("click",function(){
        window.location.href = `/admin/updateProduct/${item[i].id}`
    })
}