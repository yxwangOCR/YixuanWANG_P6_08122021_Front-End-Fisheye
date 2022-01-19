const urlParams = new URLSearchParams(window.location.search); //récupère l'url et la met dans urlParams
const id = urlParams.get("id"); //récupère la valeur du champ id dans urlParams et la met dans la const id
const profilSection = document.querySelector(".photograph-header");
const mediaSection = document.querySelector(".media_section");

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
  let likesCounter = 0;

  media.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaDOM);
    //console.log(media);

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
              //console.log("Show Preview Image");
              //console.log(currentUrl);
              //console.log(previewImage.src);
            };
            showPreviewImage();
          } else if (galleryElement.src.endsWith(".mp4")) {
            const showPreviewVideo = function () {
              previewBox.classList.add("show");
              previewImage.classList.add("hide");
              previewVideo.classList.remove("hide");
              previewVideo.src = currentUrl;
              previewVideo.setAttribute("controls", "controls");
              //console.log("Show Preview Video");
              //console.log(currentUrl);
              //console.log(previewVideo.src);
            };
            showPreviewVideo();
          } else {
            console.log("No Preview Media");
          }
          //console.log(media);
        };
        showPreview();
        mediaTitle.innerHTML = media.title;

        //console.log(previewBox.indexOf(currentUrl));
      });
      //Add likes:
      //console.log(media.likes);
      const counterHolder = document.querySelector(".counter");
      const heart = mediaDOM.getElementsByClassName("heartIcon")[0];
      const likes = document.getElementsByClassName("likes");
      likesCounter += media.likes; // 总和

      const addLikes = function () {
        //let likesCounter = 0;
        media.likes += 1;
      };

      heart.addEventListener("click", (event) => {
        event.preventDefault();
        addLikes();
        console.log(media.likes);
        likes.innerHTML = likesCounter;
      });
      counterHolder.innerHTML = likesCounter;
    });
    // console.log(media);

    //Show price :
    const priceHolder = document.querySelector(".price");
    priceHolder.innerHTML = profil.price + " €/Jour";
    /*
  
   
    let likesCounter = 0;
    for (let j = 0; j < likes.length; j++) {
      console.log(likes.length);
      likesCounter += media.likes;
    }
    //likesCounter += media.likes;
    counterHolder.innerHTML = likesCounter;
    */
  });

  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const slideLength = media.length;

  for (i = 0; i < slideLength; i++) {
    let newIndex = i;
    let clickedIndex;

    clickedIndex = i;
    //console.log(i);
  }

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
}

init();
