const urlParams = new URLSearchParams(window.location.search); //récupère l'url et la met dans urlParams
const id = urlParams.get("id"); //récupère la valeur du champ id dans urlParams et la met dans la const id

async function getProfil() {
  let profil = [];
  await fetch("./data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      profil = data.photographers.find(
        (photographer) => photographer.id === +id
      );
    });

  return profil;
}

async function displayProfil(profil) {
  const profilSection = document.querySelector(".photograph-header");
  const profilModel = profilFactory(profil);
  const profilDOM = profilModel.getProfilCardDOM();
  profilSection.appendChild(profilDOM);
}

async function init() {
  const profil = await getProfil();
  displayProfil(profil);
}

init();

/*
//gallery
async function getMedia() {
  let media = [];
  await fetch("./data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      media = data.media.find((photographerId) => photographerId === +id);
    });

  return media;
}
async function displayMedia(media) {
  const gallerySection = document.querySelector(".gallery_section");
  const mediaModel = mediaFactory(media);
  const userMediaDOM = mediaModel.getMediaDOM();
  gallerySection.appendChild(userMediaDOM);
}

async function init() {
  const media = await getMedia();
  displayMedia(media);
}

init();

*/
