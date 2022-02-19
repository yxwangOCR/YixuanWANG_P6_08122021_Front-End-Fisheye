async function getPhotographers() {
  let photographers = [];
  await fetch("./data/photographers.json")
    .then((response) => response.json())
    .then((data) => (photographers = data.photographers));
  return { photographers };
}

async function displayPhotographer(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  displayPhotographer(photographers);
}
init();
