import * as Carousel from "./Carousel.js";
//import axios from "axios";
//module.exports = axios;
/* const API = axios.create({
	baseURL: 'http://localhost:3000/',
})

export default API;  */
//const axios = require("axios").default;

const body = document.querySelector("body");
// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY =
  "live_2L5qpy6HjWEc4qxT1JVDCifdbhbUKnvSXv3S5Awwj7ygiHvXZgwvqCPjpaBr0tvS";
const URL = "https://api.thecatapi.com/v1/breeds";
let storedBreeds = [];

/**
* 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
*/

async function initialLoad() {
    try {
        console.log("Request begins: ");
        const response = await axios.get(URL, {
            headers: {
                "x-api-key": API_KEY,
            },
        });
    
        storedBreeds = response.data;
        //console.log(storedBreeds[0]);
        for (let i = 0; i < storedBreeds.length; i++) {
            const breed = storedBreeds[i];
            let option = document.createElement("option");
  
            option.value = `${breed.id}`;
            option.innerHTML = `${breed.name}`;
            breedSelect.appendChild(option);
        }
        //return storedBreeds; if included, make an error
    } catch (errors) {
        console.error(errors);
    }
    
    // Reset the select element
    breedSelect.selectedIndex = -1;
    createCarousel();
}

initialLoad();
  
const parentEl = document.getElementById("carouselInner");
const h4 = document.querySelector("h4");
const ul = document.createElement("ul");
const li1 = document.createElement("li");
const li2 = document.createElement("li");
const li3 = document.createElement("li");
const li4 = document.createElement("li");
const li5 = document.createElement("li");
const wikiLink = document.createElement("a");
  
ul.appendChild(li1);
ul.appendChild(li2);
ul.appendChild(li3);
ul.appendChild(li4);
ul.appendChild(li5);

const cloneParentDiv = document.getElementById("clone");
  
//console.log(storedBreeds[0]);  //undefined
// Create the initial carousel.
function createCarousel() {
    for (let i = 0; i < storedBreeds.length; i++) {
        let breed = storedBreeds[i];
        let carouselEl = document.createElement("div");
        /* let img = document.createElement("img");
        img.setAttribute("class", "d-block w-100");
        img.src = breed.image.url;
        img.alt = breed.name;
        carouselEl.appendChild(img); */
        
        //carouselEl.setAttribute("id", `${breed.id}`);
        //carouselEl.setAttribute("class", "carousel-item");
        //carouselEl.textContent = `${breed.name}`;
        parentEl.appendChild(carouselEl);
    }
}

//let selectedBreed = "";

getFavouritesBtn.addEventListener("click", function () {
    //Carousel.clear();
    //createCarousel();
    const selectedBreedId = breedSelect.value;  
    const selectedBreedIndex = breedSelect.selectedIndex;
  
    let selectedBreed = storedBreeds[selectedBreedIndex]; //console.log(selectedBreed.name);
    //let carouselElement = document.getElementById(`${selectedBreedId}`);
    console.log(selectedBreed);

    //let img = document.createElement("img");
    //img.setAttribute("class", "d-block w-100");
    //img.src = selectedBreed.image.url;
    //img.alt = selectedBreed.name;
    //carouselElement.appendChild(img); 
  
    //carouselElement.setAttribute("class", "carousel-item active");
    //Carousel.clear();
    //Carousel.appendCarousel(carouselElement);
  
    h4.innerHTML = selectedBreed.name;
    h4.appendChild(ul);
    li1.innerHTML = `<p>Description: ${selectedBreed.description}</p>`;
    li2.innerHTML = `<p>Temperament: ${selectedBreed.temperament}</p>`;
    li3.innerHTML = `<p>Origin: ${selectedBreed.origin}</p>`;
    li4.innerHTML = `<p>Life Span: ${selectedBreed.life_span}</p>`;
    li5.innerHTML = `<p>More Information: </p>`;
    wikiLink.setAttribute("href", `${selectedBreed.wikipedia_url}`);
    wikiLink.textContent = `${selectedBreed.wikipedia_url}`;
    li5.appendChild(wikiLink);
  
    let imgSrc = selectedBreed.image.url;
    //console.log(imgSrc);
    let imgAlt = selectedBreed.name;
    //console.log(imgAlt);
    let imgId = selectedBreed.image.id;
    //console.log(imgId);
    let clone = Carousel.createCarouselItem(imgSrc, imgAlt, imgId);

    //document.body.appendChild(clone);
    //cloneParentDiv.remove();
    //cloneParentDiv.insertBefore(clone,cloneParentDiv.lastChild);
    Carousel.appendCarousel(clone);
    //console.log((clone.previousElementSibling).previousElementSibling);

    // Reset the select element
    breedSelect.selectedIndex = -1;
    //console.log(selectedBreedId); //id
    //return selectedBreed; //
});

// Request interceptor will set startTime
axios.interceptors.request.use((config) => {
    config.headers["request-startTime"] = new Date().getTime();
    progressBar.style.width = "0%";
    body.style.cursor = "progress";
    return config;
});
  
axios.interceptors.response.use((response) => {
    const currentTime = new Date().getTime();
    const startTime = response.config.headers["request-startTime"];
    response.headers["request-duration"] = currentTime - startTime;
    body.style.cursor = "default";
    return response;
});
  
axios
    .get(URL)
    .then((response) => {
        console.log(
            `Request took ${response.headers["request-duration"]} milliseconds.`
        );
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });

function updateProgress(progressEvent) {
    const progress = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    console.log(`Request Progress: ${progress} %`);
  }
  
axios
    .get(
        URL,
        { onDownloadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            progressBar.style.width = `${progress}%`;
            console.log(`Request Progress: ${progress} %`);
            },
        },
        { responseType: "json" },
        { header: { "Content-Type": "application/json" } }
    )
    .then((response) => {
        console.log("Response done.", response); // or "Response done.");
    })
    .catch((error) => {
        console.log(error);
    });

export async function favourite(imgId) {
    // your code here
    //const catId = "0XYvRd7oD"; //"abys";  
    const apiUrl = "https://api.thecatapi.com/v1/favourites";

    /* const newFavourite = await axios.post(apiUrl, 
        { headers: {"x-api-key": API_KEY,},},
        { data: {"image_id": imgId, "sub_id": "user-1972"}} 
    );

    newFavourite.then(response => {
        console.log('Cat added to favorites:', response.data);
    }).catch(error => {
        console.error("Error:", error);
    });    */

    axios.post(apiUrl, 
        {headers: {"Content-Type": "application/json",
            "x-api-key": API_KEY,
        }},
        {data: {"image_id": imgId,
            "sub_id": "usee-199"
        }}
    ).then(response => {
        // Update UI to reflect the favorited state
        console.log('Cat added to favorites:', response.data);
    }).catch(error => {
        console.error("Error:", error);
    });  
}

async function getFavourites() {
    axios.get("https://api.thecatapi.com/v1/favourites?limit=5&sub_id=user-199", 
        {headers: {
            "content-type":"application/json",
            "x-api-key": API_KEY
        }}
    ).then(response => {
        console.log(response.data);
    }).catch(error => {
        console.error("Error:", error);
    });
}

getFavourites();

//Carousel.start()