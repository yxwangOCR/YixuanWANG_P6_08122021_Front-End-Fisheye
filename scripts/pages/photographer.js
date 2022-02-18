const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const profilSection = document.querySelector(".photograph-header");
const mediaSection = document.querySelector(".media_section");
let likesCounter = 0;
const counterHolder = document.querySelector(".counter");
const priceHolder = document.querySelector(".price");
const lightBox = document.querySelector(".slide-bground");
const previewBox = document.querySelector(".preview-box");
const closeButton = document.getElementById("close-button");
const previewImage = document.querySelector(".previewImage");
const previewVideo = document.querySelector(".previewVideo");
const sourceTitle = document.querySelector(".mediaTitle");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const dropDown = document.getElementById("dropdown");
let previewIndex = 0;
let mediaSrc = [];
let profil = [];
let media = []; // il faut modifier ce tableau media, ajouter des likes a l'interieur.

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
  let data = await getProfilMedia();
  displayProfilMedia(data);
}
init();

/* ========== Fonctions utilitaires =========== */
const resetPage = () => {
  mediaSection.innerHTML = ""; // Quand on sort, il va vider Media Section, il va retire a l'interieur
  likesCounter = 0;
};

// Likes :
function addLikes(id) {
  const index = media.findIndex((media) => media.id === id);
  media[index].likes += 1;
  resetPage();
  media.map((media, index) => displayMedia(media, index));
}

// Lightbox CloseButton:
const closePreview = function () {
  previewBox.classList.remove("show");
  lightBox.style.display = "none";
};
closeButton.addEventListener("click", closePreview);

// Show Lightbox Preview:
function displayPreview() {
  const focusedMedia = media[previewIndex];
  const src = focusedMedia.image || focusedMedia.video;
  lightBox.style.display = "block";
  sourceTitle.innerHTML = focusedMedia.title; //Show media name tag
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

// Prev & Next preview buttons:
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
  // 这个函数的内容从循环中拿出来了
  const mediaDOM = mediaFactory(media).getMediaCardDOM();
  mediaSection.appendChild(mediaDOM); // mediaSection ou il y a tous les medias
  //Likes:
  const heart = mediaDOM.getElementsByClassName("heartIcon")[0];
  heart.addEventListener("click", () => addLikes(media.id));
  likesCounter += media.likes;
  counterHolder.innerHTML = likesCounter; // modifier le contenu HTML, mais pas les donnees.
  //Media preview:
  const galleryElement = mediaDOM.querySelector(".gallery");
  galleryElement.addEventListener("click", () => showPreview(index));
};

async function displayProfilMedia({ profil, media }) {
  // 这个函数 a partir de la base des donnees,cree les elements HTML dans la page.
  const profilDOM = profilFactory(profil).getProfilCardDOM();
  profilSection.appendChild(profilDOM);
  priceHolder.innerHTML = profil.price + " €/Jour";

  media.forEach((media, index) => {
    displayMedia(media, index);
  });
}

// Dropdown List:
dropDown.addEventListener("change", getSort); // 从循环中拿出来了，不需要循环，因为它在外部任何地方都可以用09-35
function getSort() {
  const value = dropDown.options[dropDown.selectedIndex].innerHTML;
  //tester la valeur de la dropdown:
  if (value == "Popularité") {
    sortByLikes();
  } else if (value == "Date") {
    sortByDate();
  } else {
    sortByTitle();
  }
}
// 注意： 一直都是在同一个array上进行操作

function sortByLikes() {
  // Utiliser la methode : Array.prototype.sort() ==> trier les elements d'un tableau, dans ce meme tableau, et renvoie le tableau.
  const sortedData = media.sort((a, b) => {
    // c'est un tableau media qu'on a recupere dans init()==>ligne 29., puis on trie ce tableau media
    return b.likes - a.likes;
  });
  resetPage();
  sortedData.map((media, index) => displayMedia(media, index)); // pour chaque media, on le fait display : (On fait rapeler displayMedia() sur le tableau filtre, en vidant le contenu precedent)
}

function sortByDate() {
  const sortedData = media.sort((a, b) => {
    // a et b sont les medias
    return new Date(a.date) - new Date(b.date); // a.date et b.date cherchent les medias par la cle.
  });
  resetPage();
  sortedData.map((media, index) => displayMedia(media, index));
}

function sortByTitle() {
  const sortedData = media.sort((a, b) => {
    return a.title > b.title ? 1 : -1;
  });
  resetPage();
  sortedData.map((media, index) => displayMedia(media, index));
}
