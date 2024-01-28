export class ScrollObserver {
  constructor(target, options, callback) {
    this.options = options || {};

    this.callback = callback;

    this.observer = new IntersectionObserver((entries) => this.handleIntersect(entries), this.options);

    this.target = document.querySelectorAll(target);

    this.observe();
  }
  observe() {
    this.target.forEach(el => {
      if (!el) {
        console.warn('Target not found');
        return;
      }
      this.observer.observe(el);
    });
  }
  unobserve() {
    this.target.forEach(el => {
      if (!el) return;
      this.observer.unobserve(el);
    });
  }
  handleIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.callback(entry);
      }
    });
  }
}