export default class Header
{
  static init() {
    new Header();
  }

  constructor() {
    this.bodyEl = document.body;
    this.headerEl = document.getElementById('Header');
    this.headerHeight = this.headerEl.offsetHeight;
    this.menuLinks = document.querySelectorAll('.Header-link');
    this.mobileButtonEl = document.getElementById('Header-menuIcon');

    this.firstFocusEl = this.mobileButtonEl;
    this.lastFocusEl = document.querySelector('.Header-item:last-child .Header-link');
    this.focusTrapIsSetup = false;

    this.setUpSmoothScroll();
    this.setUpMenuTransitions();
    this.setUpMobile();
  }

  setUpSmoothScroll() {
    let that = this;
    for (const menuLink of this.menuLinks) {
      menuLink.addEventListener('click', function(e) {
        that.headerEl.classList.toggle('open');
        document.body.classList.remove('noScroll');

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

  setUpMenuTransitions() {
    if (document.body.scrollTop > 10) {
      this.setHeaderClass('hasScrolled');
    }

    window.setTimeout(() => {
        document.body.classList.add('startAnimation');
    }, 1);

    window.addEventListener('scroll', () => {
      const topScrollVal = document.body.scrollTop;
      if (!this.checkHeaderClass('hasScrolled') && topScrollVal > 10) {
        this.setHeaderClass('hasScrolled');
      } else if (topScrollVal <= 10 && this.checkHeaderClass('hasScrolled')) {
        this.removeHeaderClass('hasScrolled');
      }
    });
  }

  checkHeaderClass(className) {
    return this.headerEl.classList.contains(className);
  }

  setHeaderClass(className) {
    this.headerEl.classList.add(className);
  }

  removeHeaderClass(className) {
    this.headerEl.classList.remove(className);
  }

  setUpMobile() {
    if (this.isMobile()) {
      this.setTabIndex(-1);
    }

    // TODO: maybe use optimized resize

    this.mobileButtonEl.addEventListener('click', () => {
      this.headerEl.classList.toggle('open');
      this.bodyEl.classList.toggle('noScroll');

      if (this.headerEl.classList.contains('open')) {
        this.setTabIndex(0);

        if (!this.focusTrapIsSetup) {
          this.setUpFocusTrap();
        }
      } else {
        if (this.isMobile()) {
          this.setTabIndex(-1);
        }
      }
    });
  }

  setUpFocusTrap() {
    this.lastFocusEl.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' || e.keyCode === 9) {
        e.preventDefault();

        if (this.isMobile()) {
          this.firstFocusEl.focus();
        }
      }
    });

    this.focusTrapIsSetup = true;
  }

  setTabIndex(index) {
    for (let link of document.querySelectorAll('.Header-link')) {
      link.tabIndex = index;
    }
  }

  isMobile() {
    return window.matchMedia("(max-width: 787px)").matches;
  }
}
