const urlParams = new URLSearchParams(window.location.search); //récupère l'url et la met dans urlParams
const id = urlParams.get("id"); //récupère la valeur du champ id dans urlParams et la met dans la const id
let likesCounter = 0; //initialisation du compteur de like;
const counterHolder = document.querySelector(".counter");
const priceHolder = document.querySelector(".price");

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
  const profilSection = document.querySelector(".photograph-header");
  const mediaSection = document.querySelector(".media_section");
  const profilModel = profilFactory(profil);
  const profilDOM = profilModel.getProfilCardDOM();
  profilSection.appendChild(profilDOM);

  media.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaDOM = mediaModel.getMediaCardDOM();
    const heart = mediaDOM.getElementsByClassName("heartIcon")[0]; //
    heart.addEventListener("click", addLikes);
    mediaSection.appendChild(mediaDOM);
    likesCounter += media.likes; //calcul du compteur de like pour chaque fois qu'il affiche un media, il récupère son nombre de like.
  });
  //Affichage des 2 valeurs : price + likes
  priceHolder.innerHTML = profil.price + " €/Jour";
  counterHolder.innerHTML = likesCounter; // 1111111111
}

async function init() {
  const data = await getProfilMedia();
  displayProfilMedia(data);
}

/* Like counter:*/
async function addLikes() {
  likesCounter += 1;
  counterHolder.innerHTML = likesCounter; // 2222222222
}
addLikes();

/*
// SlideShow :
const slideBground = document.querySelector(".slide-bground");
const closeButton = document.getElementById("closeButton");
const slides = document.getElementsByTagName("img");
const mp4 = document.getElementsByTagName("video");

//Launch Slides:
const launchSlider = function () {
  slideBground.style.display = "block";
  console.log("Launch Slides");
};

for (let i = 0; i < slides.length; i++) {
  console.log(slides.length); // why length = 2 ?
  console.log(mp4.length); // why length = 0 ?
  slides[i].addEventListener("click", launchSlider, false);
}

launchSlider();

//Close Slides:
const closeSlider = function () {
  slideBground.style.display = "none";
};
closeButton.addEventListener("click", (event) => {
  event.preventDefault();
  closeSlider();
});

/*
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

// Dropdown List:
/* Native HTML method: 
function getDropdownList() {
  let selectValue = document.getElementById("dropdown").value;
  console.log(selectValue);
}
getDropdownList();
*/

/*
function DropDown(dropdownElement) {
  const [toggler, menu] = dropdownElement.children;
  const setValue = (item) => {
    const value = item.textContent;
    toggler.textContent = value;
    this.value = value;
    this.toggle(false);
    this.element.dispatchEvent(new Event("change"));
  };
  toggler.addEventListener("click", () => this.toggle());
  [...menu.children].forEach((item) => {
    item.addEventListener("click", () => setValue());
  });
  this.element = dropdownElement;
  this.value = toggler.textContent;
  this.toggle = (expand = null) => {
    expand =
      expand === null ? menu.getAttribute("aria-expanded") !== "true" : expand;
    menu.getAttribute("aria-expanded", expand);
    if (expand) {
      toggler.classList.add("active");
    } else {
      toggler.classList.remove("active");
    }
  };
}

const dropdown = new DropDown(document.querySelector(".dropdown"));
//console.log(dropdown.value);
dropdown.element.addEventListener("change", () => {
  console.log("change", dropdown.value);
});
dropdown.toggle(true);
*/

init(); //
