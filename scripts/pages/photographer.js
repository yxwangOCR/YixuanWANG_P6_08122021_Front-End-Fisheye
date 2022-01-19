const urlParams = new URLSearchParams(window.location.search); //récupère l'url et la met dans urlParams
const id = urlParams.get("id"); //récupère la valeur du champ id dans urlParams et la met dans la const id
const profilSection = document.querySelector(".photograph-header");
const mediaSection = document.querySelector(".media_section");
let likesCounter = 0;
const counterHolder = document.querySelector(".counter");
const priceHolder = document.querySelector(".price");

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

async function init() {
  const data = await getProfilMedia();
  displayProfilMedia(data);
}

async function displayProfilMedia({ profil, media }) {
  const profilModel = profilFactory(profil);
  const profilDOM = profilModel.getProfilCardDOM();
  profilSection.appendChild(profilDOM);

  media.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaDOM);
    const heart = mediaDOM.getElementsByClassName("heartIcon")[0];
    const likes = mediaDOM.getElementsByClassName("likes");
    heart.addEventListener("click", (event) => {
      event.preventDefault();
      addLikes();
      media.likes += 1;
      console.log(media.likes);
    });
    likesCounter += media.likes; // 总和
    counterHolder.innerHTML = likesCounter;
    console.log(likes);
    likes.innerHTML = media.likes;

    const galleryElements = mediaDOM.querySelectorAll(".gallery");
    const lightBox = document.querySelector(".slide-bground");
    const previewBox = document.querySelector(".preview-box");
    const closeButton = document.querySelector(".icon");
    const previewImage = document.querySelector(".previewImage");
    const previewVideo = document.querySelector(".previewVideo");
    const mediaTitle = document.querySelector(".mediaTitle");

    galleryElements.forEach((galleryElement) => {
      galleryElement.addEventListener("click", (event) => {
        event.preventDefault();
        let currentUrl = galleryElement.getAttribute("src");
        lightBox.style.display = "block";

        //Close preview box & slides background:
        const closePreview = function () {
          previewBox.classList.remove("show");
          lightBox.style.display = "none";
        };
        closeButton.addEventListener("click", (event) => {
          event.preventDefault();
          closePreview();
        });

        const showPreview = function () {
          if (galleryElement.src.endsWith("jpg")) {
            const showPreviewImage = function () {
              previewBox.classList.add("show");
              previewVideo.classList.add("hide");
              previewImage.classList.remove("hide");
              previewImage.src = currentUrl;
            };
            showPreviewImage();
          } else if (galleryElement.src.endsWith(".mp4")) {
            const showPreviewVideo = function () {
              previewBox.classList.add("show");
              previewImage.classList.add("hide");
              previewVideo.classList.remove("hide");
              previewVideo.src = currentUrl;
              previewVideo.setAttribute("controls", "controls");
            };
            showPreviewVideo();
          } else {
            console.log("No Preview Media");
          }
          //console.log(media);
        };
        showPreview();
        mediaTitle.innerHTML = media.title;

        const prevButton = document.querySelector(".prev");
        const nextButton = document.querySelector(".next");
        const slideLength = media.length;
        const nextSlide = function () {
          if (i < slideLength - 1) {
            i++;
          } else {
            i = 0;
          }
          //console.log(i);
        };

        const prevSlide = function () {
          if (i > 0) {
            i--;
          } else {
            i = slideLength - 1;
          }
          //console.log(i);
        };

        prevButton.addEventListener("click", (event) => {
          event.preventDefault();
          prevSlide();
          //console.log("click PrevButton");
        });
        nextButton.addEventListener("click", (event) => {
          event.preventDefault();
          nextSlide();
          //console.log("click NextButton");
        });
      });
    });

    //Show price :
    priceHolder.innerHTML = profil.price + " €/Jour";
  });
}

//Add likes:
async function addLikes() {
  likesCounter += 1;
  counterHolder.innerHTML = likesCounter;
}
init();
