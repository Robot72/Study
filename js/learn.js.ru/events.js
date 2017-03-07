let selectedTd = false;
let table = document.getElementById('table-g');

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
