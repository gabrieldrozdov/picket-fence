let capture;

function setup() {
	var canvas = createCanvas(720, 1280);
	capture = createCapture({
		video: { facingMode: "environment" },
		audio: false,
	});
	capture.size(720, 1280);
	capture.hide();
	canvas.parent('parent');
	noStroke();
	fill(0);
}

let offset = 0;
let properties = {
	speed: 1,
	frames: 5,
	unit: 3,
	orientation: true,
	direction: true
}
function draw() {
	background(255);
	image(capture, 0, 0, 720, 1280);

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
			rect(offset+i*properties['frames']*properties['unit'], 0, properties['unit']*(properties['frames']-1), height);
		}
	} else {
		// Move the rectangles
		offset += properties['speed']/10 * direction;
		if (offset >= height) {
			offset = 0;
		}
		// Draw the rectangles
		for (let i=-width; i<width*2; i++) {
			rect(0, offset+i*properties['frames']*properties['unit'], width, properties['unit']*(properties['frames']-1));
		}
	}
}

// Update values on input
let ranges = {
	speed: [1, 10],
	frames: [2, 10],
	unit: [1, 10]
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