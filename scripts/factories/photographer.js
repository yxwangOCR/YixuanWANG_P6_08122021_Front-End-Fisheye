//index:
function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;
  const picture = `assets/photographers/${portrait}`;
  function openProfil() {
    window.open(`photographer.html?id=${id}`);
  }

  function getUserCardDOM() {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.setAttribute("src", picture);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const location = document.createElement("div");
    location.className = "location";
    location.textContent = city + ", " + country;

    const taglines = document.createElement("div");
    taglines.className = "taglines";
    taglines.textContent = tagline;

    const prices = document.createElement("div");
    prices.className = "prices";
    prices.textContent = price + " €";

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(taglines);
    article.appendChild(prices);
    article.addEventListener("click", openProfil);

    return article;
  }
  return { name, picture, location, tagline, price, getUserCardDOM };
}

//profil
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

/*
//gallery
function mediaFactory(gallery) {
  const { image, title, likes, heart } = gallery;
  const photo = `assets/photos/${jsonObj["photographerId"]}/${image}`;
  const heartIcon = `assets/${heart}`;

  function getMediaDOM() {
    const article = document.createElement("article");

    const image = document.createElement("img");
    image.setAttribute("src", photo);

    const titles = document.createElement("span");
    titles.className = "title";
    titles.textContent = title;

    const like = document.createElement("span");
    like.className = "likes";
    like.textContent = likes;

    const heart = document.createElement("img");
    heart.className = "heartIcon";
    heart.setAttribute("src", heartIcon);

    const review = document.createElement("div");
    review.className = "review";
    review.appendChild(like);
    review.appendChild(heart);

    const ImgTitle = document.createElement("div");
    ImgTitle.className = "ImgTitle";
    ImgTitle.appendChild(titles);
    ImgTitle.appendChild(review);

    article.appendChild(image);
    article.appendChild(ImgTitle);

    return article;
  }
  return { photo, title, likes, heart, getMediaDOM };
}
*/
