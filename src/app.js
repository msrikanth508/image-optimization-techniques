import Header from "./Header";
import LazyImageApp from "./LazyImageApp";
import AllImagesApp from "./AllImagesApp";
import ProgressiveImageApp from "./ProgressiveImageApp";

const messages = {
  msg0:
    "Default browser behaviour, it starts downloading all images while parsing DOM tree.",
  msg1:
    "In this method, we will load low-resolution image first, and when a user sees or scrolls towards it, we will start downloading high-resolution image. It eliminates unnecessary downloading and saves lots of data in case of mobile users.",
  msg2:
    "It's the same as progressive load except that we avoid displaying low-resolution image. Instead, we will display one placeholder image."
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
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
          scrollProgressEle.style.width = `100%`;
        } else {
          scrollProgressEle.style.width = `${document.documentElement.scrollTop *
            (100 / document.documentElement.scrollHeight)}%`;
        }
        
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
