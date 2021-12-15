async function displayMedia(media) {
  const gallerySection = document.querySelector(".gallery_section");

  media.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const userMediaDOM = mediaModel.getMediaDOM();
    gallerySection.appendChild(userMediaDOM);
  });
}

async function init() {
  const { media } = await getMedia();
  displayMedia(media);
}

init();

function mediaFactory(gallery) {
  const { image, title, likes, heart } = gallery;
  const photo = `assets/Mimi/${image}`;
  const heartIcon = `assets/Mimi/${heart}`;

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
