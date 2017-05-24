var eventSource;

function start() {
	eventSource = new EventSource('digits');

	eventSource.onopen = function(e) {
		log('Opened connection');
	};

	eventSource.onerror = function(e) {
		if (this.readyState == EventSource.CONNECTING) {
			log('Repeat connection');
		} else {
			log('Connection error' + e.readyState);
		}
	}

	eventSource.addEventListener('bye', (e) => {
		log('Bye ' + e.data);
	});

	eventSource.onmessage = (e) => {
		console.log(e);
		log(e.data);
	}
}

function log(data) {
	let elem = document.getElementById('log');
	elem.innerHtml += data + '<br>';
}

function stop() {
	eventSource.close();
	log('Stoped connection');
}
