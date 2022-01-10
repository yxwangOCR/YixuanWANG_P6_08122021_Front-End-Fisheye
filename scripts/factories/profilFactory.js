//Profil
function profilFactory(profil) {
  const { name, portrait, city, country, tagline } = profil;
  const picture = `assets/photographers/${portrait}`;

  function getProfilCardDOM() {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    const location = document.createElement("div");
    const taglines = document.createElement("div");
    const intro = document.createElement("div");
    const contactBtn = document.querySelector(".contact_button");
    h2.textContent = name;
    img.setAttribute("src", picture);

    location.className = "location";
    location.textContent = city + ", " + country;

    taglines.className = "taglines";
    taglines.textContent = tagline;

    intro.className = "intro";
    intro.appendChild(h2);
    intro.appendChild(location);
    intro.appendChild(taglines);

    article.appendChild(intro);
    article.appendChild(contactBtn);
    article.appendChild(img);

    return article;
  }
  return { name, picture, location, tagline, getProfilCardDOM };
}
