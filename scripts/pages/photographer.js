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

  media.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaDOM);
  });
}

async function init() {
  const data = await getProfilMedia();
  displayProfilMedia(data);
}
init();

// SlideShow :
let slides = document.getElementsByTagName("img");
function slideShow() {
  let i = 0;

  if (i < slides.length - 1) {
    i++;
  } else {
    i = 0;
  }
}
slideShow();
window.onload = slideShow;
slides.addEventListener("click", slideShow);
