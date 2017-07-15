var xhr = new XMLHttpRequest();

let surname = 'Васильев';
let name = 'Вася';

var body = 'name=' + encodeURIComponent(name) +
  '&surname=' + encodeURIComponent(surname);

xhr.open("POST", '/submit', true)
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

xhr.onreadystatechange = function() {
  console.log(this);
};

xhr.send(body);
