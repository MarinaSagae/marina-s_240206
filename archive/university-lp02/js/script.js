"use strict";

// ==================== ハンバーガーメニュー ====================
const hum = document.querySelector('.hum');
const body = document.querySelector('body');
const Close = document.querySelector('.close');
const List = document.querySelectorAll('.list');

hum.addEventListener('click', () => {
  hum.classList.toggle('is-active');
  body.classList.toggle('bg-active');
  Close.classList.toggle('is-slide');
  List.forEach(function(el) {
    el.classList.toggle('is-list');
  });
});

// ハンバーガーメニュー内のリンクをクリックしたら、メニューを閉じる
$('a[href*="#"]').on('click', function() {  
  $('.hum').removeClass('is-active');
  $('body').removeClass('bg-active');
  $('.close').removeClass('is-slide');
  $('.list').removeClass('is-list');
});


// gsap メニュー表示の調整
const menuButton = document.querySelector('.hum');
const siteMenu = document.querySelector('.hum-menu');

let menuOpen = false;
let isAnimating = false; // アニメーション中かどうかのフラグ

menuButton.addEventListener('click', () => {
  if (isAnimating) return; // アニメーション中はクリックを無効化

  isAnimating = true; // アニメーション中フラグを設定

  if (!menuOpen) {
    // Open the menu
    gsap.set(siteMenu, { top: '100%' }); 
    gsap.to(siteMenu, { duration: 0.5, top: '0%', ease: 'power2.inOut' });
    menuOpen = true;
  } else {
    // Close the menu
    gsap.to(siteMenu, { duration: 0.5, top: '-100%', ease: 'power2.inOut', delay: 0.3 });
    menuOpen = false;
  }

  // アニメーションが終了したらアニメーション中フラグを解除
  gsap.to({}, { duration: 0.8, onComplete: () => { isAnimating = false; } });
});

// aタグがクリックされたときもメニューを閉じる
const links = document.querySelectorAll('.list a');
links.forEach(link => {
  link.addEventListener('click', () => {
    if (menuOpen) {
      // Close the menu
      gsap.to(siteMenu, { duration: 0.5, top: '-100%', ease: 'power2.inOut', delay: 0.3 });
      menuOpen = false;
    }
  });
});



// =================== ヘッダーの高さを取得したスクロール =================== 
$("a[href^='#']").on('click', function(event) {
  event.preventDefault(); // リンクのデフォルト動作を無効化

  let $el = $($(this).attr('href'));
  let offset = 150; // 追加の余白（ピクセル）を設定
  let pos = $el.length ? Math.floor($el.offset().top - $('#Header').outerHeight()) - offset : 0;
  $('body, html').animate({scrollTop: pos}, 300);
});



// =================== Intersection Observer ===================
const targets = document.querySelectorAll('.scr-target');
let observer;
let windowWidth = window.innerWidth;

function initializeObserver() {
  if (observer) {
    // 既存のObserverが存在する場合は解除
    observer.disconnect();
  }

  // 交差したときに実行する関数
  function intersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let animationType = entry.target.getAttribute('data-animation-type');
        let delay = entry.target.getAttribute('data-delay');
        
        // ウィンドウ幅に応じて適切な遅延値を設定
        let animationDelay = windowWidth < 750 && entry.target.hasAttribute('sp-data-delay')
          ? entry.target.getAttribute('sp-data-delay')
          : delay;

        entry.target.style.animationDelay = animationDelay;
        entry.target.classList.add(animationType);
      }
    });
  }

  const threshold = windowWidth < 750 ? 0.5 : 0;

  const options = {
    root: null,
    rootMargin: '-50px 0px',
    threshold: threshold
  };

  observer = new IntersectionObserver(intersect, options);

  // 対象の要素をそれぞれ監視する
  targets.forEach(target => {
    observer.observe(target);
  });
}

// ウィンドウのリサイズイベントを監視
window.addEventListener('resize', handleResize);

function handleResize() {
  windowWidth = window.innerWidth;
  // ウィンドウのリサイズに応じてObserverを再初期化
  initializeObserver();
}

// 初期化を呼び出し、ウィンドウの幅に応じてObserverをセットアップ
initializeObserver();



// =================== 一定の位置に来たら、スクロール促すのを消す ===================
$(window).scroll(() => {
  let elemPos = $('.stop-scroll').offset().top - 50;
  let scroll = $(window).scrollTop();
  let windowHeight = $(window).height();
  if(scroll >= elemPos - windowHeight) {
    $('.scroll_nav').addClass('is-scroll-non');
  } else {
    $('.scroll_nav').removeClass('is-scroll-non');
  }
});