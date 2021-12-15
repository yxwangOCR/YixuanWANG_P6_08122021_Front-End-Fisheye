function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.setAttribute("src", picture);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const location = document.createElement("location");
    location.textContent = city + ", " + country;

    const taglines = document.createElement("taglines");
    taglines.textContent = tagline;

    const prices = document.createElement("prices");
    prices.textContent = price + " €";

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(taglines);
    article.appendChild(prices);

    return article;
  }
  return { name, picture, location, tagline, price, getUserCardDOM };
}

let imgOpen = document.querySelector("img");
imgOpen.addEventListener("click", () => {
  window.open("photographer.html", "_blank");
  console.log("open links");
});
