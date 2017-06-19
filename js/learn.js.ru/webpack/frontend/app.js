let button = document.querySelector('#btn');
let contact = document.querySelector('#contact');

let clickBtn = () => {
  require.ensure([], () => {
    let welcome = require('./welcome');
    welcome('User');
  }, 'core');
};

let clickLogout = () => {
  require.ensure([], () => {
    let contact = require('./contact');
    contact();
  }, 'core');
};

button.addEventListener('click', clickBtn);
button.addEventListener('click', clickLogout);
