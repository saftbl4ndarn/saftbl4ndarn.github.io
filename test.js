var parts = 10;
var particles = [];
let slider;
let color;

function setup() {
  createCanvas(1000, 800);
  colorMode(HSB, 255);
  slider = createSlider(0, 200, 20);
  slider.position(20, 520);
  button = createButton("Uppdatera / Starta")
  button.position(20, 560);
}

function init() {
  particles = [];
  for (var i = 0; i < parts; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  parts = slider.value();
  button.mousePressed(init);
  background(51);
  check();
  if (particles.length != 0) {
    for (var c = 0; c < particles.length; c++) {
      particles[c].update();
      particles[c].move();
      //particles[c].c++;
      //if (particles[c].c > 255) {
      //  particles[c].c = 0;
      //}
    }
  }
}

class Particle {
  constructor() {
    this.vx = (random(-2.5, 2.5));
    this.vy = (random(-2.5, 2.5));
    this.d = 45;
    this.x = random(this.d / 2, width - (this.d / 2));
    this.y = random(this.d / 2, height - (this.d / 2));
    this.c = random(255);
    this.a = 0;
    this.mass = 1;

    if (particles.length != 0) {
    	for (var i = 0; i < particles.length; i++) {
    		if (dist(this.x, this.y, particles[i].x, particles[i].y) < this.d) {
       	  this.x = random(this.d / 2, width - (this.d / 2));
    			this.y = random(this.d / 2, height - (this.d / 2));
          i = -1;
        }
      }
    }
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x + this.d / 2 >= width) {
      this.vx = -this.vx;
      this.x = width - this.d / 2;
    } else if (this.x - this.d / 2 <= 0) {
      this.vx = -this.vx;
      this.x = this.d / 2;
    } else if (this.y + this.d / 2 >= height) {
      this.vy = -this.vy;
      this.y = height - this.d / 2;
    } else if (this.y - this.d / 2 <= 0) {
    	this.vy = -this.vy;
      this.y = this.d / 2;
    }

  }
  update() {
    //if (dist(this.x, this.y, mouseX, mouseY) < 150) {
        //this.a += 20;
      //} else if (this.a != 255) {
        //this.a -= 1;
      //}
      //this.a = constrain(this.a, 0, 200);
    strokeWeight(2);
    fill(this.c, 255, 255, this.a);
    stroke(this.c, 200, 255);
    ellipse(this.x, this.y, this.d, this.d);
  }
}

function check() {
  for (var i = 0; i < particles.length; i++) {
    for (var j = 0; j < particles.length; j++) {
      if (particles[i] == particles[j]) {
        continue;
      }

      if (dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y) <= particles[i].d) {
        var deltaVX = particles[i].vx - particles[j].vx;
        var deltaVY = particles[i].vy - particles[j].vy;

        var deltaX = particles[j].x - particles[i].x;
        var deltaY = particles[j].y - particles[i].y;

        if (deltaVX * deltaX + deltaVY * deltaY >= 0) {

          var  angle = -atan2(particles[j].y - particles[i].y, particles[j].x - particles[i].x);

          var m1 = particles[i].mass;
          var m2 = particles[j].mass;

          var u1x = particles[i].vx * cos(angle) - particles[i].vy * sin(angle);
          var u1y = particles[i].vx * sin(angle) + particles[i].vy * cos(angle);

          var u2x = particles[j].vx * cos(angle) - particles[j].vy * sin(angle);
          var u2y = particles[j].vx * sin(angle) + particles[j].vy * cos(angle);

          var v1x = u1x * (m1 - m2) / (m1 + m2) + u2x * 2 * m2 / (m1 + m2);
          var v1y = u1y;
          var v2x = u2x * (m1 - m2) / (m1 + m2) + u1x * 2 * m2 / (m1 + m2);
          var v2y = u2y;

          var uf1x = v1x * cos(-angle) - v1y * sin(-angle);
          var uf1y = v1x * sin(-angle) + v1y * cos(-angle);

          var uf2x = v2x * cos(-angle) - v2y * sin(-angle);
          var uf2y = v2x * sin(-angle) + v2y * cos(-angle);

          particles[i].vx = uf1x;
          particles[i].vy = uf1y;

          particles[j].vx = uf2x;
          particles[j].vy = uf2y;

          if (particles[i].a == 255 && particles[j].a == 0) {
            particles[i].a = 0;
            particles[j].a = 255;
          } else if (particles[j].a == 255 && particles[i].a == 0) {
            particles[j].a = 0;
            particles[i].a = 255
          }

        }
      }
    }
  }
}

function mousePressed() {
  for (var i = 0; i < particles.length; i++) {
    if (dist(mouseX, mouseY, particles[i].x,
        particles[i].y) < particles[i].d / 2) {
      if (particles[i].a == 255) {
        particles[i].a = 0;
      } else {
        particles[i].a = 255;
      }
    }
  }
}
