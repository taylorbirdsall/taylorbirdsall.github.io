import $ from 'jquery';

export default class Header
{
  constructor() {
    this.headerEl = document.getElementById('Header');
    this.headerHeight = this.headerEl.offsetHeight;
    this.menuLinks = document.querySelectorAll('.Header-link');
    this.setUpSmoothScroll();
  }

  setUpSmoothScroll() {
    let that = this;
    for (const menuLink of this.menuLinks) {
      menuLink.addEventListener('click', function() {
        const targetSection = $(this.hash);
        const topOffset = targetSection.offset().top - that.headerHeight;
        $('html, body').animate({
          scrollTop: topOffset
        }, 1000)
      });
    }
  }
}
