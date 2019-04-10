import observer from "./observer";

class ProgressiveImageApp {
  constructor() {
    this.observer = observer(this.loadOriginalImage.bind(this), {
      root: null,
      rootMargin: "50px 0px 50px 0px",
      threshold: [1]
    });
  }
  loadOriginalImage(ele) {
    const src = ele.getAttribute("data-src");
    // replace
    ele.src = src;
    ele.onerror = () => {
      ele.classList.remove("image__progressive");
      ele.src = "https://via.placeholder.com/300?text=:(";
    };
    ele.onload = () => {
      ele.classList.remove("image__progressive");
      this.onLoadOrErrorCb();
    };
  }
  createImgElement(placeholderSrc, originalSrc) {
    const img = document.createElement("img");
    img.classList.add("image");
    img.classList.add("image__progressive");
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
      const imageId = Math.floor(Math.random() * Math.floor(300));
      const imageSrc = `https://picsum.photos/300/300/?image=${imageId}`;
      const imageEle = this.createImgElement(
        `https://picsum.photos/50/50/?image=${imageId}`,
        imageSrc
      );
      this.onLoadOrErrorCb = onLoadOrErrorCb;
      // add observer
      this.observer.observe(imageEle);
      fragment.append(imageEle);
    });

    document.getElementById("image-container").append(fragment);
  }
}

export default ProgressiveImageApp;
