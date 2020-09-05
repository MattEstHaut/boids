var BOIDS = BOIDS || {};

var rand = (max) => {
	return Math.random()*(max+1);
}

var dist = (boid_1, boid_2) => {
	return Math.sqrt((boid_1.x-boid_2.x)**2+(boid_1.y-boid_2.y)**2);
}

var adif = (boid_1, boid_2) => {
	var gdif = dist(boid_1, boid_2);
	if (gdif > 0) {
		var xdif = boid_2.x-boid_1.x; var ydif = boid_2.y-boid_1.y;
		xdif /= gdif;
		var a = (ydif > 0) ? Math.acos(xdif) : Math.PI*2-Math.acos(xdif);
		return boid_1.a - a;
	} else {
		return 0;
	}
}

BOIDS.boid = (x, y, a) => {
	return { x: x, y: y, a: a};
}

BOIDS.swarm = (number = 0) => {
	this.boids = [];
	this.rules = {width: 500, height: 500, speed:150};

	this.add = (number) => {
		var w = this.rules.width; var h = this.rules.height;
		for (var b = 0; b < number; b++) {
			this.boids.push(BOIDS.boid(w/2, h/2, rand(2*Math.PI)));
		}
	};

	this.update = (dt) => {
		var new_boids = [];
		for (var b = 0; b < this.boids.length; b++) {
			new_boids.push(this.boids[b]);
			var action = false;

			if (this.boids[b].x <= 20 && this.boids[b].x+this.rules.speed*Math.cos(this.boids[b].a)*dt < this.boids[b].x) {
				new_boids[b].a = Math.PI-this.boids[b].a;
				action = true;
			} else if (this.boids[b].x >= this.rules.width-20 && this.boids[b].x+this.rules.speed*Math.cos(this.boids[b].a)*dt > this.boids[b].x) {
				new_boids[b].a = Math.PI-this.boids[b].a;
				action = true;
			}
			if (this.boids[b].y <= 20 && this.boids[b].y+this.rules.speed*Math.sin(this.boids[b].a)*dt < this.boids[b].y) {
				new_boids[b].a = -this.boids[b].a;
				action = true;
			} else if (this.boids[b].y >= this.rules.height-20 && this.boids[b].y+this.rules.speed*Math.sin(this.boids[b].a)*dt > this.boids[b].y) {
				new_boids[b].a = -this.boids[b].a;
				action = true;
			}

			new_boids[b].x = this.boids[b].x+this.rules.speed*Math.cos(this.boids[b].a)*dt;
			new_boids[b].y = this.boids[b].y+this.rules.speed*Math.sin(this.boids[b].a)*dt;
		}

		for (var b = 0; b < this.boids.length; b++) {
			this.boids[b] = new_boids[b];
		}
	}

	this.add(number);
	return this;
}