let capture;

function setup() {
	var canvas = createCanvas(1920, 1080);
	capture = createCapture({ video: { facingMode: "environment" } });
	capture.size(1920, 1080);
	capture.hide();
	canvas.parent('parent')
}

function draw() {
	background(255);
	image(capture, 0, 0, 1920, 1080);
}


// window.addEventListener( 
// 	'click', async function () { 

// 		let features = { 
// 			audio: true, 
// 			video: { 
// 				width: { ideal: 1800 }, 
// 				height: { ideal: 900 } 
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
