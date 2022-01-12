const urlParams = new URLSearchParams(window.location.search); //récupère l'url et la met dans urlParams
const id = urlParams.get("id"); //récupère la valeur du champ id dans urlParams et la met dans la const id
const profilSection = document.querySelector(".photograph-header");
const mediaSection = document.querySelector(".media_section");
let likesCounter = 0; //initialisation du compteur de like;
const counterHolder = document.querySelector(".counter");
const priceHolder = document.querySelector(".price");
const lightBox = document.querySelector(".slide-bground");
const closeButton = document.getElementById("closeButton");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

async function getProfilMedia() {
  let profil = [];
  let media = [];

  await fetch("./data/photographers.json")
    .then((response) => response.json()) //promise : 在未来的某个时刻，将返回的数据转换成JSON格式
    .then((data) => {
      profil = data.photographers.find(
        (photographer) => photographer.id === +id
      );
      media = data.media.filter((media) => media.photographerId === +id);
    });
  return { profil, media };
}

async function displayProfilMedia({ profil, media }) {
  const profilModel = profilFactory(profil);
  const profilDOM = profilModel.getProfilCardDOM();
  profilSection.appendChild(profilDOM);
  media.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaDOM = mediaModel.getMediaCardDOM();
    const heart = mediaDOM.getElementsByClassName("heartIcon")[0];
    heart.addEventListener("click", addLikes);
    mediaSection.appendChild(mediaDOM);
    likesCounter += media.likes; //calcul du compteur de like pour chaque fois qu'il affiche un media, il récupère son nombre de like.
    //Affichage des 2 valeurs : price + likes
    priceHolder.innerHTML = profil.price + " €/Jour";
    counterHolder.innerHTML = likesCounter; // 1111111111 => pour afficher

    //Carousel:
    const galleryElements = mediaDOM.querySelectorAll(".gallery");
    const currentImage = document.getElementById("current_image");
    const currentVideo = document.getElementById("current_video");
    galleryElements.forEach((element) => {
      element.addEventListener("click", (event) => {
        const getSrc = element.getAttribute("src");
        console.log(getSrc);
        function getCurrentMedia() {
          const imageFormat = `https?:\/\/.*\.(?:png|jpg)`;
          const videoFormat = `https?.*?\.mp4`;

          for (let i = 0; i < galleryElements.length; i++) {
            if (galleryElements[i].src.match(imageFormat)) {
              currentVideo.style.display = "none"; // hide <video>
              currentImage.style.display = "block";
              currentImage.src = getSrc; // image src same as current image
            } else if (galleryElements[i].src.match(videoFormat)) {
              currentImage.style.display = "none"; // hide <image>
              currentVideo.style.display = "block";
              currentVideo.src = getSrc; // video src same as current video
              currentVideo.setAttribute("controls", "controls");
            } else {
              console.log("Error");
            }
          }
        }
        event.preventDefault();
        getCurrentMedia();
        launchSlider();
      });
    });
  });
}

//Launch Slides:
const launchSlider = function () {
  lightBox.style.display = "block";
};

//Close Slides:
const closeSlider = function () {
  lightBox.style.display = "none";
};
closeButton.addEventListener("click", (event) => {
  event.preventDefault();
  closeSlider();
});

async function init() {
  const data = await getProfilMedia();
  displayProfilMedia(data);
}

/* Like counter:*/
async function addLikes() {
  likesCounter += 1;
  counterHolder.innerHTML = likesCounter; // 2222222222 => pour calculer
}

init();
