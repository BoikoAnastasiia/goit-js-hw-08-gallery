const liRef = document.createElement("li");
liRef.classList.add("gallery__item");

const linkRef = document.createElement("a");
linkRef.classList.add("gallery__link");

const imgRef = document.createElement("img");
imgRef.classList.add("gallery__image");
// imgRef.setAttribute("src");
// imgRef.setAttribute("data-source");
// imgRef.setAttribute("alt");

liRef.appendChild(linkRef);
linkRef.appendChild(imgRef);
console.log(liRef);

const ulRef = document.querySelector("ul.gallery");
ulRef.appendChild(liRef);
// ulRef.append(...galleryMap);

// ulRef.addEventListener("click", onUlClick);

// function onUlClick(event) {
//   event.preventDefault();
//   console.log(event.target);
//   if (event.target.nodeName !== "IMG") {
//     return;
//   }

//   const largeImage = event.target.dataset.source;
//   lightboxImage.src = largeImage;
// }
