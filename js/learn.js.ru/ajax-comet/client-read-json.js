let xhr = new XMLHttpRequest();

xhr.open('GET', 'phones.json', false);

xhr.send();

if(xhr.status == 200) {
  alert(xhr.responseText);
} else {
  alert(xhr.status + ' ' + xhr.statusText);
}
