import images from "./gallery-items.js";
// console.table(images);
const ulRef = document.querySelector(".js-gallery");

const createGallery = (image) => {
  const liRef = document.createElement("li");
  liRef.classList.add("gallery__item");

  const linkRef = document.createElement("a");
  linkRef.classList.add("gallery__link");

  const imgRef = document.createElement("img");
  imgRef.classList.add("gallery__image");
  imgRef.setAttribute("src", image.preview);
  imgRef.setAttribute("data-source", image.original);
  imgRef.setAttribute("alt", image.description);

  linkRef.appendChild(imgRef);
  liRef.appendChild(linkRef);

  return liRef;
};

const galleryMap = images.map((image) => createGallery(image));
console.log(galleryMap);

ulRef.append(...galleryMap);
