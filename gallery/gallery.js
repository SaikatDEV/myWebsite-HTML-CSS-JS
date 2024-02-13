const auth = "hphS7UKF57sXEN3ZN8kIVtAzRQUI722C7LEVeV7kLMLlbuGB8PO0dOIX";
// const searchPhotoAPI =
//   "https://api.pexels.com/v1/search?query=&per_page=1&per_page=15";

const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const moreButton = document.querySelector(".more");
const warning = document.querySelector(".warningMessage");

let searchValue;
let pageNumber = 1;
let moreSearchInput;
let perPage = 9;
let randomNumber = Math.floor(Math.random() * 100 + 1);
// let imageCount = 0;

// Add event listener with search input SO we can grab the values--------------
searchInput.addEventListener("input", enteredinputValue);

// We need to add arrow func below, while we run the searchPhotos func, We can pass the inputValue parameter
form.addEventListener("submit", (e) => {
  // This below preventDefault will stop refreshing the page
  e.preventDefault();
  //   console.log(searchValue);
  searchPhotos(searchValue);
});

moreButton.addEventListener("click", () => {
  console.log(moreSearchInput);
  loadMoreImages(moreSearchInput);
});

// -----------------------------------------------------------------------------
function enteredinputValue(e) {
  moreSearchInput = e.target.value;
  searchValue = e.target.value;
}

// Creating the func to fetch curated photos from api-----------------
async function curatedPhotos() {
  const pageAPI = `https://api.pexels.com/v1/curated/?page=${randomNumber}&per_page=${perPage}`;
  // We are waiting to get some data from below, So we need to use await. As this is a async func
  const data = await fetchApi(pageAPI);

  generatePhotos(data);
}

// This below will modularize the data as re-usable method-----------------
async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  // convert into json object
  const data = await dataFetch.json();
  return data;
}

// This below will modularize the data as re-usable method-----------------
function generatePhotos(data) {
  //   below you can look into the object
  //   console.log(data);
  //   console.log(data.photos[0].photographer);
  data.photos.forEach((eachItem) => {
    //   We need to create a new element with div as below line
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
        <div class="gallery-info">
            <p>${eachItem.photographer}</p>
            <a href=${eachItem.src.original}>Download</a>
        </div>
        <img src=${eachItem.src.large}></img>
        `;
    gallery.appendChild(galleryImg);
  });
}

// search photos func--------------------------------------------------------
async function searchPhotos(inputValue) {
  // i need to call clear func here, So all the photos will be cleared before another search.
  //   https://api.pexels.com/v1/search/?page=2&per_page=1&query=nature
  clearGalleryImages();
  //   const searchPhotoUrl = `https://api.pexels.com/v1/search?query=${inputValue}&per_page=${perPageImages}`;
  const searchPhotoUrl = `https://api.pexels.com/v1/search/?page=${pageNumber}&per_page=${perPage}&query=${inputValue}`;
  const data = await fetchApi(searchPhotoUrl);

  generatePhotos(data);

  hideMoreButton();

  throwWarning();
}

function clearGalleryImages() {
  gallery.innerHTML = "";
  //   This will clear the input field
  searchInput.value = "";
}

async function loadMoreImages(input) {
  pageNumber += 1;

  const searchPhotoUrl = `https://api.pexels.com/v1/search/?page=${pageNumber}&per_page=${perPage}&query=${input}`;
  const data = await fetchApi(searchPhotoUrl);

  generatePhotos(data);
}

function hideMoreButton() {
  if (gallery.innerHTML == "") {
    moreButton.style.display = "none";
  } else {
    //   display the more button
    moreButton.style.display = "block";
  }
}

function throwWarning() {
  if (!gallery.innerHTML == "") {
    warning.style.display = "none";
  } else {
    warning.style.display = "block";
  }
}

hideMoreButton();
// throwWarning();

// invoking the curated function now
curatedPhotos();

// Scroll to the top of the page
window.scrollTo({
  top: 0,
  behavior: "smooth", // Optional: smooth scrolling behavior
});

// One time page refresh after first page load
// window.onload = function () {
//   if (!window.location.hash) {
//     window.location = window.location + "#loaded";
//     window.location.reload();
//   }
// };
