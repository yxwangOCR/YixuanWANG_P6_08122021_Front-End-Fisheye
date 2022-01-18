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
init();

async function displayProfilMedia({ profil, media }) {
  const profilModel = profilFactory(profil);
  const profilDOM = profilModel.getProfilCardDOM();
  profilSection.appendChild(profilDOM);

  media.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaDOM);
    //console.log(media);

    const galleryElements = mediaDOM.querySelectorAll(".gallery");
    const previewBox = document.querySelector(".preview-box");
    const closeButton = document.querySelector(".icon");
    const previewImage = document.querySelector(".previewImage");
    const previewVideo = document.querySelector(".previewVideo");

    galleryElements.forEach((galleryElement) => {
      galleryElement.addEventListener("click", (event) => {
        let currentUrl = galleryElement.getAttribute("src");
        event.preventDefault();
        launchSlider();
        //console.log(media);
        //console.log(galleryElement);

        if (galleryElement.src.endsWith("jpg")) {
          function showPreviewImage() {
            previewBox.classList.add("show");
            previewImage.classList.remove("hide");
            previewVideo.classList.add("hide");
            previewImage.src = currentUrl;
            //console.log("Show Preview Image");
            //console.log(currentUrl);
            //console.log(previewImage.src);
          }
          showPreviewImage();
        } else if (galleryElement.src.endsWith(".mp4")) {
          function showPreviewVideo() {
            previewBox.classList.add("show");
            previewImage.classList.add("hide");
            previewVideo.classList.remove("hide");
            previewVideo.src = currentUrl;
            previewVideo.setAttribute("controls", "controls");
            //console.log("Show Preview Video");
            //console.log(currentUrl);
            //console.log(previewVideo.src);
          }
          showPreviewVideo();
        } else {
          console.log("No Preview Media");
        }
      });
    });

    //Close preview box & slides background:
    function closePreview() {
      previewBox.classList.remove("show");
      lightBox.style.display = "none";
      console.log("Close Preview Box");
    }
    closeButton.addEventListener("click", (event) => {
      event.preventDefault();
      closePreview();
    });
  });
}

//Launch Slides background:
const lightBox = document.querySelector(".slide-bground");
const launchSlider = function () {
  lightBox.style.display = "block";
};

/*
//Close Slides:
const closeButton = document.getElementById("closeButton");
const closeSlider = function () {
  lightBox.style.display = "none";
};
closeButton.addEventListener("click", (event) => {
  event.preventDefault();
  closeSlider();
});
// Previous button:
const previousButton = document.getElementById("previous");
function prev() {
  console.log("previous button click");
}
previousButton.addEventListener("click", (event) => {
  event.preventDefault();
  prev();
});

//Next button:
const nextButton = document.getElementById("next");
function next() {
  console.log("next button click");
}
nextButton.addEventListener("click", (event) => {
  event.preventDefault();
  next();
});
*/
