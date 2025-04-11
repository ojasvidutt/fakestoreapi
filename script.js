
fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {

        data.slice(0, 20).forEach(j => {
            let truncatedTitle = truncateText(j.title);
            let heading = extractTitle(j.title);

            document.querySelector(".row").innerHTML += `
                <div class="col-3 item col-p-12" id=${j.id}>
                    <div class="image"><img src="${j.image}" alt=""></div>
                    <h2>${heading}</h2>
                    <p class = "title2" title="${j.title}">  ${truncatedTitle}</p>
                    <p class="describe">${j.description}</p>
                    <p class="cost">${j.price}</p>
                    <p class="category">${j.category}</p>
                    <div class="rat ">${j.rating.rate} <small class="num">${j.rating.count} </small></div>
                      
                </div>`;

           


        });

        document.querySelectorAll(".item").forEach(item => {
            item.addEventListener("click", (event) => {

                event.stopPropagation(); // to prevent flash from closing as soon as it opens cuz document also uses click
                //flash card is generated and becomes visible and background blurs
                let img = item.querySelector("img").src;
                let title = item.querySelector("h2").textContent;
                let title2 = item.querySelector(".title2").title;
                let description = item.querySelector(".describe").textContent;
                let rating = item.querySelector(".rat").childNodes[0].textContent;
                let people = item.querySelector(".num").textContent;
                let price = item.querySelector(".cost").textContent;



                document.querySelector(".flash").innerHTML = ` 
                <button class="back fa fa-arrow-left"></button>
                 <img src="${img}" alt="">
                   <p class="ptitle"> ${title2}</p> 
                   
                   <p class=" desc">${description}</p>
                   <p class="price"> $ ${price}</p>
                   <div class="rating "> ${rating} &#11088; <small> ${people} ratings</small></div>
                   <button class="addtocart">Add To Cart <span class= " fa fa-cart"></span></button>
                  `;

                document.querySelector(".flash").style.display = "grid";
                document.querySelector(".container").style.opacity = "0.5";


                // adding back button in flash
                document.querySelector(".back").addEventListener("click", (event) => {
                    document.querySelector(".flash").style.display = "none";
                    document.querySelector(".container").style.opacity = "1"
                    event.stopPropagation();
                    console.log("clicked")
                });

             
                
                //add to cart 

                document.querySelector(".addtocart").addEventListener("click",(event)=>{
            
                    document.querySelector(".addtocart").disabled=true;
                  
                    let title  = document.querySelector(".ptitle").textContent;
                    let img  = document.querySelector(".flash img").src;
                    let price  = document.querySelector(".price").textContent;
                    document.cookie=`title=${title}`;
                    document.cookie=`img=${img}`;
                    document.cookie=`price=${price}`;

        
                   let div= document.createElement("div");
                   div.classList.add("box");
                   document.querySelector("main").appendChild(div);
                   div.innerHTML=`<div class="cartitem flex">
                        <img src="${extractCookie("img")}" alt="" >
                        <div class="text">
                            <h2 class="name">${truncateText(extractCookie("title"))}</h2>
                            <p class="cartprice"> ${extractCookie("price")}</p>
                            <div class="count" style= "display:block; position: static; margin-top:10px"><button class="plus">+</button><span class="countnum">1</span><button class="minus">-</button></div>
                            <button class="removecartitem">REMOVE ITEM</button>

                        </div>`
                   div.style.display="none";
                        console.log(document.querySelector(".box"));

                        
              // count of items
              setTimeout(() => {
                let count= 1;
            div.querySelector(".plus").addEventListener("click",(e)=>{
              
             cartitem = e.target.parentElement;
              count++;
              cartitem.querySelector(".count .countnum").textContent=count;
              console.log( cartitem.querySelector(".count .countnum"))
              console.log(count);
                        })

                        
                        div.querySelector(".minus").addEventListener("click",(e)=>{
              
                            cartitem = e.target.parentElement;
                         if (count>0) {count-- ;}
                          cartitem.querySelector(".count .countnum").textContent=count;
                                    })
                
            }, 500);

            //remove button in cart

            div.querySelector(".removecartitem").addEventListener("click",(e)=>{
              e.target.parentElement.parentElement.style.display="none";
              e.target.parentElement.querySelector(".countnum").textContent =0;
            })

                         // adding count to cart items
        //                  let count= 0;
        //   document.querySelector(".plus").addEventListener("click",()=>{
            
           
        //     count++;
        //     document.querySelector(".count .num").innerHTML=count;
        //     console.log(count);
        //               })
        //               document.querySelector(".minus").addEventListener("click",()=>{
            
                        
        //                if (count>0) {count-- ;}
        //                 document.querySelector(".count .num").innerHTML=count;
        //                           })

                



        //// hide duplicates in cart
                //    document.querySelectorAll(".box").forEach((i)=>{
                //     document.querySelectorAll(".box").forEach((j)=>{
                //            if(i===j){
                //             i.style.display="none"
                //         } 
                //     }) })
        
                //   })

            })




        })
        document.addEventListener("click", () => {
            document.querySelector(".flash").style.display = "none";
            document.querySelector(".container").style.opacity = "1"


        })
        document.querySelector(".flash").addEventListener("click", (event) => {
            event.stopPropagation();
        });

        // search bar 

        document.querySelector(".search").addEventListener("submit", (e) => {

            
            e.preventDefault();

            let found= false;
           let query = document.querySelector(".search input").value.toLowerCase();
           document.querySelectorAll(".item").forEach((i)=>{
            
           let title = i.querySelector(".title2").title.toLowerCase();
           if(title.includes(query)){
            i.style.display="block";
            found=true;
           }
           else{
              i.style.display="none";
           }
          
           })
           if(!found){
        document.querySelector(".notfound").style.display="block";
            
        }
        else{
            document.querySelector(".notfound").style.display="none";
        }
          
        })

       
             // after search result functional home button to go back to home page
          document.querySelector(".home").addEventListener("click",(e)=>{
            e.preventDefault();
            document.querySelectorAll(".box").forEach((i)=>{
                i.style.display="none";
            })
            const finalBox = document.querySelector(".final");
            if (finalBox) {
                finalBox.remove();
            }

            document.querySelectorAll(".item").forEach((i)=>{
                i.style.display="block";
            })
            document.querySelectorAll(".categories li").forEach((btn) => {
                btn.style.border = "none";
            });
          })

       
    let arr= [];
          document.querySelectorAll(".item").forEach((i)=>{
          
          arr.push( i);
          })
          
          document.querySelector(".htol").addEventListener("click",(e)=>{
            e.preventDefault();
            
          
            let sorteditems = arr.sort((a,b)=>extractPrice(b.querySelector(".cost").textContent)- extractPrice(a.querySelector(".cost").textContent))
            document.querySelector(".row").replaceChildren(...sorteditems);

                  
          })
                 
          document.querySelector(".ltoh").addEventListener("click",(e)=>{
            e.preventDefault();
             document.querySelector(".row").innerHTML=""
            console.log(arr);
          
            let sorteditems2 = arr.slice().sort((a,b)=>extractPrice(a.querySelector(".cost").textContent)- extractPrice(b.querySelector(".cost").textContent))
            document.querySelector(".row").replaceChildren(...sorteditems2);

           
          })
         
         
          //adding cart page
          document.querySelector(".cart").addEventListener("click",(e)=>{
            document.querySelector(".categories").style.display="none";
            e.preventDefault();
            document.querySelectorAll(".item").forEach((i)=>{
                 i.style.display = "none";
            })
            document.querySelectorAll(".box").forEach((i)=>{
                i.style.display = "block";
           })
        let div=  document.createElement("div");
        div.classList.add("box","final");
        document.querySelector("main").appendChild(div);

           setInterval(() => {
            document.querySelector(".final").innerHTML=` <div class="checkout" > TOTAL PRICE : <span> $ ${totalPrice()} </span></div>`
            
           }, 100);

          })

        

        
          
    })




    // document.querySelector(".flash").innerHTML = ` 
    // <button class="back">&#129120;</button>
    //  <img src="${img}" alt="">
    //    <p class="ptitle"> ${title2}</p> 
       
    //    <p class=" desc">${description}</p>
    //    <p class="price"> $ ${price}</p>
    //    <div class="rating "> ${rating} &#11088; <small> ${people} ratings</small></div>
    //    <button class="addtocart">Add To Cart <span class= " fa fa-cart"></span></button>`;


   //filter 
   document.querySelector(".filter").addEventListener("click",function() {
              
    document.querySelector(".drop").classList.toggle("hide")
    if(this.style.borderRadius== "10px 10px 0px 0px"){
        this.style.borderRadius="10px"
    }
    else{
        this.style.borderRadius= "10px 10px 0px 0px"
    }
})


function totalPrice() {
    let prices = [];
    document.querySelectorAll(".cartitem").forEach((i)=>{
   
      prices.push(parseFloat(i.querySelector(".cartprice").textContent.replace("$", "").trim()) * parseInt(i.querySelector(".countnum").textContent)) 
     
    })
    let sum = prices.reduce((a, b) => a + b, 0);
    return sum.toFixed(2);
    
    
}
function truncateText(text) {
    let words = text.split(" ");
    return words.length > 5 ? words.slice(1, 5).join(" ") + "..." : text;

}

function extractTitle(text) {
    let word = text.split(" ");
    return word[0];

}

function extractPrice(price) {
    // console.log (price.split(" "))
    // console.log (price.split(" ").at(0));
    return parseFloat( price.split(" ").at(0));
    
}

function extractCookie(name) {

   let cook= document.cookie.split("; ");
   cook.forEach((i)=>{
let [key,value]= i.split("=");
if(key=== name){
    res= value;
}

   })
return res;
}

// name=username
// document.cookie = "name = username";
// console.log(extractCookie("name"))
  //adding categories bar
        
  let categories= [...document.querySelectorAll(".category")];
  let categorytext = new Set();
  let cattextcaps= []
 
 


  categories.forEach(el => {
categorytext.add(el.textContent);
  });
  console.log(categorytext)

categorytext.forEach((i)=>{
let li =  document.createElement("li");
document.querySelector(".categories ul").appendChild(li);
li.textContent=i;

}) 

document.querySelectorAll(".categories li").forEach((i)=>{
    i.addEventListener("click",(e)=>
    {   

    
        document.querySelectorAll(".categories li").forEach((btn) => {
            btn.style.border = "none";
        });
     document.querySelectorAll(".category").forEach((j)=>{
        if(i.textContent===j.textContent){
            j.parentElement.style.display="block";
        }
        else{j.parentElement.style.display="none";}
     })

     i.style.border=" 2px solid black";
    }
    )
})

    })
