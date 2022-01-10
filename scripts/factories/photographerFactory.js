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
    const h2 = document.createElement("h2");
    const location = document.createElement("div");
    const taglines = document.createElement("div");
    const prices = document.createElement("div");

    img.setAttribute("src", picture);
    h2.textContent = name;

    location.className = "location";
    location.textContent = city + ", " + country;

    taglines.className = "taglines";
    taglines.textContent = tagline;

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
