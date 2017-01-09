function Animal(name) {
	this.name = name;
	this.speed = 0;
}

Animal.prototype.stop = function () {
	this.speed = 0;
	alert(this.name + ' stating');
}

Animal.prototype.run = function (speed) {
	this.speed = speed;
	alert(this.name + ' is running, speed ' + this.speed);
}

function Rabbit(name) {
	Animal.apply(this, aruments);
}

Rabbit.prototype = Object.create(Animal.prototype);
Rabbit.prototype.constructor = Rabbit;

Rabbit.prototype.jump = function () {
	this.speed++;
	alert(this.name + ' is jumping. Speed is ' + this.speed);
}
