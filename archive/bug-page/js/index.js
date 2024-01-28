import { ScrollObserver } from "./scrollObserver.js";
import { MySwiper } from "./swiper.js";
import { SwitchTab } from "./tab.js";
import { Hamburger } from "./hamburger.js";
import { HoverInteraction } from "./mousehover.js";
import { SwipeItemsAnimator } from "./swipe.js";
import { pauseLuxy, resumeLuxy, isLuxyActive, luxyControll } from "./luxyControl.js";
import { YouTubePlayer } from "./youtubePlayer.js";
import { VideoSetting } from "./video.js";
import { Ml } from "./modal.js";
import { ImagePopup } from "./imagePopup.js";

(function () {
  /* 追従要素/ハンバーガー
  ====================================================*/
  const ham = document.querySelector(".header_hamburger");
  const reqFix = document.querySelector(".require-fixed");
  const cookie = document.querySelector(".cookie");

  if ((document.querySelector("#top") && reqFix) || (document.querySelector("#bugsolution main .kv") && reqFix)) {
    reqFix.classList.add("fix-none");
    if (reqFix.classList.contains("fix-none")) {
      cookie.style.bottom = "0";
    }
  }

  /* luxy
    ====================================================*/
  if (document.getElementById("luxy")) {
    if (isLuxyActive() && window.innerWidth >= 750) {
      luxyControll();
    }
  }

  /* hamburger

  ====================================================*/

  if (document.querySelector(".header_hamburger")) new Hamburger();

  /* scroll observer

  ====================================================*/
  const options = {
    root: null,
    rootMargin: "",
    threshold: 0.5,
  };
  const optionsTop = {
    root: null,
    rootMargin: "",
    threshold: [0, 0.25, 0.5, 0.75, 1],
  };

  const onIntersect = (entry) => {
    let animationType = entry.target.getAttribute("data-animation-type");
    let delay = entry.target.getAttribute("data-delay");

    entry.target.style.animationDelay = delay;
    entry.target.classList.add(animationType);
  };

  if (document.querySelectorAll(".scr-target").length > 0) {
    new ScrollObserver(".scr-target", options, onIntersect);
  }
  if (document.querySelector("#luxy") && document.querySelectorAll(".scr-target").length > 0) {
    new ScrollObserver(".scr-target", optionsTop, onIntersect);
  }

  /* swiper

  ====================================================*/
  const swiperElement_1 = document.querySelector(".sec-swiper-1 .swiper");
  const swiperElement_2 = document.querySelector(".sec-swiper-2 .swiper");

  function getSwiperOptions(btnNext, btnPrev, pagination) {
    const options = {
      navigation: {
        nextEl: btnNext,
        prevEl: btnPrev,
      },
    };

    if (pagination) {
      options.pagination = {
        el: pagination,
        clickable: true,
      };
    }

    return options;
  }

  function getSwiperOptions2(btnNext, btnPrev) {
    const options = {
      loop: true,
      slidesPerView: 1.5,
      centeredSlides: true,
      navigation: {
        nextEl: btnNext,
        prevEl: btnPrev,
      },
    };

    return options;
  }

  if (swiperElement_1) {
    const myswiper1 = new MySwiper(swiperElement_1, getSwiperOptions(".nextBtn1", ".prevBtn1", ".swiper-pagination"), false);
    myswiper1.swiperBtn();
  }

  if (swiperElement_2) {
    new MySwiper(swiperElement_2, getSwiperOptions2(".nextBtn2", ".prevBtn2"), true);
  }

  /* tab

  ====================================================*/

  const tabs = document.querySelectorAll(".tab");
  const tabPanel = document.querySelectorAll(".tab-panel");
  if (tabs.length > 0 && tabPanel.length > 0) {
    tabPanel.forEach((el) => {
      if (!el.classList.contains("no-init")) {
        new SwitchTab(tabs);
      }
    });
  }

  /* mousehover

  ====================================================*/
  const hoverAreas = document.querySelectorAll(".hover-area");
  const listItems = document.querySelectorAll(".product-list-item");
  const images = document.querySelectorAll(".image-change");

  if (window.matchMedia("(min-width: 750px)").matches) {
    if (hoverAreas && listItems && images) {
      new HoverInteraction(hoverAreas, listItems, images);
    }
  }

  /* sp swipe

  ====================================================*/
  const allSwipeItems = document.querySelectorAll(".all_swipe_item");
  if (allSwipeItems.length) {
    if (window.matchMedia("(max-width: 750px)").matches) {
      new SwipeItemsAnimator(allSwipeItems);
    }
  }

  /* scene aタグリンク無効
  ====================================================*/
  const productLinks = document.querySelectorAll(".product-link");
  if (productLinks) {
    productLinks.forEach((el) => {
      if (el.innerHTML === "") {
        el.closest(".product-list-item").removeAttribute("href");
      }
    });
  }

  /* モーダル bugsolution
  ====================================================*/
  if (document.querySelector("#bugsolution") && document.querySelector(".movie")) {
    new Ml(".js-modal", ".js-modal-open", ".js-modal-close");
  }

  /* youtube player
  ====================================================*/
  if (document.querySelector(".youtube-circle")) {
    const player = new YouTubePlayer(".youtube-modal", "3WB-65slhT4");

    document.querySelector(".youtube-modal").addEventListener("click", () => {
      pauseLuxy();
      luxyControll();
      player.openModal();
      if (ham) {
        ham.style.zIndex = 149;
      }
      if (reqFix) {
        reqFix.style.zIndex = 149;
      }
      if (cookie) {
        cookie.style.zIndex = 149;
      }
    });

    document.querySelector(".youtube-modal-close").addEventListener("click", (e) => {
      resumeLuxy(e);
      player.closeModal();
      e.stopPropagation();
      if (ham) {
        ham.style.zIndex = 300;
      }
      if (reqFix) {
        reqFix.style.zIndex = 150;
      }
      if (cookie) {
        cookie.style.zIndex = 150;
      }
    });
  }

  /* kv video
  ====================================================*/
  const video = document.querySelector(".videoElement");
  if (video) {
    const catchCopy = document.querySelector(".catch-copy");
    const catchCopyThink = document.querySelector(".catch-copy-think");
    const catchCopyBox = document.querySelector(".catch-copy-box");
    const catchCopyImage = document.querySelector(".catch-copy-img");
    const catchCopyText = document.querySelector(".catch-copy-text");

    const replay = document.querySelector(".replay");
    const replayBtn = document.querySelector(".replay .video-play");

    const videoSetting = new VideoSetting(video, catchCopy, catchCopyBox, catchCopyThink, catchCopyImage, catchCopyText);
    video.addEventListener("timeupdate", () => {
      videoSetting.change();
    });
    video.addEventListener("ended", () => {
      replay.style.display = " block";
    });

    replayBtn.addEventListener("click", () => {
      replay.style.display = " none";
      setTimeout(() => {
        video.currentTime = 0;
        videoSetting.resetAnimationClasses();
        video.play();
      }, 1000);
    });
  }

  /* アコーディオン lineup/index
  ====================================================*/
  function toggleAcc(acc, contentBox) {
    const isOpening = !acc.classList.contains("open");
    acc.classList.toggle("open", isOpening);

    if (isOpening) {
      contentBox.style.height = contentBox.scrollHeight + "px";
      contentBox.appendChild(acc);
      console.log(acc);
      // スクロール
      smoothScrollToElement(acc, 100);

      const allSwipeItems = document.querySelectorAll(".all_swipe_item-acc");
      if (allSwipeItems.length) {
        if (window.matchMedia("(max-width: 750px)").matches) {
          new SwipeItemsAnimator(allSwipeItems);
        }
      }
    } else {
      const accHead = contentBox.previousElementSibling;
      acc.classList.remove("open");
      accHead.appendChild(acc);

      // スクロール
      smoothScrollToElement(accHead.closest(".contents"), 100);

      contentBox.style.transition = "height 0.4s ease-in-out";
      contentBox.style.height = contentBox.scrollHeight + "px";
      setTimeout(() => {
        contentBox.style.height = "0";
      }, 400);
    }
  }

  function initAccordion() {
    const accBtn = document.querySelectorAll(".acc-arrow");
    accBtn.forEach((btn) => {
      const contentBox = btn.closest(".acc-head").nextElementSibling;
      btn.addEventListener("click", () => toggleAcc(btn, contentBox));
    });
  }

  if (document.querySelector(".main.lineup")) {
    initAccordion();
  }

  /* image popup
====================================================*/
  if (document.querySelectorAll(".ml-img-target").length) {
    const imagePopup = new ImagePopup(".ml-img-target", ".ml-cl", ".ml", ".ml img");
    imagePopup.open();
    imagePopup.close();
  }

  /* スムーススクロール
====================================================*/
  setTimeout(function () {
    var hash = window.location.hash;
    if (hash && document.getElementById("luxy")) {
      smoothScroll(hash);
    }
  }, 500);
})();

