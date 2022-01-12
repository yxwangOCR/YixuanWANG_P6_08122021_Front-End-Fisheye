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
const currentElement = document.getElementById("current_element");

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
    const heart = mediaDOM.getElementsByClassName("heartIcon")[0]; //
    heart.addEventListener("click", addLikes);
    //const getSlide = document.querySelectorAll("img"); //fonctionne pas, voir mediaFactory : ligne 21 + 29
    //getSlide.addEventListener("click", launchSlider());
    mediaSection.appendChild(mediaDOM);
    likesCounter += media.likes; //calcul du compteur de like pour chaque fois qu'il affiche un media, il récupère son nombre de like.

    //Carousel:
    const galleryElements = mediaDOM.querySelectorAll(".gallery");
    galleryElements.forEach((element) => {
      element.addEventListener("click", (event) => {
        event.preventDefault();
        launchSlider();
        //lightBox.style.display = "block"; // ne fonctionne pas
        const getSrc = element.getAttribute("src");
        console.log(getSrc);
        currentElement.src = element.getAttribute("src"); // image or video src same as current element
      });
    });
  });
  //Affichage des 2 valeurs : price + likes
  priceHolder.innerHTML = profil.price + " €/Jour";
  counterHolder.innerHTML = likesCounter; // 1111111111 => pour afficher
}

async function init() {
  const data = await getProfilMedia();
  displayProfilMedia(data);
}

/* Like counter:*/
async function addLikes() {
  likesCounter += 1;
  counterHolder.innerHTML = likesCounter; // 2222222222 => pour calculer
}
//addLikes();

//Launch Slides:
const launchSlider = function () {
  lightBox.style.display = "block";
};

function nextSlide() {
  //console.log("next");
}

function previsousSlide() {
  //console.log("previous");
}

previousButton.addEventListener("click", previsousSlide());
nextButton.addEventListener("click", nextSlide());

//Close Slides:
const closeSlider = function () {
  lightBox.style.display = "none";
};
closeButton.addEventListener("click", (event) => {
  event.preventDefault();
  closeSlider();
});

// Dropdown List:
/* Native HTML method: 
function getDropdownList() {
  let selectValue = document.getElementById("dropdown").value;
  console.log(selectValue);
}
getDropdownList();
*/

function DropDown(dropdownElement) {
  const [toggler, menu] = dropdownElement.children;

  // change value of menu when click:
  const setValue = (item) => {
    const value = item.textContent;
    toggler.textContent = value;
    this.value = value;
    this.toggle(false);
    dropdownElement.dispatchEvent(new Event("changeValue")); //向一个指定的事件目标派发一个事件,  并以合适的顺序同步调用目标元素相关的事件处理函数。
  };

  // hide the menu when click:
  // check if the dropdown element does not contain the event => false:
  const clickOut = (e) => {
    if (!dropdownElement.contains(e.target)) {
      this.toggle(false);
    }

    /* 
    if (!dropdownElement) {
      return document.removeEventListener("click", clickOut);
    }
    */
  };
  document.addEventListener("click", clickOut);

  toggler.addEventListener("click", () => this.toggle());
  [...menu.children].forEach((item) => {
    item.addEventListener("click", () => setValue(item));
  });

  this.element = dropdownElement;
  this.value = toggler.textContent;
  this.toggle = (expand = null) => {
    expand =
      expand === null ? menu.getAttribute("aria-expanded") !== "true" : expand;
    menu.getAttribute("aria-expanded", expand);

    // when expand menu :
    if (expand) {
      toggler.classList.add("active");
      //menu.children[0].focus(); // focus on first item on the menu;
      dropdownElement.dispatchEvent(new Event("opened"));
      document.removeEventListener("click", clickOut);
    } else {
      toggler.classList.remove("active");
      dropdownElement.dispatchEvent(new Event("closed"));
      document.removeEventListener("click", clickOut);
    }
  };
}

const dropdown = new DropDown(document.querySelector(".dropdown"));
//console.log(dropdown.value);
dropdown.element.addEventListener("changeValue", () => {
  console.log("changeValue", dropdown.value);
});

dropdown.element.addEventListener("opened", () => {
  console.log("opened", dropdown.value);
});

dropdown.element.addEventListener("closed", () => {
  console.log("closed", dropdown.value);
});

dropdown.toggle();

init(); //
