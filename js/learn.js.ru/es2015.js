/*
 * Destructurization
 */
let arr1 = [
    'first', 'second', 'third', 'fourth', 'five'
];

let person = {
    firstname: 'Alexander',
    secondname: 'Surov'
};

let [des1, des2, ...desAll] = arr1;
let {firstname: v} = person;

/**
 * Functions
 */

function showName(firstname = 'Petrov', secondname = 'Alex', ...additional) {
    alert(additional);
    alert(firstname + ' ' + secondname + ' ' + additional);
}

let arr2 = [1,2,3,4,5,6,7,8,9];

let maxValue = Math.min(...arr2);

let expression1 = (a, b, c) => a * b + c

function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms)
  }
}

function sayHi(who) {
  alert('Привет, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);

function defer(f, ms) {
  return function() {
    let args = arguments;
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  }
}