//top スムーススクロール 関数
function smoothScroll(targetSelector) {
  var target = targetSelector === "#" ? document.body : document.querySelector(targetSelector);
  if (target) {
    var position = target.getBoundingClientRect().top + window.scrollY - document.querySelector("#luxy").getBoundingClientRect().top;
    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  }
}

//lineup スクロール 関数
function getElementY(element) {
  const top = element.getBoundingClientRect().top;
  return window.pageYOffset + top;
}

function smoothScrollToElement(element, duration) {
  smoothScrollTo(element, duration);
}

function smoothScrollTo(element, duration) {
  const startingY = window.pageYOffset;
  const targetY = getElementY(element);
  const diff = targetY - startingY;
  const easing = (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
  let start;

  if (!diff) return;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    let time = timestamp - start;
    let percent = Math.min(time / duration, 1);
    percent = easing(percent);

    window.scrollTo(0, startingY + diff * percent);

    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
}

/* scroll event
====================================================*/

window.addEventListener("scroll", () => {
  //hamburger
  const sections = document.querySelectorAll("section.bg");
  const ham = document.querySelector(".header_hamburger");

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const bottom = rect.bottom + window.scrollY;

    if (window.scrollY >= top && window.scrollY <= bottom) {
      if (section.classList.contains("bk")) {
        ham.classList.add("wt");
        ham.classList.remove("bk");
      } else if (section.classList.contains("wt")) {
        ham.classList.add("bk");
        ham.classList.remove("wt");
      }
    }
  });

  /* ページトップへ*/
  let elem = document.querySelector(".scll-display");

  if (elem) {
    let elemPos = elem.getBoundingClientRect().top;
    let windowHeight = window.innerHeight;
    if (elemPos <= windowHeight) {
      document.querySelector(".top-scroll").classList.add("is-display");
    } else {
      document.querySelector(".top-scroll").classList.remove("is-display");
    }
  }

  //追従リンク
  const requireFixed = document.querySelector(".require-fixed");
  //cookie
  const cookie = document.querySelector(".cookie-consent");

  const bodyHeight = document.body.clientHeight;
  const windowHeight = window.innerHeight;
  const bottomPoint = bodyHeight - windowHeight;
  const currentPos = window.pageYOffset || document.documentElement.scrollTop;

  //top
  if (requireFixed) {
    // ページの最下部に近づいた場合
    if (bottomPoint - 200 <= currentPos) {
      requireFixed.classList.remove("fix-none");

      if (cookie.classList.contains("fix-none")) {
        if (window.innerWidth >= 750) {
          cookie.style.bottom = "10rem";
        } else {
          cookie.style.bottom = "12rem";
        }
      }
    }
    // PCで、スクロール位置がtopKv下にある場合
    else if (document.querySelector(".kv-video") && currentPos > document.querySelector(".kv-video").offsetHeight) {
      requireFixed.classList.remove("fix-none");

      if (cookie) {
        if (window.innerWidth >= 750) {
          cookie.style.bottom = "10rem";
        } else {
          cookie.style.bottom = "12rem";
        }
      }
    }
    // 上記の条件を満たさない場合
    else {
      requireFixed.classList.add("fix-none");

      if (cookie) {
        cookie.style.bottom = "0rem";
      }
    }

    // 'is-scrollEnd' クラスの制御
    if (bottomPoint - 200 <= currentPos) {
      document.body.classList.add("is-scrollEnd");
    } else {
      document.body.classList.remove("is-scrollEnd");
    }
  }

  //bugsoluton
  if (document.querySelector("#bugsolution main .kv")) {
    if (document.querySelector("#bugsolution main .kv") && currentPos > document.querySelector("#bugsolution main .kv").offsetHeight) {
      requireFixed.classList.remove("fix-none");
      if (cookie) {
        if (window.innerWidth >= 750) {
          cookie.style.bottom = "10rem";
        } else {
          cookie.style.bottom = "12rem";
        }
      }
    } else {
      requireFixed.classList.add("fix-none");
      if (cookie) {
        cookie.style.bottom = "0rem";
      }
    }
  }
});
