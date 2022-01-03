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

  let likesCounter = 0; //initialisation du compteur de like;
  media.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaDOM);
    likesCounter += media.likes; //calcul du compteur de like pour chaque fois qu'il affiche un media, il récupère son nombre de like.
  });
  //Affichage des 2 valeurs : price + likes
  const priceHolder = document.querySelector(".price");
  priceHolder.innerHTML = profil.price + " €/Jour";

  const counterHolder = document.querySelector(".counter");
  counterHolder.innerHTML = likesCounter;
}

async function init() {
  const data = await getProfilMedia();
  displayProfilMedia(data);
}

/* Like counter:*/
let hearts = document.getElementsByClassName("heartIcon");
async function addLikes() {
  const fullDisplay = await init();
  console.log(hearts); //length = 10
  console.log(hearts.length); // length = 0
}
addLikes();

for (let i = 0; i < hearts.length; i++) {
  console.log(hearts[i]); // ne fonctionne pas..
  hearts[i].addEventListener("click", (event) => {
    event.preventDefault();
    addLikes();
  });
}

/*
// SlideShow :
const slideBground = document.querySelector(".bground");
const closeBtn = document.querySelector(".closeBtn");
const slides = document.querySelectorAll("img");

//Launch slider:
const launchSlider = function () {
  slideBground.style.display = "block";
  console.log("Launch slider");
};

for (let i = 0; i < slides.length; i++) {
  slides[i].addEventListener("click", launchSlider, false);
}

//Close slider:
const closeSlider = function () {
  slideBground.style.display = "none";
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
