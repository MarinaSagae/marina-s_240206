export class HoverInteraction {
  constructor(hoverAreas, listItems, images) {
    this.hoverAreas = hoverAreas;
    this.listItems = listItems;
    this.images = images;
    this.mainImg = document.querySelector('.main-img');
    this.setupHoverInteraction();
  }

  handleHover(hoverId) {
      this.listItems.forEach(item => {
        const productNum = item.querySelector('.productNum');
        if (productNum && productNum.textContent.trim() === hoverId) {
          productNum.style.backgroundColor = '#fff';
          productNum.style.color = '#009fe7';
        } else {
          productNum.style.backgroundColor = '#009fe7';
          productNum.style.color = '#fff';
        }

        item.style.backgroundColor = item.dataset.hover === hoverId ? '#009fe7' : '';
        item.style.color = item.dataset.hover === hoverId ? '#fff' : '#000';
      });
    
    
      this.images.forEach(image => {
        image.style.opacity = image.dataset.hover === hoverId ? '1' : '0';
        image.style.visibility = image.dataset.hover === hoverId ? 'visible' : 'hidden';
        });
    this.mainImg.style.opacity = '0';
    this.mainImg.style.visibility = 'hidden';
  }

  resetHoverEffects() {
      this.listItems.forEach(item => {
        const productNum = item.querySelector('.productNum');
        if (productNum) {
          productNum.style.backgroundColor = '#0085cd';
          productNum.style.color = '#fff';
        }

        item.style.backgroundColor = '';
        item.style.color = '#000';
      });
    this.images.forEach(image =>  {
      image.style.opacity = '0'
      image.style.visibility = 'hidden';
    })
    this.mainImg.style.opacity = '1';
    this.mainImg.style.visibility = 'visible';
  }

  setupHoverInteraction() {
    this.hoverAreas.forEach(hoverArea => {
      hoverArea.addEventListener('mouseover', () => {
        this.handleHover(hoverArea.dataset.hover);
      });

      hoverArea.addEventListener('mouseout', () => {
        this.resetHoverEffects();
      });
    });

    this.listItems.forEach(listItem => {
      listItem.addEventListener('mouseover', () => {
        this.handleHover(listItem.dataset.hover);
      });

      listItem.addEventListener('mouseout', () => {
        this.resetHoverEffects();
      });
    });
  }
}