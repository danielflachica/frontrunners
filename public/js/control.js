// Daniel Lachica 05/18/2020

var context, controller, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 500;
context.canvas.width = 400;

// Playable object
rectangle = {
	height: 32,
	width: 32,
	jumping: true, // jump var is set to prevent double-jumps
	x: 144, // center of the canvas
	x_velocity: 0,
	y: 0,
	y_velocity: 0
};

// Controller object
controller = {
	// Key Events
	left: false,
	right: false,
	up: false,

	// Event Listener
	keyListener: function(event) {
		var key_state = (event.type == "keydown") ? true : false; // if keydown (pressed), true; keyup (released), false;

		switch(event.keyCode) {
			case 37: controller.left = key_state;  break;	// left key
			case 38: controller.up = key_state;    break; // up key
			case 39: controller.right = key_state; break;	// right key
		}
	}
};

// Game loop (called on each frame of animation)
loop = function() {
  // jump
  if(controller.up && rectangle.jumping == false) {
    rectangle.y_velocity -= 20;
    rectangle.jumping = true;
  }

  // move left
  if(controller.left) {
    rectangle.x_velocity -= 0.5;
  }

  // move right
  if(controller.right) {
    rectangle.x_velocity += 0.5;
  }

  // physics
  rectangle.y_velocity += 1.5;  // gravity
  rectangle.x += rectangle.x_velocity;  // update horizontal position
  rectangle.y += rectangle.y_velocity;  // update verticial position
  rectangle.x_velocity *= 0.9;  // friction
  rectangle.y_velocity *= 0.9;  // friction

  // collision detection
  if(rectangle.y > 180 - 16 - 32) { // rectangle below floor line
    rectangle.jumping = false;
    rectangle.y = 180 - 16 - 32;
    rectangle.y_velocity = 0;
  }
 
  if(rectangle.x < -32) { // rectangle goes beyond left boundary
    rectangle.x = 320;
  } 
  else if(rectangle.x > 320) {  // rectangle goes beyond right boundary
    rectangle.x = -32;
  }

  // render canvas
  context.fillStyle = "#202020";
  context.fillRect(0, 0, 320, 180); // x, y, width, height

  context.fillStyle = "#ff0000";
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fill();

  context.strokeStyle = "#202830";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, 164);
  context.lineTo(320, 164);
  context.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);
};

// Add event listeners to window
window.addEventListener("keydown", controller.keyListener); // press down on any key
window.addEventListener("keyup", controller.keyListener);   // release any key
// TO-DO: Add event listeners for mobile touch events
window.requestAnimationFrame(loop);
