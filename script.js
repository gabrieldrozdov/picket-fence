let capture;

function setup() {
	var canvas = createCanvas(1920, 1440);
	capture = createCapture(VIDEO);
	// capture.size(1920, 1440);
	// capture.hide();
	canvas.parent('parent');
	noStroke();
	fill(0);
}

let offset = 0;
let properties = {
	unit: 3,
	frames: 5,
	speed: 1,
	orientation: true,
	direction: true
}
function draw() {
	image(capture, 0, 0, 1920, 1440);

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
function updateValue(property, value) {
	properties[property] = value;
}

// Prevent typing out of range
function imposeMinMax(e){
	if (e.value != "") {
		if (parseInt(e.value) < parseInt(e.min)){
			e.value = e.min;
		}
		if (parseInt(e.value) > parseInt(e.max)){
			e.value = e.max;
		}
	} else {
		e.value = e.min;
	}
}

// Flip orientation
function flipOrientation() {
	properties['orientation'] = !properties['orientation'];
	offset = 0;
}

// Flip direction
function flipDirection() {
	properties['direction'] = !properties['direction'];
}

// window.addEventListener( 
// 	'click', async function () { 

// 		let features = { 
// 			audio: false, 
// 			video: { 
// 				width: { ideal: 1920 }, 
// 				height: { ideal: 1080 } 
// 			} 
// 		}; 

// 		let display = await navigator.mediaDevices 
// 			.getUserMedia(features); 

// 		// Returns a sequence of MediaStreamTrack objects  
// 		// representing the video tracks in the stream 

// 		let settings = display.getVideoTracks()[0] 
// 			.getSettings(); 

// 		let width = settings.width; 
// 		let height = settings.height; 

// 		console.log('Actual width of the camera video: ' 
// 			+ width + 'px'); 
// 		console.log('Actual height of the camera video:' 
// 			+ height + 'px'); 
// 	}); 
