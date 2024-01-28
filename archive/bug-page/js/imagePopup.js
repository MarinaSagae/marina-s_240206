export class ImagePopup {
  constructor(openEls, closeEl, modalEl, imgEl) {
    this.openEls = document.querySelectorAll(openEls);
    this.closeEl = document.querySelector(closeEl);
    this.modalEl = document.querySelector(modalEl);
    this.imgEl = document.querySelector(imgEl);
    this.body = document.querySelector("body");
  }

  open() {
    this.openEls.forEach((el) => {
      el.addEventListener("click", () => {
        const imgSrc = el.dataset.img;
        this.imgEl.src = imgSrc;
        this.modalEl.classList.add("active");
        this.body.style.overflow = "hidden";

        if (el.classList.contains("big") && !this.modalEl.classList.contains("big")) {
          this.modalEl.classList.add("big");
        } else {
          this.modalEl.classList.remove("big");
        }
      });
    });
  }

  close() {
    this.closeEl.addEventListener("click", () => {
      clearTimeout(this.timerId);
      this.modalEl.classList.remove("active");
      this.body.style.overflow = "auto";

      if (this.modalEl.classList.contains("big")) {
        this.modalEl.classList.remove("big");
      }
    });
  }
}
