var capture;
var tracker;
var img;
var w = 640, h = 480;

function setup() {
  capture = createCapture(VIDEO);
  createCanvas(w, h);
  capture.size(w, h);
  capture.hide();
  img = createImage(w,h);
  img.loadPixels();
  
  
  tracker = new clm.tracker();
  tracker.init(pModel);
  tracker.start(capture.elt);
}

function draw() {
  capture.loadPixels();
  // image(capture, 0, 0, w, h);
  var positions = tracker.getCurrentPosition();

  noFill();
  noStroke();
  beginShape();
  for (var i=0; i<positions.length; i++) {
    vertex(positions[i][0], positions[i][1]);
  }
  endShape();
  
  for (var i=0; i<positions.length; i++) {
    ellipse(positions[i][0], positions[i][1], 4, 4);
    text(i, positions[i][0], positions[i][1]);
  }
  
  if(positions.length > 0) {
    var mouthLeft = createVector(positions[44][0], positions[44][1]);
    var mouthRight = createVector(positions[50][0], positions[50][1]);
    var smile = mouthLeft.dist(mouthRight);
    rect(20, 20, smile * 3, 20);
  }
  
  for (var i = 0; i < capture.pixels.length; i += 4) {
    var r = capture.pixels[i];
    var g = capture.pixels[i + 1];
    var b = capture.pixels[i + 2];
    var a = capture.pixels[i + 3];
      
      r = r/2 *smile/30;
      g = g/2 *smile/30;
      b = b/2 *smile/30;

    img.pixels[i] = r;
    img.pixels[i + 1] = g;
    img.pixels[i + 2] = b;
    img.pixels[i + 3] = a;
  }

  img.updatePixels();

  scale(-1, 1);
  image(img, 0, 0);
}