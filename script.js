const accessKey = "nQh859x6qGfgGQ3_EtbutCdAbHHoGCsvHEOReo4F2GU";

const formE1 = document.querySelector("form")
const inputE1 = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-btn")

let inputData = ""
let page = 1

async function searchImages(){
    inputData = inputE1.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url)
    const data = await response.json()

    const results =data.results;

    if(page == 1){
        searchResults.innerHTML = ""
    }

    results.map((result)=> {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-box");
        const boxLink = document.createElement('a')
        boxLink.href = result.links.html;
        boxLink.target = "_blank"
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement('a')
        imageLink.href = result.links.html;
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description;

        boxLink.appendChild(image)
        imageWrapper.appendChild(boxLink)
        imageWrapper.appendChild(imageLink)
        searchResults.appendChild(imageWrapper)
    });

    page++
    if(page>1){
        showMore.style.display= "block"
    }
}
formE1.addEventListener("submit",(e) => {
    e.preventDefault();
    page = 1
    searchImages();
})

showMore.addEventListener("click",()=>{
    searchImages();
})
