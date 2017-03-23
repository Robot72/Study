let option = new Option('SPB', 4);
let fbForm = document.forms.feedback;
let cities = fbForm.city.options.add(option);

class Menu {
  constructor(options) {
    this.options = options;
  }

  initEventHandlers() {
    this.elem.addEventListener('mousedown', (e) => {
      return false;
    });

    this.elem.addEventListener('click', (e) => {
      if(e.target.closest('.title')) {
        this.toggle();
      }
    });
  }

  toggle() {
    this.elem.classList.toggle('open');
  }

  getElem() {
    if(! this.elem) this.render();
    return elem;
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.className = 'menu';

    let titleElem = document.createElement('span');
    this.elem.appendChild(titleElem);
    titleElem.className = 'title';
    titleElem.textContent = this.options.titleText;

    this.initEventHandlers();


  }

  renderItems() {
    let items = options.items || [];
    let ul = document.createElement('ul');
    items.forEach((item) => {
      let li = document.createElement('li');
      li.textContent = item.text;
      // li.setAttribu
    });

  }
}

let menu = new Menu({
  elem: document.querySelector('#sweets')
});
menu.toggle();
