let item = document.getElementsByClassName("item");
let categary = document.getElementsByClassName("categary");
for(let i=0;i<item.length;i++){
    item[i].addEventListener("click",function(){
        window.location.href = `/productView/${item[i].id}`
    })
}
for(let i=0;i<categary.length;i++){
    categary[i].addEventListener("click",function(event){
        if(event.target.id!=""){
            window.location.href = `/categary/${event.target.id}`

        }
    })
}