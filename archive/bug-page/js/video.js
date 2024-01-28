export class VideoSetting {
  constructor(video, catchCopy, catchCopyBox, catchCopyThink, catchCopyImage, catchCopyText) {
    this.video = video;
    this.catchCopy = catchCopy;
    this.catchCopyImage = catchCopyImage;
    this.catchCopyBox = catchCopyBox;
    this.catchCopyThink = catchCopyThink;
    this.catchCopyText = catchCopyText;
    this.currentTime = video.currentTime;
    this.duration = video.duration;
  }

  change() {
    const currentTime = this.video.currentTime;
    const duration = this.video.duration;

    if (currentTime >= 0 && currentTime < 1) {
      this.catchCopyBox.classList.add("line-animation");
    } else if (currentTime >= 2 && currentTime < 3) {
      this.catchCopyBox.classList.add("scale-back");
    } else if (currentTime >= 3 && currentTime < 4) {
      this.catchCopyThink.classList.add("fade-in");
    } else if (currentTime >= 5 && currentTime < 6) {
      this.catchCopyText.classList.add("tracking-in-expand");
    } else if (currentTime >= 8 && currentTime < 9) {
      if (this.catchCopyText.classList.contains("tracking-in-expand")) {
        this.catchCopyText.classList.remove("tracking-in-expand");
        this.catchCopyText.style.opacity = "1";
      }
    } else if (currentTime >= 9 && currentTime < 10) {
      this.updateContent("./images/top/kv-ourself.png", "「ラボの良き理解者として何ができるか？<br>ダルトンの存在意義を問いかける。」");
    } else if (currentTime >= 16 && currentTime < 17) {
      this.updateContent("./images/top/kv-Researcher.png", "「研究者の行為ひとつひとつに着目し、<br>ダルトンがたどり着いた答え。」");
    } else if (currentTime >= 21 && currentTime < 22) {
      this.updateContent("./images/top/kv-Future.png", "「小さなイノベーションが、やがて<br>科学技術力の未来につながることを信じて。」");
    }

    if (duration - currentTime <= 5) {
      this.catchCopy.classList.add("focusOut");
      this.catchCopyText.style.opacity = "0";
    }
  }

  resetAnimationClasses() {
    this.catchCopyBox.classList.remove("line-animation", "scale-back");
    this.catchCopyThink.classList.remove("fade-in");
    this.catchCopyText.classList.remove("focusIn");
    this.catchCopyImage.classList.remove("fadeInX", "fadeInXout");
    this.catchCopy.classList.remove("focusOut");
  }

  updateContent(imageSrc, textContent) {
    if (this.catchCopyImage.classList.contains("fadeInX")) {
      this.catchCopyImage.classList.add("fadeInXout");
    }
    this.catchCopyText.classList.add("focusOut");

    setTimeout(() => {
      this.catchCopyImage.src = imageSrc;
      this.catchCopyText.innerHTML = textContent;

      this.catchCopyImage.classList.remove("fadeInXout");
      this.catchCopyText.classList.remove("focusOut");

      requestAnimationFrame(() => {
        this.catchCopyImage.classList.add("fadeInX");
        this.catchCopyText.classList.add("focusIn");
      });
    }, 1000);
  }
}
