import images from "./gallery-items.js";

const ulRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".js-lightbox");
const lightboxImage = modalRef.querySelector(".lightbox__image");

const galleryCreate = (elem) => {
  const liRef = document.createElement("li");
  liRef.classList.add("gallery__item");
  const linkRef = document.createElement("a");
  linkRef.classList.add("gallery__link");
  linkRef.setAttribute("href", elem.original);
  const imgRef = document.createElement("img");
  imgRef.classList.add("gallery__image");
  imgRef.setAttribute("src", elem.preview);
  imgRef.setAttribute("data-set", elem.original);
  imgRef.setAttribute("alt", elem.description);
  linkRef.appendChild(imgRef);
  liRef.appendChild(linkRef);

  return liRef;
};

const galleryItems = images.map(galleryCreate);

function removeModal() {
  modalRef.classList.remove("is-open");
  lightboxImage.setAttribute("src", "");
  lightboxImage.setAttribute("alt", "");
  lightboxImage.innerHTML = "";
  window.removeEventListener("keydown", switchHandler);
  modalRef.removeEventListener("click", closeModal);
  window.addEventListener("keydown", nextImg);
}

function addModal() {
  lightboxImage.setAttribute("src", event.target.getAttribute("data-set"));
  lightboxImage.setAttribute("alt", event.target.getAttribute("alt"));
  modalRef.classList.add("is-open");
  modalRef.addEventListener("click", closeModal);
  window.addEventListener("keydown", switchHandler);
  window.addEventListener("keydown", nextImg);
}

const imagesLinks = images.map(({ original }) => original);

const switchHandler = (event) => {
  if (event.code === "Escape") {
    removeModal();
  }
};

const nextImg = (event) => {
  const prevImg = lightboxImage.getAttribute("src");
  const indexOfPrev = imagesLinks.indexOf(prevImg);
  if (event.code === "ArrowLeft") {
    if (indexOfPrev > 0) {
      lightboxImage.setAttribute("src", imagesLinks[indexOfPrev - 1]);
      lightboxImage.setAttribute("alt", images[indexOfPrev - 1].description);
    }
  }
  if (event.code === "ArrowRight") {
    if (indexOfPrev < imagesLinks.length - 1) {
      lightboxImage.setAttribute("src", imagesLinks[indexOfPrev + 1]);
      lightboxImage.setAttribute("alt", images[indexOfPrev + 1].description);
    }
  }
};

const closeModal = (event) => {
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

ulRef.append(...galleryItems);

ulRef.addEventListener("click", openModal);
