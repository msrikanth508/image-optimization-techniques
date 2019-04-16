import Header from "./Header";
import LazyImageApp from "./LazyImageApp";
import AllImagesApp from "./AllImagesApp";
import ProgressiveImageApp from "./ProgressiveImageApp";

const messages = {
  msg0:
    "Default browser behaviour, it starts downloading all images while parsing DOM tree.",
  msg1:
    "In this approach, we will load low resolution image first. High quality image will be downloaded when user scrolls to specific image (Viewport).",
  msg2:
    "This is same as progressive approach. Expect we avoid downloding low resolution image and cover with single placeholder image."
};
class App {
  constructor() {
    this.mode = 0;
    this.count = 0;
    this.header = new Header(300);
    this.bindEvents()
    this.loadAppWithMode();
  }
  bindEvents() {
    // bind buttons
    const radioBtns = document.querySelectorAll(".app__body--actions");
    // scroll top icon
    const scrollTopEle = document.getElementById("scroll-top");
    // scroll progress bar
    const scrollProgressEle = document.querySelector(
      ".app__header--scroll-progress"
    );
    // message
    document.querySelector(`.msg-placeholder`).innerText = messages[`msg${this.mode}`];
    // bind event
    scrollTopEle.addEventListener("click", event => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    // bind event on checkbox
    radioBtns.forEach(btn => {
      btn.addEventListener("click", this.changeMode.bind(this), true);
    });
    // add scroll event
    document.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        scrollTopEle.classList.remove("hide");
        scrollTopEle.classList.add("show");
        scrollProgressEle.style.visibility = "visible";
        scrollProgressEle.style.width = `${document.documentElement.scrollTop *
          (100 / document.documentElement.scrollHeight)}%`;
      } else {
        scrollTopEle.classList.add("hide");
        scrollProgressEle.style.visibility = "hidden";
      }
    });
  }
  loadAppWithMode() {
    this.count = 0;
    switch (this.mode) {
      case 0: {
        this.app = new AllImagesApp();
        break;
      }
      case 1: {
        this.app = new ProgressiveImageApp();
        break;
      }
      case 2: {
        this.app = new LazyImageApp();
        break;
      }
    }
    this.app.renderImages(this.updateCount.bind(this));
  }
  updateCount() {
    window.requestAnimationFrame(() => {
      this.count++;
      this.header.updateCount(this.count);
    });
  }
  changeMode(evt) {
    let target;
    if (evt.target !== evt.currentTarget) {
      target = evt.target.parentElement;
    }
    // active radio button
    document
      .querySelector(`.app__body--action-${this.mode}`)
      .classList.remove("active");
    
    this.mode = parseInt(target.dataset["mode"], 10);
    document
      .querySelector(`.app__body--action-${this.mode}`)
      .classList.add("active");
      document.querySelector(`.msg-placeholder`).innerText = messages[`msg${this.mode}`];
    this.loadAppWithMode();
  }
}

export default App;
