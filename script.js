/*
document.getElementById("pause").onclick = () => {
	if (PAUSE) {
		PAUSE = false;
		document.getElementById("pause").innerHTML = "pause";
	} else {
		PAUSE = true;
		document.getElementById("pause").innerHTML = "unpause";
	}
}

document.getElementById("reset").onclick = () => {
	reset();
	setup(document.getElementById("boids").value);
}

document.getElementById("sdistance").onchange = () => {
	SEPARATION_PERCEPTION = document.getElementById("sdistance").value;
}

document.getElementById("adistance").onchange = () => {
	ALIGNEMENT_PERCEPTION = document.getElementById("adistance").value;
}

document.getElementById("cdistance").onchange = () => {
	COHESION_PERCEPTION = document.getElementById("cdistance").value;
}

document.getElementById("scale").onchange = () => {
	SCALE = document.getElementById("scale").value;
}

var ox = 0; var oy = 0; var or = 10;
document.getElementById("obstacle").onclick = () => {
	if (OBSTACLES.length > 0) {
		document.getElementById("obstacle").innerHTML = "put obstacle";
		OBSTACLES.length = 0;
	} else {
		obstacle = true;
		document.getElementById("obstacle").innerHTML = "remove obstacle";
		OBSTACLES.push(new Obstacle(WIDTH/2+ox, HEIGHT/2+oy, or));
	}
}

document.getElementById("ox").onchange = () => {
	ox = parseInt(document.getElementById("ox").value);
	if (OBSTACLES.length > 0) {
		OBSTACLES[0].position.x = WIDTH/2+ox;
	}
}

document.getElementById("oy").onchange = () => {
	oy = parseInt(document.getElementById("oy").value);
	if (OBSTACLES.length > 0) {
		OBSTACLES[0].position.y = HEIGHT/2+oy;
	}
}

document.getElementById("or").onchange = () => {
	or = parseInt(document.getElementById("or").value);
	if (OBSTACLES.length > 0) {
		OBSTACLES[0].radius = or;
	}
}

setup(300);
run();
*/

const canvas = document.getElementById("main-canvas");
var left_down = false; var right_down = false;

BOIDS.options.background_color = "#fba6ff";
BOIDS.options.boid_color = "white";
BOIDS.options.obstacle_color = "white";

canvas.addEventListener('contextmenu', event => event.preventDefault());

canvas.addEventListener("mousedown", (evt) => { 
	if (evt.button == 0) {
		left_down = true;
		right_down = false;
	} else if (evt.button == 2) {
		right_down = true;
		left_down = false;
		
	}
});

document.addEventListener("mouseup", (evt) => { 
	if (evt.button == 0) {
		left_down = false;
	} else {
		right_down = false;
	}
});

canvas.addEventListener("mousemove", (evt) => {
	if (left_down) {
		BOIDS.options.cam_x -= evt.movementX/BOIDS.options.scale;
		BOIDS.options.cam_y -= evt.movementY/BOIDS.options.scale;

		BOIDS.legalize_cam();
	} else if (right_down) {
		let position = BOIDS.cam_to_real(evt.offsetX, evt.offsetY);
		BOIDS.obstacles.push(new BOIDS.Obstacle(position.x, position.y, 3));
	}
});

canvas.addEventListener("wheel", (evt) => {
	if (evt.deltaY > 0 && BOIDS.options.scale > 1) {
		BOIDS.options.scale -= 0.1;
		BOIDS.legalize_cam();
	} else if (evt.deltaY < 0) {
		let direction = BOIDS.cam_to_real(evt.offsetX, evt.offsetY).sub(new BOIDS.Vector(BOIDS.options.cam_x, BOIDS.options.cam_y));
		BOIDS.options.cam_x += direction.x/BOIDS.options.scale**4;
		BOIDS.options.cam_y += direction.y/BOIDS.options.scale**4;
		BOIDS.options.scale += 0.1;
		BOIDS.legalize_cam();
	}
});

BOIDS.set_canvas(canvas);
BOIDS.setup(300);
BOIDS.run();