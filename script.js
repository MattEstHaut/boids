var canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext("2d");

var scale = 15;

clear = (ctx) => {
	ctx.fillStyle = "#fba6ff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

draw_boid = (ctx, boid) => {
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.moveTo(boid.x+Math.cos(boid.a)*scale, boid.y+Math.sin(boid.a)*scale);
	ctx.lineTo(boid.x+Math.cos(boid.a-Math.PI/3)*scale/3, boid.y+Math.sin(boid.a-Math.PI/3)*scale/3);
	ctx.lineTo(boid.x+Math.cos(boid.a+Math.PI/3)*scale/3, boid.y+Math.sin(boid.a+Math.PI/3)*scale/3);
	ctx.lineTo(boid.x+Math.cos(boid.a)*scale, boid.y+Math.sin(boid.a)*scale);
	ctx.fill();
}

var swarm = BOIDS.swarm(50);

update_canvas = (ctx, swarm, dt) => {
	clear(ctx);
	swarm.update(dt);
	swarm.boids.forEach(boid => draw_boid(canvas.getContext("2d"), boid));
}

var dt = 10;
var interval = setInterval(() => {
	update_canvas(ctx, swarm, dt/1000);
}, dt);