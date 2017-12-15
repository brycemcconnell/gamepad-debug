


const gamepadInfo = document.createElement('div')
gamepadInfo.style.position = "absolute"
gamepadInfo.style.top = 0
gamepadInfo.innerHTML = "Waiting for gamepad.";
document.body.appendChild(gamepadInfo)

let gamepads = {};
let gp;
let container;
let buttonList;
let axesList;
function gamepadHandler(event, connecting) {
  gp = event.gamepad;
  // Note:
  // gamepad === navigator.getGamepads()[gamepad.index]

  if (connecting) {
	gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
	gamepads[gp.index] = gp;
	
	container  = document.createElement("div");
	container.className = "container"
	document.body.appendChild(container)
	buttonList = document.createElement("div");
	container.appendChild(buttonList)
   
	  for (var i = 0; i < gp.buttons.length; i++) {
		var e = document.createElement("div");
		e.className = `btn btn-${i}`
		//e.id = "b" + i;
		e.innerHTML = i;
		buttonList.appendChild(e);
	  }
	axesList = document.createElement("div");
	  for (var i = 0; i < gp.axes.length; i++) {
		var p = document.createElement("progress");
		if (i == 0) p.className = "left-axes-h"
		if (i == 1) p.className = "left-axes-v"
		if (i == 2) p.className = "right-axes-h"
		if (i == 3) p.className = "right-axes-v"

		//p.id = "a" + i;
		p.setAttribute("max", "2");
		p.setAttribute("value", "1");
		p.innerHTML = i;
		axesList.appendChild(p);
	  }

	  container.appendChild(axesList);
	  updateGamepad();
  } else {
	gamepadInfo.innerHTML = "Waiting for gamepad.";
	delete gamepads[gp.index];
	cancelRequestAnimationFrame(animation);
  }
}

window.addEventListener("gamepadconnected", (e)  => {
	gamepadHandler(e, true);
}, false);
window.addEventListener("gamepaddisconnected", (e)  => {
	gamepadHandler(e, false);
}, false);

function updateGamepad() {
	for (var i = 0; i < gp.buttons.length; i++) {
		 if (gp.buttons[i].value == 1) {
			buttonList.children[i].style.opacity = "0.9"
		 } else {
			buttonList.children[i].style.opacity = "0.4"
		 }
	  }
	  for (var i = 0; i < gp.axes.length; i++) {
		axesList.children[i].value = gp.axes[i] + 1
	  }
	requestAnimationFrame(updateGamepad)
}