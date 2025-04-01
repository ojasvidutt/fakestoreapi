for(i=0;i<=19;i++){
 fetch(`https://fakestoreapi.com/products/${i+1}`)
            .then(res=>res.json())
            .then(j=>{document.querySelector(".row").innerHTML+=`<div class="col-3">${j.title}
            <img src="${j.image}" alt="">
            </div>`;}
        );
}

