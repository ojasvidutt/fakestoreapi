
fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {

        data.slice(0, 20).forEach(j => {
            let truncatedTitle = truncateText(j.title);
            let heading = extractTitle(j.title);

            document.querySelector(".row").innerHTML += `
                <div class="col-3 item col-p-12">
                    <div class="image"><img src="${j.image}" alt=""></div>
                    <h2>${heading}</h2>
                    <p class = "title2" title="${j.title}">  ${truncatedTitle}</p>
                    <p class="describe">${j.description}</p>
                    <p class="cost">${j.price}</p>
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
                <button class="back">&#129120;</button>
                 <img src="${img}" alt="">
                   <p class="ptitle"> ${title2}</p> 
                   
                   <p class=" desc">${description}</p>
                   <p class="price"> $ ${price}</p>
                   <div class="rating "> ${rating} &#11088; <small> ${people} ratings</small></div>`;

                document.querySelector(".flash").style.display = "grid";
                document.querySelector(".container").style.opacity = "0.5";
             

                // adding back button in flash
                document.querySelector(".back").addEventListener("click",(event)=>{
                    document.querySelector(".flash").style.display="none";
                    document.querySelector(".container").style.opacity="1"
                    event.stopPropagation();
                    console.log("clicked")
                });


            })
            
           
            
           
            })
            document.addEventListener("click",()=>{
                document.querySelector(".flash").style.display="none";
                document.querySelector(".container").style.opacity="1"
            
              
        })
        document.querySelector(".flash").addEventListener("click", (event) => {
            event.stopPropagation();
        });
       
        


            })
        
          
    
    
    




function truncateText(text) {
    let words = text.split(" ");
    return words.length > 5 ? words.slice(1, 5).join(" ") + "..." : text;

}

function extractTitle(text) {
    let word = text.split(" ");
    return word[0];

}


