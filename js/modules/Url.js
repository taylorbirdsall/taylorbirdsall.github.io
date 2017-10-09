export default class Url {
  static init() {
    new Url();
  }

  constructor() {
    this.url = new URL(window.location.href);
    this.body = document.body;

    this.checkUrl();
  }

  checkUrl() {
    const searchParams = this.url.searchParams;
    const flag = searchParams.get('recruiting');

    if (flag === 'true') {
      this.body.classList.add('full');
    }
  }
}
