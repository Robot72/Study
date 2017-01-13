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

console.log(desAll);
