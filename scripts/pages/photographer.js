const urlParams = new URLSearchParams(window.location.search); //récupère l'url et la met dans urlParams
const id = urlParams.get("id"); //récupère la valeur du champ id dans urlParams et la met dans la const id

async function getProfilMedia() {
  let profil = [];
  let media = [];

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

async function displayProfilMedia({ profil, media }) {
  const profilSection = document.querySelector(".photograph-header");
  const mediaSection = document.querySelector(".media_section");

  const profilModel = profilFactory(profil);
  const profilDOM = profilModel.getProfilCardDOM();
  profilSection.appendChild(profilDOM);

  let likesCounter = 0;
  media.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaDOM);
    likesCounter += media.likes;
  });
  const priceHolder = document.querySelector(".price");
  priceHolder.innerHTML = profil.price + " €/Jour";

  const counterHolder = document.querySelector(".counter");
  counterHolder.innerHTML = likesCounter;
}

async function init() {
  const data = await getProfilMedia();
  displayProfilMedia(data);
}
init();

/* Like counter:*/
const heartElement = document.querySelectorAll(".likes");
console.log(heartElement.length);

function addLikes() {
  console.log("do something");
}
/*
heartElement.addEventListener("click", (event) => {
  event.preventDefault();
  addLikes();
});
*/
/*
// SlideShow :
const bground = document.querySelector(".bground");
const closeBtn = document.querySelector(".closeBtn");
const slides = document.getElementsByTagName("img");

//Launch slider:

const launchSlider = function () {
  bground.style.display = "block";
  console.log("Launch slider");
};
slides.addEventListener("click", (event) => {
  event.preventDefault();
  launchSlider();
});

//Close slider:
const closeSlider = function () {
  bground.style.display = "none";
};
closeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  closeSlider();
});

function slideShow() {
  let i = 0;
  if (i < slides.length - 1) {
    i++;
  } else {
    i = 0;
  }
}
slideShow();
//window.onload = slideShow;
*/
