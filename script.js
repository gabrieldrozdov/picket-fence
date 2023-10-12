"use strict";

let canvas;

let message = document.querySelector(".message");
message.addEventListener('click', e => start(e))
async function start(e) {
	try {
		message.style.display = "none";
		navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: "environment",
				},
				audio: false,
			}
		).then((stream) => {
			let video = document.querySelector('video');
			video.srcObject = stream;
		})
		message.removeEventListener('click', start)
	} catch (e) {
		alert(e);
	}
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('parent');
	noStroke();
	fill(0);
}

let offset = 0;
let properties = {
	speed: 2,
	frames: 5,
	unit: 2,
	margin: 1,
	orientation: true,
	direction: true
}
function draw() {
	clear();

	let direction = 1;
	if (!properties['direction']) {
		direction = -1;
	}

	if (properties['orientation']) {
		// Move the rectangles
		offset += properties['speed']/10 * direction;
		if (offset >= width) {
			offset = 0;
		}
		// Draw the rectangles
		for (let i=-width; i<width*2; i++) {
			rect(offset+i*properties['frames']*properties['unit'], windowHeight*.1*properties['margin'], properties['unit']*(properties['frames']-1), height-(2*windowHeight*.1*properties['margin']));
		}
	} else {
		// Move the rectangles
		offset += properties['speed']/10 * direction;
		if (offset >= height) {
			offset = 0;
		}
		// Draw the rectangles
		for (let i=-width; i<width*2; i++) {
			rect(windowWidth*.1*properties['margin'], offset+i*properties['frames']*properties['unit'], width-(2*windowWidth*.1*properties['margin']), properties['unit']*(properties['frames']-1));
		}
	}
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Update values on input
let ranges = {
	speed: [1, 10],
	frames: [2, 10],
	unit: [1, 10],
	margin: [0, 2]
}
function changeProperty(property, value) {
	properties[property] += value;
	if (properties[property] < ranges[property][0]) {
		properties[property] = ranges[property][0];
	} else if (properties[property] > ranges[property][1]) {
		properties[property] = ranges[property][1];
	}
	let group = document.querySelector("#" + property);
	let label = group.querySelector('.input-number-txt');
	label.innerText = properties[property];
}

// Flip orientation
let orientationBtn = document.querySelector('#orientation');
function flipOrientation() {
	if (properties['orientation']) {
		orientationBtn.innerText = 'VERTICAL';
	} else {
		orientationBtn.innerText = 'HORIZONTAL';
	}
	properties['orientation'] = !properties['orientation'];
	offset = 0;
}

// Flip direction
let scrollDirectionBtn = document.querySelector('#scroll-direction');
function flipScrollDirection() {
	if (properties['direction']) {
		scrollDirectionBtn.innerText = 'BACKWARD';
	} else {
		scrollDirectionBtn.innerText = 'FORWARD';
	}
	properties['direction'] = !properties['direction'];
}

// Toggle controls
let controls = document.querySelector('.controls');
function toggleControls() {
	if (parseInt(controls.dataset.hide) == 1) {
		controls.dataset.hide = 0;
	} else {
		controls.dataset.hide = 1;
	}
}