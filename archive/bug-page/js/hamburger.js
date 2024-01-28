export class Hamburger {
  constructor() {
    this.menuFlg = false;
    this.body = document.body;
    this.menuButton = document.querySelector('.menu_link');
    this.menuAncrs = document.querySelectorAll('.header-sublink')

    this.menuButton.addEventListener('click', this.menuSetting.bind(this)); 

    this.menuAncrs.forEach(el => {
      el.addEventListener('click', () => {
          this.body.classList.remove('menu_on');
          this.body.classList.add('menu_off');
        
        
      })
    });
  }

  menuSetting() {

    if (!this.menuFlg) {
      this.menuFlg = true;
      this.body.classList.remove('menu_off');
      this.body.classList.add('menu_on');
    } else {
      this.menuFlg = false;
      this.body.classList.remove('menu_on');
      this.body.classList.add('menu_off');

      setTimeout(() => {
        const menuElement = document.querySelector('.menu');
        if (menuElement) {
          menuElement.scrollTop = 0;
        }
      }, 500);
    }
  }
  }
