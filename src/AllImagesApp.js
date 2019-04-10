export default  class AllImagesApp {
  createImgElement(src, cb) {
    const img = document.createElement("img");
    img.className = "image";
    img.src = src;
    img.onerror = () => {
      img.classList.remove("image__animate");
      img.src = "https://via.placeholder.com/300?text=:(";
    };
    img.onload = () => {
      img.classList.add("image__animate");
      cb();
    };
    return img;
  }
  renderImages(onLoadOrError) {
    const fragment = document.createDocumentFragment();
    Array.from({ length: 300 }).forEach(() => {
      const imageSrc = `https://picsum.photos/300/300/?image=${Math.floor(
        Math.random() * Math.floor(300)
      )}`;
      const imageEle = this.createImgElement(imageSrc, onLoadOrError);

      fragment.append(imageEle);
    });
    document.getElementById("image-container").innerHTML = "";
    document.getElementById("image-container").append(fragment);
  }
}
