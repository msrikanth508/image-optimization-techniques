import observer from "./observer";

class LazyImageApp {
  constructor() {
    this.observer = observer(this.loadOriginalImage.bind(this), {
      root: null,
      rootMargin: "150px 0px 150px 0px",
      threshold: [1]
    });
  }
  loadOriginalImage(ele) {
    const src = ele.getAttribute("data-src");
    // replace
    ele.src = src;
    ele.onerror = () => {
      ele.classList.remove("image__animate");
      ele.src = "https://via.placeholder.com/300?text=:(";
    };
    ele.onload = () => {
      ele.classList.add("image__animate");
      this.onLoadOrErrorCb();
    };
  }
  createImgElement(placeholderSrc, originalSrc) {
    const img = document.createElement("img");
    img.className = "image";
    img.src = placeholderSrc;
    img.setAttribute("data-src", originalSrc);
    return img;
  }
  renderImages(onLoadOrErrorCb) {
    if (!this.observer) {
      this.init();
    }
    document.getElementById("image-container").innerHTML = "";

    const fragment = document.createDocumentFragment();
    Array.from({ length: 300 }).forEach(() => {
      const imageSrc = `https://picsum.photos/300/300/?image=${Math.floor(
        Math.random() * Math.floor(300)
      )}#${Date.now()}`;
      const imageEle = this.createImgElement(
        "https://via.placeholder.com/300?text=placeholder",
        imageSrc
      );
      this.onLoadOrErrorCb = onLoadOrErrorCb;
      // add observer
      this.observer.observe(imageEle);
      fragment.append(imageEle);
    });

    document.getElementById("image-container").append(fragment);
  }
};


export default LazyImageApp;
