for (i = 0; i <= 19; i++) {
    fetch(`https://fakestoreapi.com/products/${i + 1}`)
        .then(res => res.json())
        .then(j => {
            
            let truncatedTitle = truncateText(j.title); 
            let heading = extractTitle(j.title);
            
            document.querySelector(".row").innerHTML += `
                <div class="col-3 item">
                    <div class="image"><img src="${j.image}" alt=""></div>
                      <h2>${heading}</h2>
                      <p title="${j.title}">  ${truncatedTitle}</p>
                </div>`

                //made flash cards
               
                // document.querySelector(".flash").innerHTML +=  
                
            

            })
        

}

function truncateText(text) {
    let words = text.split(" ");
    return words.length > 5 ? words.slice(1, 5).join(" ") + "..." : text;

}

function extractTitle(text) {
    let word = text.split(" ");
    return word[0];
    
}

