'use strict'

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

/**
 * Strings
 */
//alert(`good
//good
//good`);

let a = 'A';
let b = 'B';
//alert(`${a} - ${b}`);

function f(strings, ...values) {
  alert(JSON.stringify(strings));     // ["Sum of "," + "," =\n ","!"]
  alert(JSON.stringify(strings.raw)); // ["Sum of "," + "," =\\n ","!"]
  alert(JSON.stringify(values));      // [3,5,8]
}

let apples = 3;
let oranges = 5;

//          |  s[0] | v[0] |s[1]| v[1]  |s[2]  |      v[2]      |s[3]
//let str = f`Sum of ${apples} + ${oranges} =\n ${apples + oranges}!`;

/**
 * Objects and prototypes
 */

let user = {
    name,
    secondname,
    sayHi() {
        alert(this.name)
    },
    get fullName() {
        return this.name + ' ' + this.secondname;
    }
};

// Inherits

let animal = {
    walk() {
        alert('I am walking');
    }
};

let rabbit = {
    __proto__: animal,
    walk() {
        super.walk();
    }
};

rabbit.walk();
let comment = `Улучшения в описании свойств:

    Запись name: name можно заменить на просто name
    Если имя свойства находится в переменной или задано выражением expr, то его можно указать в квадратных скобках [expr].
    Свойства-функции можно оформить как методы: "prop: function() {}" → "prop() {}".

В методах работает обращение к свойствам прототипа через super.parentProperty.

Для работы с прототипом:

    Object.setPrototypeOf(obj, proto) – метод для установки прототипа.
    obj.__proto__ – ссылка на прототип.

Дополнительно:

    Метод Object.assign(target, src1, src2...) – копирует свойства из всех аргументов в первый объект.
    Метод Object.is(value1, value2) проверяет два значения на равенство. В отличие от === считает +0 и -0 разными числами. А также считает, что NaN равно самому себе.
`;