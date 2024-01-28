export class SwitchTab {
  constructor(tab) {
    this.tabs =tab
    for (let i = 0; i < this.tabs.length; i++) {
      this.tabs[i].addEventListener('click', () => this.tabSwitch(i));
    }
  }

  tabSwitch(index) {
    document.querySelector('.is-active').classList.remove('is-active');
    this.tabs[index].classList.add('is-active');

    document.querySelector('.panel-group .is-show').classList.remove('is-show');
    document.querySelectorAll('.panel')[index].classList.add('is-show');
  }
}