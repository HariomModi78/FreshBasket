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
        item.className = "barItem";
        item.id = product[i]._id;
        let image = document.createElement("div");
        image.classList = "image image1";
        let img = document.createElement("img");
        img.src = product[i].imagePath;
        console.log("Working",i)
        let name = document.createElement("div");
        name.className = "itemName";
        name.innerText = product[i].name;
        let quantity = document.createElement("div");
        quantity.className = "off";
        quantity.innerText = product[i].quantity;
        let price = document.createElement("div");
        price.className = "price";
        let realPrice = document.createElement("div");
        realPrice.className = "realPrice";
        realPrice.innerText =`₹${product[i].price}/-`;

        let stock = document.createElement("div");
        stock.className = "red";
        if(product[i].stock == 0){
            stock.innerText =`Out of Stock`;
        }else if(product[i].stock<= 25){
            stock.innerText =`Only ${product[i].stock} available`;
        }

        item.appendChild(image);
        image.appendChild(img)
        price.appendChild(realPrice);
        item.appendChild(name);
        item.appendChild(quantity);
        item.appendChild(price);
        item.appendChild(stock);
        box.append(item);

    }
    let item = document.getElementsByClassName("barItem");
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

