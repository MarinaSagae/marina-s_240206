export class Ml {
  constructor(ml, op, cl) {
    this.modal = document.querySelector(ml);
    this.close = document.querySelector(cl);
    this.open = document.querySelector(op);
    this.ham = document.querySelector(".header_hamburger");
    this.reqFix = document.querySelector(".require-fixed");
    this.cookie = document.querySelector(".cookie");

    this.open.addEventListener("click", this.modalOpen.bind(this));
    this.close.addEventListener("click", this.modalOut.bind(this));
  }

  modalOpen() {
    this.modal.classList.add("is-active");

    if (this.ham) {
      this.ham.style.zIndex = 149;
    }
    if (this.reqFix) {
      this.reqFix.style.zIndex = 149;
    }
    if (this.cookie) {
      this.cookie.style.zIndex = 149;
    }
  }

  modalOut() {
    this.modal.classList.remove("is-active");
    this.stopYouTubeVideos();

    if (this.ham) {
      this.ham.style.zIndex = 300;
    }
    if (this.reqFix) {
      this.reqFix.style.zIndex = 150;
    }
    if (this.cookie) {
      this.cookie.style.zIndex = 150;
    }
  }

  stopYouTubeVideos() {
    const iframes = this.modal.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      const src = iframe.src;
      if (src.includes("youtube.com")) {
        iframe.contentWindow.postMessage('{"event":"command", "func":"pauseVideo", "args":""}', "*");
      }
    });
  }
}
