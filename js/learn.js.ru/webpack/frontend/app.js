let _ = require('lodash');
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

let users = [
  {id: 1, name: 'Jack'},
  {id: 2, name: 'Alex'},
  {id: 3, name: 'John'}
];

let pluckedUsers = _.pluck(users, 'name');
alert(pluckedUsers);

button.addEventListener('click', clickBtn);
button.addEventListener('click', clickLogout);
