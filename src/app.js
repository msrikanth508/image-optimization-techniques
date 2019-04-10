import Header from "./Header";
import LazyImageApp from "./LazyImageApp";
import AllImagesApp from "./AllImagesApp";
import ProgressiveImageApp from "./ProgressiveImageApp";

class App {
  constructor() {
    this.mode = 0;
    this.count = 0;
    this.header = new Header(300);
    const btns = document.querySelectorAll(".app__body--items-actions");
    const scrollTopEle = document.getElementById("scroll-top");
    document.querySelector(`.msg-${this.mode}`).classList.add("show");

    scrollTopEle.addEventListener("click", event => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    btns.forEach(btn => {
      btn.addEventListener("click", this.changeMode.bind(this), true);
    });
    document.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        scrollTopEle.classList.add("show");
      } else {
        scrollTopEle.classList.remove("show");
      }
    });
    this.loadAppWithMode();
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
    document.querySelector(`.msg-${this.mode}`).classList.remove("show");

    this.mode = parseInt(target.dataset["mode"], 10);
    document
      .querySelector(`.app__body--action-${this.mode}`)
      .classList.add("active");
    document.querySelector(`.msg-${this.mode}`).classList.add("show");
    this.loadAppWithMode();
  }
};

export default App;
