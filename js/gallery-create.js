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
}

function addModal() {
  lightboxImage.setAttribute("src", event.target.getAttribute("data-set"));
  lightboxImage.setAttribute("alt", event.target.getAttribute("alt"));
  modalRef.classList.add("is-open");
  modalRef.addEventListener("click", closeModal);
  window.addEventListener("keydown", switchHandler);
}

const switchHandler = (event) => {
  //   console.dir(event.code);
  if (event.code === "Escape") {
    removeModal();
  }
  const imagesLinks = images.map(({ original }) => original);
  const prevImg = lightboxImage.getAttribute("src");
  // console.dir(imagesLinks);
  if (event.code === "ArrowLeft") {
    if (imagesLinks.indexOf(prevImg) > 0) {
      lightboxImage.setAttribute(
        "src",
        imagesLinks[imagesLinks.indexOf(prevImg) - 1]
      );
      lightboxImage.setAttribute(
        "alt",
        images[imagesLinks.indexOf(prevImg) - 1].description
      );
    }
  }
  if (event.code === "ArrowRight") {
    if (imagesLinks.indexOf(prevImg) < imagesLinks.length - 1) {
      lightboxImage.setAttribute(
        "src",
        imagesLinks[imagesLinks.indexOf(prevImg) + 1]
      );
      lightboxImage.setAttribute(
        "alt",
        images[imagesLinks.indexOf(prevImg) + 1].description
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
  //   getImgUrl(event);
  //   console.log(getImgUrl(event));
};
ulRef.append(...galleryItems);
// console.dir(thumbGallery);

ulRef.addEventListener("click", openModal);
