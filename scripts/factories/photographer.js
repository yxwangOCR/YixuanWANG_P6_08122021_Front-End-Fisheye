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

//Profil
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

//Media gallery
function mediaFactory(media) {
  const { image, video, title, likes, heart } = media;
  const photo = `assets/photos/${image}`;
  const clip = `assets/photos/${video}`;
  const heartIcon = `assets/heart.svg`;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    const image = document.createElement("img");
    const video = document.createElement("video");

    fetch("./data/photographers.json")
      .then((response) => response.json())
      .then((response) => {
        response.media.filter((element) => {
          if (typeof media.image === "string") {
            article.appendChild(image);
            article.appendChild(ImgTitle);
            image.setAttribute("src", photo);
          } else if (typeof media.video === "string") {
            article.appendChild(video);
            article.appendChild(ImgTitle);
            video.setAttribute("src", clip);
            video.setAttribute("type", "video/mp4");
          } else {
            console.log("ERROR");
          }
        });
      });

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

    return article;
  }
  return { photo, clip, title, likes, heart, getMediaCardDOM };
}
