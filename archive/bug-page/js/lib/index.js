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

(function () {
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
        console.log(el.closest(".product-list-item"));
        el.closest(".product-list-item").removeAttribute("href");
      }
    });
  }

  /* 追従要素/ハンバーガー
  ====================================================*/
  const ham = document.querySelector(".header_hamburger");
  const banr = document.querySelector("#bnrFix");
  const reqFix = document.querySelector(".require-fixed");

  /* モーダル bugsolution
  ====================================================*/
  if (document.querySelector("#bugsolution") && document.querySelector(".movie")) {
    new Ml(".js-modal", ".js-modal-open");
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
      if (banr) {
        banr.style.zIndex = 149;
      }
      if (reqFix) {
        reqFix.style.zIndex = 149;
      }
    });

    document.querySelector(".youtube-modal-close").addEventListener("click", (e) => {
      resumeLuxy(e);
      player.closeModal();
      e.stopPropagation();
      if (ham) {
        ham.style.zIndex = 300;
      }
      if (banr) {
        banr.style.zIndex = 150;
      }
      if (reqFix) {
        reqFix.style.zIndex = 150;
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

  /* アコーディオン
  ====================================================*/
  function toggleAcc(acc, contentBox) {
    const isOpening = !acc.classList.contains("open");
    // contentBox.style.height = isOpening ? contentBox.scrollHeight + "px" : "0";
    acc.classList.toggle("open", isOpening);

    if (isOpening) {
      contentBox.style.height = contentBox.scrollHeight + "px";
      contentBox.appendChild(acc);
      acc.scrollIntoView({ behavior: "smooth", block: "start" });

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
      accHead.scrollIntoView({ behavior: "smooth", block: "start" });

      contentBox.style.height = contentBox.scrollHeight + "px";
      setTimeout(() => {
        contentBox.style.height = "0";
      }, 200);
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
})();

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

  //top 追従バナー
  const bodyHeight = document.body.clientHeight;
  const windowHeight = window.innerHeight;
  const bottomPoint = bodyHeight - windowHeight;

  const currentPos = window.pageYOffset;
  const btnFix = document.getElementById("bnrFix");

  if (btnFix) {
    if (bottomPoint - 200 <= currentPos) {
      document.body.classList.add("is-scrollEnd");
      btnFix.classList.add("bottomEnd");
    } else {
      document.body.classList.remove("is-scrollEnd");
      btnFix.classList.remove("bottomEnd");
    }
  }
});

/* load event
====================================================*/
//top
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

window.onload = function () {
  setTimeout(function () {
    var hash = window.location.hash;
    if (hash && document.getElementById("luxy")) {
      smoothScroll(hash);
    }
  }, 500);
};
