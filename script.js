
const searchImage = document.getElementById("searchs");
const searchButton = document.getElementById('showbutton')
const imageContainer = document.querySelector('.search-results')
const showMoreButton = document.getElementById('showMoreButton');

let pageno = 1;
const apiKey ="7UYkjeT-TvYoVvQwxTY2PxXZ25Ldk6gPbO-ST3F-YHQ";
displayrandom();

searchButton.addEventListener('click',()=>{
    const query = searchImage.value;
    if (query !== ""){
        showImages(query);
        
    }
    
});

showMoreButton.addEventListener('click',()=>{
    const query = searchImage.value;
    if(query!==""){
        page++;
        showImages(query,pageno);
    }
});

async function displayrandom() {
    const response = await fetch (`https://api.unsplash.com/photos/random?count=10&client_id=${apiKey}`);
    const data = await response.json();
   
    imageContainer.innerHTML=""
     data.forEach(image => {
        const imageResult = createImageCard(image.urls.regular,image.alt_description);
        imageContainer.appendChild(imageResult);
     });
}

async function showImages(query, page = 1) {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}&page=${pageno}`);
    const data = await response.json();

    if (page === 1) {
        imageContainer.innerHTML = "";
    }

    data.results.forEach(image => {
        const imageResult = createImageCard(image.urls.regular, image.alt_description);
        imageContainer.appendChild(imageResult);
    });

    if (data.total_pages > pageno) {
        showMoreButton.style.display = "block";
    } else {
        showMoreButton.style.display = "none";
    }
}
function createImageCard(imgSrc,altDescripton){
    const imageResult =document.createElement("div");
    imageResult.className ="image-result";
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = altDescripton;
    
    imageResult.appendChild(img);
    return imageResult;
}