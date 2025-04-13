let user = document.getElementsByClassName("user");

for(let i=0;i<user.length;i++){
    user[i].addEventListener("click",function(event){
    console.log(event.target.id)

        window.location.href = `/admin/milk/${event.target.id}`
    })
}