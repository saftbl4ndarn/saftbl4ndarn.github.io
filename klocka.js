// noprotect

var mitt;
var ssize, msize, hsize;
var s, m, h;
var step;

var ms;

var start;
var current = 0;

function setup() {

  createCanvas(400, 400);
  mitt = width / 2;
  ssize = 0.40 * width;
  msize = 0.30 * width;
  hsize = 0.25  * width;

  step = TWO_PI/60;



  tempS = second();

  do {
    offset = second()*1000 + 800;
    start = millis();

  } while (tempS == second());

}

function draw() {
  background(105, 105, 105);


  current = millis() - start;

  if (millis() - start >= 60000) {
    start = millis();

  }


  ms = map(current + offset, 0, 60000, 0, TWO_PI) - HALF_PI;




  //s = map(second(),    0, 60, 0, TWO_PI) - HALF_PI;
  m = map(minute(),    0, 60, 0, TWO_PI) - HALF_PI;
  h = map(hour() % 12, 0, 12, 0, TWO_PI) - HALF_PI;

  strokeWeight(5);






  stroke(0, 255, 98);
  line(mitt, mitt, mitt + cos(h) * hsize, mitt + sin(h) * hsize);


  stroke(230, 0, 255);
  line(mitt, mitt, mitt + cos(m) * msize, mitt + sin(m) * msize);

  stroke(66, 135, 245);
  line(mitt, mitt, mitt + sin(ms+HALF_PI) * ssize, mitt + sin(ms) * ssize);

  stroke(255);
  for (var i = 0; i < 60; i++) {
    if (i % 15 == 0)
      strokeWeight(15);
    else if (i % 5 == 0)
      strokeWeight(8);
    else
      strokeWeight(3);

    point(mitt + cos(step * i) * 0.45 * width, mitt + sin(step * i) * 0.45 * width);
  }



}
