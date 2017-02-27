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
  };
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
  };
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
 *

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
*/
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

/*
 * Classes
 */

class User {

  constructor(name) {
    this.name = name;
  }

    sayHi() {
        alert(`Hello ${this.name}!`);
    }

    get age() {
      return this.age;
    }

    set age(age) {
        if(age < 0) {
            throw new Error('Возвраст не может быть отрицательным');
        } else {
            this.age = age;
        }
    }

}

class Admin extends User {

  good() {
      alert('good');
  }

}

let admin = new Admin("Вася");
let user = new User('John');
user.gooooood = 'd';

let aObj = {
    a: 'd',
    b: 'd'
};
let bObj = {
    c: 'd'
};
Object.is(aObj, bObj);

/**
 * Data type is Symbol
 */

let symbol = Symbol();

/**
 * Itarators
 */

for(let value of arr1) {
    //console.log(value);
}

for(let value of "GOOOO") {
    //console.log(value);
}

let range = {
    from: 0,
    to: 50,
    [Symbol.iterator]() {
        let current = this.from;
        let last = this.to;

        return {
            next() {
                if(current <= last) {
                    return {
                        value: current++,
                        done: false
                    };
                } else {
                    return {
                        done: true
                    };
                }
            }
        }
    }
};

for(let v of range) {
}

let str = 'Hello world!';
let iterator = str[Symbol.iterator]();

while(true) {
    let result = iterator.next();
    if(result.done)
        break;
    //console.log(result.value);
}

/**
 * Set, Map, Weak, SetWeak.
 */
let map = new Map([
    [1, '123'],
    ['1', '321']
]);

//console.log( map.get(1) );
//console.log( map.get('1') );

/**
 * Promise
 */

function httpGet(url) {
    return new Promise(function (resolve, reject) {
        let xml = new XMLHttpRequest();

        xml.open('GET', url, true);

        xml.onload = function () {
            if(this.status == 200) {
                resolve(this.responseXML);
            } else {
                let error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xml.onerror = function () {
            reject(new Error('Network error!'));
        };

        xml.send();
    });
}

let promise = new Promise((resolve, reject) => {
   setTimeout(() => {
        resolve('resolve');
   }, 1000);
});

promise.then(
    resolve => {
        console.log('Promise is fulfilled: ' + resolve);
    }, reject => {
        console.log('Promise is fulfilled: ' + reject);
    }
);

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  })
}

// delay(2000).then( () => { alert('gooooood!')} );

/*httpGet('//')
    .then(response => {

    })
    .then(user => {

    })
    .then(githubUser => {

    });*/

/**
 * Generators
 */

function* generateSequence(start, end) {
    for(let i = start; i <= end; i++) {
        yield String.fromCharCode(i);
    }
}

function* generateAlpha() {
    yield* generateSequence(65, 90);
    yield* generateSequence(97, 122);
}

//let seq = generateAlpha();

function* jsTesting() {
    let answer1 = yield 'Have the generator got a next method?';

    let answer2 = yield 'Have the generator property "done"?';

    let answer11 = 'First answer - bad.';
    if(answer1 == 'yes') {
        answer11 = 'First anwer - good';
    }

    let answer22 = 'Second answer - bad.';
    if(answer2 == 'yes') {
        answer22 = 'Second answer - good';
    }

    return `${answer11} ${answer22}` ;
}

var testingSituation = jsTesting();

function* showLinks() {
    let link1 = yield new Promise( timeout => setTimeout(timeout, 3000) );
}
