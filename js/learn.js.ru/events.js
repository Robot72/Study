let selectedTd = false;
let table = document.getElementById('table-g');

/* Delegate events */
function updateTd (target) {
  if( selectedTd ) {
    selectedTd.style.backgroundColor = 'black';
  }

  selectedTd = target;
  console.log(selectedTd.style);
  selectedTd.style.backgroundColor = 'white';
}

table.addEventListener('click', (e) => {
  let target = e.target;
  console.log(target.tagName);
  while(target != table) {
    if( target.tagName == 'TD' ) {
      updateTd(target);
    }
    target = target.parentNode;
  }
  return;
});

function Menu(elem) {
  this.save = function () {
    alert('saved');
  }
  this.load = function () {
    alert('loaded');
  }
  this.search = function () {
    alert('searched');
  }

  var self = this;

  elem.onclick = function (e) {
    let target = e.target;
    let action = target.getAttribute('data-action');

    console.log(action)
    if(action) {
      self[action]();
    }
  }
}

new Menu( document.getElementById('menu') );

/* Beahviors */
document.addEventListener('click', function (e) {
  if(! e.target.hasAttribute('data-counter')) {
    return;
  }

  let counter = e.target;
  counter.innerHTML++;
});

document.addEventListener('click', function (e) {
  let target = e.target;
  let id = target.getAttribute('data-toggle-id');
  if(!id) return;

  let elem = document.getElementById(id);
  elem.hidden = !elem.hidden;
});

/* Browse events */

document.addEventListener('wheel', function (e) {
});

document.addEventListener('contextmenu', (e) => {
  let elem = document.getElementById('context-menu');
  elem.innerHTML++;
});

/* My events */

function hideBlock() {
  let event = new Event('hide', {bubbles: true, cancelable: false});
  let elem = document.getElementById('strangeBlock');
  elem.dispatchEvent(event);
  strangeBlock.hidden = true;
}

let elem = document.getElementById('strangeBlock');
elem.addEventListener('hide', (e) => {
  console.log('handler 1')
});
elem.addEventListener('hide', (e) => {
  console.log('handler 2')
});
elem.addEventListener('hide', (e) => {
  console.log('handler 3')
});
elem.addEventListener('hide', (e) => {
  // alert('handler 4')
});

setTimeout(() => {
  hideBlock();
}, 2000);
