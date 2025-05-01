let done = document.getElementsByClassName("done");

let buy = document.getElementsByClassName("addToCart");

for(let i=0;i<buy.length;i++){
    buy[i].addEventListener("click",function(){
        let count = 0;
    
        let interval = setInterval(function(){
            done[i].style.cssText = `width:${count}%`
            count++;
            if(count==100){
                clearInterval(interval);
                done[i].style.cssText = `width:${0}%`
    
            }
        },10)
    })
}

let like = document.getElementsByClassName("like");

for(let i=0;i<like.length;i++){
    like[i].addEventListener("click",function(){
       like[i].src = "https://cdn-icons-png.flaticon.com/128/3983/3983855.png";
       like[i].style.cssText = "opacity:1"
    })
}