export default class Header {
  constructor(totalImagesCount) {
    const ele = document.querySelector("#totalImagesCount");
    ele.innerText = totalImagesCount;
  }
  updateCount(count) {
    const ele = document.querySelector("#presentImagesCount");
    ele.classList.add("flash");
    ele.innerText = count;
    // remove animation after 1s
    setTimeout(() => {
      ele.classList.remove("flash");
    }, 1000);
  }
}