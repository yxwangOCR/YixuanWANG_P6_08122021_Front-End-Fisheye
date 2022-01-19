const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
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
init();

async function displayProfilMedia({ profil, media }) {
  const profilModel = profilFactory(profil);
  const profilDOM = profilModel.getProfilCardDOM();
  profilSection.appendChild(profilDOM);

  media.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaDOM);
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
        // Show preview box:
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
        };
        showPreview();
        //Show media name tag:
        mediaTitle.innerHTML = media.title;
      });
    });

    //Show price tag:
    priceHolder.innerHTML = profil.price + " €/Jour";
    //Add likes:
    const heart = mediaDOM.getElementsByClassName("heartIcon")[0];
    const likes = document.getElementsByClassName("likes");
    likesCounter += media.likes; // likes sum
    counterHolder.innerHTML = likesCounter; // show sum
    console.log(media.likes);

    function addLikes() {
      likesCounter += 1;
      counterHolder.innerHTML = likesCounter;
      media.likes += 1;
      console.log(media.likes);
      likes.innerHTML = media.likes;
    }
    heart.addEventListener("click", (event) => {
      event.preventDefault();
      addLikes();
    });
  });

  // Next & Prev Buttons:

  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const slidesLength = media.length;
  console.log(media.length);
  let i;
  //let clickedIndex = i;

  const nextSlide = function () {
    //clickedIndex++;

    if (i < slidesLength - 1) {
      i++;
    } else {
      i = 0;
    }
    console.log(i);
  };

  const prevSlide = function () {
    //clickedIndex--;
    if (i > 0) {
      i--;
    } else {
      i = slidesLength - 1;
    }
    console.log(i);
  };

  prevButton.addEventListener("click", (event) => {
    event.preventDefault();
    prevSlide();
  });
  nextButton.addEventListener("click", (event) => {
    event.preventDefault();
    nextSlide();
  });
}

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
