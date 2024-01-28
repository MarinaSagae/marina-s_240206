export class SwipeItemsAnimator {
  constructor(swipeItems) {
    this.swipeItems = swipeItems;
    this.attachEventListeners();
  }

  checkPosition() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    this.swipeItems.forEach(swipeItem => {
      const elemTop = swipeItem.getBoundingClientRect().top + scrollTop;

      if (scrollTop > elemTop - windowHeight + 100) {
        swipeItem.classList.add('on');
        setTimeout(() => {
          swipeItem.classList.add('none');
        }, 2600);
      } else {
        swipeItem.classList.remove('on', 'none');
      }
    });
  }

  attachEventListeners() {
    window.addEventListener('load', this.checkPosition.bind(this));
    window.addEventListener('scroll', this.checkPosition.bind(this));
  }
}