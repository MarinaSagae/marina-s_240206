export class MySwiper {
  constructor(el, options, useMediaQuery) {
    this.el = el;
    this.options = options;
    this.useMediaQuery = useMediaQuery;
    this.swiperInstance = null;

    if (this.useMediaQuery) {
      this.mediaQuery = window.matchMedia('(max-width: 750px)');
      this.mediaQuery.addListener(this.checkBreakpoint.bind(this));
      this.checkBreakpoint(this.mediaQuery);
    } else {
      this.initSwiper();
    }
  }

  swiperBtn() {
    this.swiperInstance.on('slideChange', () => {
      const slideNext = document.querySelector('.nextBtn1');
      const slidePrev = document.querySelector('.prevBtn1');
      const slideNextIndex = slideNext.getAttribute('tabIndex');
      const slidePrevIndex = slidePrev.getAttribute('tabIndex');

      if (slideNextIndex == 0 && slidePrevIndex == 0) {
        slidePrev.classList.remove('glow');
      } else if (slideNextIndex == -1) {
        slidePrev.classList.add('glow');
      }
    });
  }

  checkBreakpoint(e) {
    if (e.matches) {
      if (!this.swiperInstance) {
        this.initSwiper();
      }
    } else {
      if (this.swiperInstance) {
        this.destroySwiper();
      }
    }
  }

  initSwiper() {
    this.swiperInstance = new Swiper(this.el, this.options);
  }

  destroySwiper() {
    this.swiperInstance.destroy(true, true);
    this.swiperInstance = null;
  }
}
