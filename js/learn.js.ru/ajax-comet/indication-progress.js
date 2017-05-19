document.forms.upload.addEventListener('submit', function () {
	let input = this.elements.myfile;
	let file = input.files[0];
	if(file) {
		upload(file);
	}
	return false;
});

let upload2 = document.getElementById('uplad-file');
upload2.addEventListener('click', function () {
	let input = document.forms.upload.elements.myfile;
	let file = input.files[0];
	if(file) {
		upload(file);
	}
	return false;
});

let upload = (file) => {
	let xhr = new XMLHttpRequest();
	xhr.upload.onprogress = (e) => console.log(e.loaded + ' / ' + e.total);

	xhr.onload = xhr.error = function() {
		if (this.status == 200) {
			console.log('success');
		} else {
			console.log('error ' + this.status);
		}
	}

	xhr.open('POST', 'upload', true);
	xhr.send(file);
};
