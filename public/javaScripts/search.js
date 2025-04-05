const socket = io();
let input = document.querySelector("input");
let button = document.querySelector(".button");
let box = document.querySelector(".box");
button.addEventListener("click",function(){
    box.innerText ="Loading..."

    if(input.value != ""){
        socket.emit("searchItem",input.value);
    }
})

socket.on("searchResult",function(product){
    console.log(product);
    box.innerHTML = ""
    for(let i=0;i<product.length;i++){
        let item = document.createElement("div");
        item.className = "item";
        item.id = product[i]._id;
        let image = document.createElement("div");
        image.className = "image";
        let detail = document.createElement("div");
        detail.className = "detail";
        let img = document.createElement("img");
        img.src = product[i].imagePath;
        console.log("Working",i)
        let name = document.createElement("div");
        name.className = "name";
        name.innerText = product[i].name;
        let quantity = document.createElement("div");
        quantity.className = "quantity";
        quantity.innerText = product[i].quantity;
        let price = document.createElement("div");
        price.className = "price";
        price.innerText =`₹${product[i].price}/-`;

        item.appendChild(image);
        image.appendChild(img)
        item.appendChild(detail);
        detail.appendChild(name);
        detail.appendChild(quantity);
        detail.appendChild(price);

        box.append(item)
    }
    let item = document.getElementsByClassName("item");
    console.log(item[0]);
    for(let i=0;i<item.length;i++){
        item[i].addEventListener("click",function(){
            window.location.href = `/productView/${item[i].id}`
        })
    }
    if(product.length ==0){
        console.log("item not found")
        box.innerText ="Item Not Found"
    }
})

