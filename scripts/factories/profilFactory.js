async function displayProfil(profil) {
  const profilSection = document.querySelector(".photograph-header");

  profil.forEach((profil) => {
    const profilModel = profilFactory(profil);
    const profilDOM = profilModel.getProfilCardDOM();
    profilSection.appendChild(profilDOM);
  });
}

async function init() {
  const { profil } = await getProfil();
  displayProfil(profil);
}

init();

function profilFactory(profil) {
  const { name, portrait, city, country, tagline } = profil;

  const picture = `assets/photographers/${portrait}`;

  function getProfilCardDOM() {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    h2.textContent = name;

    const img = document.createElement("img");
    img.setAttribute("src", picture);

    const location = document.createElement("div");
    location.className = "location";
    location.textContent = city + ", " + country;

    const taglines = document.createElement("div");
    taglines.className = "taglines";
    taglines.textContent = tagline;

    const intro = document.createElement("div");
    intro.className = "intro";
    intro.appendChild(h2);
    intro.appendChild(location);
    intro.appendChild(taglines);

    const contactBtn = document.querySelector(".contact_button");

    article.appendChild(intro);
    article.appendChild(contactBtn);
    article.appendChild(img);

    return article;
  }
  return { name, picture, location, tagline, getProfilCardDOM };
}
