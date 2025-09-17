let handPose;
let video;
let hands = [];

const modelViewer = document.querySelector('#model');


// Smoothed wrist position
let smoothedWrist = { x: 0, y: 0 };

function preload() {
  // Load the handPose model using the new API
  handPose = ml5.handPose();
}

function setup() {
  const canvas = createCanvas(320, 240);
  canvas.parent('canvas-container');

  const constraints = {
    video: {
      facingMode: 'user'
    }
  };
  video = createCapture(constraints);
  video.size(width, height);
  video.hide();
  
  // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}

function draw() {
  // Mirror the webcam feed
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  // Reset transformation for drawing the skeleton correctly
  scale(-1, 1);
  translate(-width, 0);

  if (hands.length > 0) {
    const hand = hands[0];
    const wrist = hand.keypoints[0]; // wrist is keypoints[0]

    // Smooth the wrist position with lerp
    smoothedWrist.x = lerp(smoothedWrist.x, wrist.x, 0.15);
    smoothedWrist.y = lerp(smoothedWrist.y, wrist.y, 0.15);

    // Map hand position to camera orbit (adjusting for mirrored view)
    const orbitX = map(smoothedWrist.x, 0, width, -270, 270);
    const orbitY = map(smoothedWrist.y, 0, height, -120, 300);
    
    modelViewer.cameraOrbit = `${orbitX}deg ${orbitY}deg 2m`;



    // Hand gesture control for animation
    if (isHandClosed(hand)) {
      console.log('Hand is closed');
      modelViewer.timeScale = -1; // Play backward
    } else {
      console.log('Hand is open');
      modelViewer.timeScale = 1;  // Play forward
    }
    modelViewer.play();

    drawHand(hand);
  }
}

function isHandClosed(hand) {
  // A simple way to check if the hand is closed is to check the distance 
  // between the tip of the index finger and the wrist.
  const indexTip = hand.keypoints[8];
  const wrist = hand.keypoints[0];
  const distance = dist(indexTip.x, indexTip.y, wrist.x, wrist.y);

  // This threshold might need adjustment depending on the camera and hand size.
  const threshold = 100; 

  return distance < threshold;
}

function drawHand(hand) {
  // Draw all the tracked hand points
  for (let j = 0; j < hand.keypoints.length; j++) {
    let keypoint = hand.keypoints[j];
    fill(0, 255, 0);
    noStroke();
    // Draw the circle on the non-mirrored canvas
    circle(width - keypoint.x, keypoint.y, 10);
  }
  
  // Note: The new API doesn't provide skeleton annotations directly.
  // Drawing the skeleton would require manually defining the connections.
  // For now, we are just drawing the keypoints.
}