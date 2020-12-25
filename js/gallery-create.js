import images from "./gallery-items.js";
console.table(images);

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

  liRef.appendChild(linkRef);
  linkRef.appendChild(imgRef);

  const ulRef = document.querySelector("ul.gallery");
  ulRef.appendChild(liRef);
  return ulRef;
};

images.forEach((image) => {
  console.log(createGallery(image));
});
