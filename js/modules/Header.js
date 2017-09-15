export default class Header
{
  static init() {
    new Header();
  }

  constructor() {
    this.headerEl = document.getElementById('Header');
    this.headerHeight = this.headerEl.offsetHeight;
    this.menuLinks = document.querySelectorAll('.Header-link');
    this.setUpSmoothScroll();
  }

  setUpSmoothScroll() {
    let that = this;
    for (const menuLink of this.menuLinks) {
      menuLink.addEventListener('click', function(e) {
        let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (isSafari) {e.preventDefault();};
        const targetSection = document.getElementById(this.hash.substring(1));
        that.scrollIt(targetSection);
      });
    }
  }

  scrollIt(destination, duration = 500, easing = 'ease', callback) {
    const easings = {
      linear(t) {
        return t;
      },
      ease(t) {
        return t * (2 - t);
      }
    };

    const startOffset = window.pageYOffset;

    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    const destinationOffset = destination.offsetTop;
    const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
    if ('requestAnimationFrame' in window === false) {
      window.scroll(0, destinationOffsetToScroll);
      if (callback) {
        callback();
      }
      return;
    }

    if (window.pageYOffset == destinationOffset) {
      return;
    }

    function scroll() {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, ((now - startTime) / duration));
      const timeFunction = easings[easing](time);
      window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

      if ((window.pageYOffset) === destinationOffsetToScroll) {
        if (callback) {
          callback();
        }
        return;
      }

      requestAnimationFrame(scroll);
    }

    scroll();
  }
}
