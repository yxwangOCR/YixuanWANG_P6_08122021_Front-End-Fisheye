//Media gallery
function mediaFactory(media) {
  const { image, video, title, likes, heart } = media;
  const photo = `assets/photos/${image}`;
  const clip = `assets/photos/${video}`;
  //const heartIcon = `assets/heart.svg`;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    const imageElement = document.createElement("img");
    const videoElement = document.createElement("video");
    const titles = document.createElement("span");
    const like = document.createElement("span");
    const heart = document.createElement("span");
    const review = document.createElement("div");
    const ImgTitle = document.createElement("div");
    if (typeof image === "string") {
      article.appendChild(imageElement);
      article.appendChild(ImgTitle);
      imageElement.setAttribute("src", photo);
      //imageElement.setAttribute("onclick", "showPreview()");
      imageElement.setAttribute("class", "gallery");
    } else if (typeof video === "string") {
      article.appendChild(videoElement);
      article.appendChild(ImgTitle);
      videoElement.setAttribute("src", clip);
      videoElement.setAttribute("type", "video/mp4");
      videoElement.setAttribute("controls", "controls");
      //videoElement.setAttribute("onclick", "launchSlider()");
      videoElement.setAttribute("class", "gallery");
    } else {
      console.log("ERROR");
    }

    titles.className = "title";
    titles.textContent = title;

    like.className = "likes";
    like.textContent = likes;

    heart.className = "heartIcon";
    //heart.setAttribute("src", heartIcon);
    heart.innerHTML = '<i class="fas fa-heart"></i>';

    review.className = "review";
    review.appendChild(like);
    review.appendChild(heart);

    ImgTitle.className = "ImgTitle";
    ImgTitle.appendChild(titles);
    ImgTitle.appendChild(review);

    return article;
  }
  return { photo, clip, title, likes, heart, getMediaCardDOM };
}
