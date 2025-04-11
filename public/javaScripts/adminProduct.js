let categary  = document.getElementsByClassName("categaryBox");
console.log("js is working")
for(let i=0;i<categary.length;i++){
    categary[i].addEventListener("click",function(event){
        console.log(event.target.id)
        window.location.href = `/admin/categary/update/${event.target.id}`
    })
}

let newOption = document.querySelector(".new");

newOption.addEventListener("click",function(){
    window.location.href = "/admin/add/categary"
})