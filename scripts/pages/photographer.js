//Mettre le code JavaScript lié à la page photographer.html
async function getMedia() {
  const media = [
    {
      id: 23523434,
      photographerId: 243,
      title: "Benevides Wedding",
      image: "Event_BenevidesWedding.jpg",
      likes: 77,
      date: "2019-06-28",
      price: 45,
    },
    {
      id: 623534343,
      photographerId: 243,
      title: "Lonesome",
      image: "Travel_Lonesome.jpg",
      likes: 88,
      date: "2019-02-03",
      price: 45,
    },
    {
      id: 95234343,
      photographerId: 243,
      title: "Rainbow Bird",
      image: "Animals_Rainbow.jpg",
      likes: 59,
      date: "2019-07-02",
      price: 60,
    },
    {
      id: 65235234,
      photographerId: 243,
      title: "Boulder Wedding",
      image: "Event_PintoWedding.jpg",
      likes: 52,
      date: "2019-06-25",
      price: 45,
    },
    {
      id: 2534342,
      photographerId: 243,
      title: "Seaside Wedding",
      image: "Event_SeasideWedding.jpg",
      likes: 25,
      date: "2019-06-21",
      price: 45,
    },
    {
      id: 398847109,
      photographerId: 243,
      title: "Raw Black Portrait",
      image: "Portrait_Background.jpg",
      likes: 55,
      date: "2019-06-20",
      price: 45,
    },
    {
      id: 2523434634,
      photographerId: 243,
      title: "Nora Portrait",
      image: "Portrait_Nora.jpg",
      likes: 63,
      date: "2019-04-07",
      price: 45,
    },
    {
      id: 2525345343,
      photographerId: 243,
      title: "Wednesday Potrait",
      image: "Portrait_Wednesday.jpg",
      likes: 34,
      date: "2019-04-07",
      price: 45,
    },
    {
      id: 625025343,
      photographerId: 243,
      title: "Hillside Color",
      image: "Travel_HillsideColor.jpg",
      likes: 85,
      date: "2019-04-03",
      price: 45,
    },
  ];

  return {
    media: [...media],
  };
}

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
  const { image, title, likes } = gallery;
  const photo = `assets/Mimi/${image}`;

  function getMediaDOM() {
    const article = document.createElement("article");

    const image = document.createElement("img");
    image.setAttribute("src", photo);

    const title = document.createElement("title");
    title.textContent = title;

    const likes = document.createElement("likes");
    likes.textContent = likes;

    article.appendChild(image);
    article.appendChild(title);
    article.appendChild(likes);

    return article;
  }
  return { photo, title, likes, getMediaDOM };
}
