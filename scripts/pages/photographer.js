const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const profilSection = document.querySelector(".photograph-header");
const mediaSection = document.querySelector(".media_section");
let likesCounter = 0;
const counterHolder = document.querySelector(".counter");
const priceHolder = document.querySelector(".price");
const lightBox = document.querySelector(".slide-bground");
const previewBox = document.querySelector(".preview-box");
const closeButton = document.querySelector(".icon");
const previewImage = document.querySelector(".previewImage");
const previewVideo = document.querySelector(".previewVideo");
const sourceTitle = document.querySelector(".mediaTitle");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const dropDown = document.getElementById("dropdown");
let selectedValue = dropDown.value;
let previewIndex = 0;
let mediaSrc = [];
let profil = [];
let media = [];

async function getProfilMedia() {
  await fetch("./data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      profil = data.photographers.find(
        (photographer) => photographer.id === +id
      );
      media = data.media.filter((media) => media.photographerId === +id);
    });

  return { profil, media };
}

async function init() {
  data = await getProfilMedia();

  displayProfilMedia(data);
}
init();

/* ========== Fonctions utilitaires =========== */
// Likes :
function addLikes(id) {
  const mediaLikes = document.getElementById(id).querySelector(".likes");
  const currentLikes = mediaLikes.innerHTML;
  likesCounter += 1;
  counterHolder.innerHTML = likesCounter;
  mediaLikes.innerHTML = +currentLikes + 1;
}

// CloseButton:
const closePreview = function () {
  previewBox.classList.remove("show");
  lightBox.style.display = "none";
};
closeButton.addEventListener("click", (event) => {
  event.preventDefault();
  closePreview();
});

// Show Preview box:
function displayPreview() {
  const src = mediaSrc[previewIndex];
  lightBox.style.display = "block";
  if (src.endsWith("jpg")) {
    previewBox.classList.add("show");
    previewVideo.classList.add("hide");
    previewImage.classList.remove("hide");
    previewImage.src = `assets/photos/${src}`;
  } else if (src.endsWith(".mp4")) {
    previewBox.classList.add("show");
    previewImage.classList.add("hide");
    previewVideo.classList.remove("hide");
    previewVideo.setAttribute("controls", "controls");
    previewVideo.src = `assets/photos/${src}`;
  } else {
    console.log("No Preview");
  }
}

function showPreview(index) {
  previewIndex = index;
  displayPreview();
}

// Prev/Next media:
function prevPreview() {
  previewIndex -= 1;
  displayPreview();
}
prevButton.addEventListener("click", prevPreview);
prevButton.addEventListener("keyup", prevPreview);

function nextPreview() {
  previewIndex += 1;
  displayPreview();
}
nextButton.addEventListener("click", nextPreview);
nextButton.addEventListener("keydown", nextPreview);

/* ======= Construction du DOM ======= */
const displayMedia = (media, index) => {
  mediaSrc[index] = media.image || media.video;
  const mediaDOM = mediaFactory(media).getMediaCardDOM();
  mediaSection.appendChild(mediaDOM);
  //Likes:
  const heart = mediaDOM.getElementsByClassName("heartIcon")[0];
  heart.addEventListener("click", () => addLikes(media.id));
  likesCounter += media.likes;
  counterHolder.innerHTML = likesCounter;
  //Media preview:
  const galleryElement = mediaDOM.querySelector(".gallery");
  galleryElement.addEventListener("click", () => showPreview(index));
  sourceTitle.innerHTML = media.title; //Show media name tag
};

async function displayProfilMedia({ profil, media }) {
  const profilDOM = profilFactory(profil).getProfilCardDOM();
  profilSection.appendChild(profilDOM);
  priceHolder.innerHTML = profil.price + " €/Jour";

  media.forEach((media, index) => {
    displayMedia(media, index);
  });
}

// Dropdown List:

dropDown.addEventListener("change", getSort);
function getSort() {
  const value = dropDown.options[dropDown.selectedIndex].innerHTML;

  //console.log(`sort by ${value}`);
  //tester la valeur de la dropdown:
  if (value == "Popularité") {
    sortByLikes();
  } else if (value == "Date") {
    sortByDate();
  } else {
    sortByTitle();
  }
}

function sortByLikes() {
  const sortedData = media.sort((a, b) => {
    return b.likes - a.likes;
  });
  mediaSection.innerHTML = "";
  sortedData.map((media) => displayMedia(media));
}

function sortByDate() {
  const sortedData = media.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  mediaSection.innerHTML = "";
  sortedData.map((media) => displayMedia(media));
}

function sortByTitle() {
  const sortedData = media.sort((a, b) => {
    return a.title > b.title ? 1 : -1;
  });
  mediaSection.innerHTML = "";
  sortedData.map((media) => displayMedia(media));
}
