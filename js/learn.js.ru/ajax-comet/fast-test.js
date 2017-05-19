let xhr = new XMLHttpRequest();
let url = document.getElementById('phones').getAttribute('value');
console.log('url'+url);


// (2) запрос на другой домен :)
xhr.open('COPY', url, true);

xhr.onload = function() {
  alert( this.responseText );
}

xhr.onerror = function() {
  alert( 'Ошибка ' + this.status );
}

xhr.send();
