import images from "./gallery-items.js";
const lightboxImage = document.querySelector("lightbox__image");
const lightboxOverlay = document.querySelector("lightbox__overlay");
const ulRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".js-lightbox");

const createGallery = (image) => {
  const liRef = document.createElement("li");
  liRef.classList.add("gallery__item");

  const linkRef = document.createElement("a");
  linkRef.classList.add("gallery__link");
  linkRef.setAttribute("href", image.original);

  const imgRef = document.createElement("img");
  imgRef.classList.add("gallery__image");
  imgRef.setAttribute("src", image.preview);
  imgRef.setAttribute("data-source", image.original);
  imgRef.setAttribute("alt", image.description);

  linkRef.appendChild(imgRef);
  liRef.appendChild(linkRef);

  return liRef;
};

const galleryMap = images.map(createGallery);
// console.log(galleryMap);

function addModal() {
  lightboxImage.setAttribute("src", event.target.getAttribute("data-set"));
  lightboxImage.setAttribute("alt", event.target.getAttribute("alt"));
  modalRef.classList.add("is-open");
  modalRef.addEventListener("click", closeModalHandler);
  window.addEventListener("keydown", SwitchHandler);
}

function removeModal() {
  modalRef.classList.remove("is-open");
  lightboxImage.setAttribute("src", "");
  lightboxImage.setAttribute("alt", "");
  lightboxImage.innerHTML = "";
  window.removeEventListener("keydown", SwitchHandler);
  modalRef.removeEventListener("click", closeModalHandler);
}
const SwitchHandler = (event) => {
  if (event.code === "Escape") {
    removeModal();
  }

  const galleryLinks = images.map(({ original }) => original);
  const prevImg = lightboxImage.getAttribute("src");

  if (event.code === "ArrowLeft") {
    if (galleryLinks.indexOf(prevImg) > 0) {
      lightboxImage.setAttribute(
        "src",
        galleryLinks[galleryLinks.indexOf(prevImg) - 1]
      );
      lightboxImage.setAttribute(
        "alt",
        images[galleryLinks.indexOf(prevImg) - 1].description
      );
    }
  }
  if (event.code === "ArrowRight") {
    if (galleryLinks.indexOf(prevImgSrc) < galleryLinks.length - 1) {
      lightboxImage.setAttribute(
        "src",
        galleryLinks[galleryLinks.indexOf(prevImgSrc) + 1]
      );
      lightboxImage.setAttribute(
        "alt",
        galleryArray[galleryLinks.indexOf(prevImgSrc) + 1].description
      );
    }
  }
};

const closeModal = (event) => {
  //   console.dir(event.target === lightboxImage);
  if (event.target === lightboxImage) {
    return;
  }
  removeModal();
};

const openModal = (event) => {
  if (event.target.nodeName === "IMG" || event.target.nodeName === "A") {
    addModal();
    event.preventDefault();
  }
};
ulRef.append(...galleryMap);

ulRef.addEventListener("click", openModal);
