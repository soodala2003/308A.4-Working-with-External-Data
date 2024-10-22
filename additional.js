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
        //console.log(storedBreeds);
        for (let i = 0; i < storedBreeds.length; i++) {
            const breed = storedBreeds[i];
            let option = document.createElement("option");
  
            option.value = `${breed.id}`;
            option.innerHTML = `${breed.name}`;
            breedSelect.appendChild(option);
        }
        return storedBreeds;
    } catch (errors) {
        console.error(errors);
    }
    createCarousel();
    // Reset the select element
    breedSelect.selectedIndex = -1;
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
  
// Create the initial carousel.
function createCarousel() {
    for (let i = 0; i < storedBreeds.length; i++) {
        let breed = storedBreeds[i];
        let carouselEl = document.createElement("div");
        
        carouselEl.setAttribute("id", `${breed.id}`);
        carouselEl.setAttribute("class", "carousel-item");
        carouselEl.textContent = `${breed.name}`;
        parentEl.appendChild(carouselEl);
    }
}

getFavouritesBtn.addEventListener("click", function () {
    const selectedBreedId = breedSelect.value; //console.log(selectedBreedVal); 
    const selectedBreedIndex = breedSelect.selectedIndex;
  
    let selectedBreed = storedBreeds[selectedBreedIndex]; //console.log(selectedBreed.name);
    let carouselElement = document.getElementById(`${selectedBreedId}`);
  
    carouselElement.setAttribute("class", "carousel-item active");
    Carousel.appendCarousel(carouselElement);
  
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
  
    // Reset the select element
    breedSelect.selectedIndex = -1;
    //return selectedBreedId = selectedBreedVal;
});

console.log(breedSelect.value);
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
      console.error(`Error`);
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
        console.log("Response done."); // or "Response done.");
    })
    .catch((error) => {
        console.log(error);
    });
  
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */

// const URL = "https://api.thecatapi.com/v1/breeds";
export async function favourite(imgId) {
    // your code here
    //const catId = 


    const response = await axios({
        method: "post",
        url: "https://api.thecatapi.com/v1/favourites",
        headers: {
            "x-api-key": API_KEY,
        },
    });

    const favourites = response.data;
}
