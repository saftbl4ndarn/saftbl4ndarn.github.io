let rull = [];
let shown = 8;
let v = 30;
let a = 0;
let intervall = 0;
let current = 0;
let saldo = 1000;
let bet, rulla;
let red, green, black;
let rb = 0;
let gb = 0;
let bb = 0;
let update = true;

function setup() {
  rulla = createButton("ROLL");
  rulla.position(50, 390);
  rulla.mousePressed(roll);

  bet = createInput("0");
  bet.position(50, 360);
  bet.size(75);
  textAlign(LEFT);
  noStroke();
  createCanvas(400, 400);
  init();

}

function draw() {
  background(45);

  v -= a;
  v = constrain(v, 0, 60);
  if (v < 10 && v > 5) {
  	a = 0.1;
  }
  if (v < 5 && v > 0) {
  	a = 0.03;
  }

  for (var i = 0; i < 15; i++) {
    rull[i].update();
    rull[i].display();
    if (rull[i].x + rull[i].w >= width / 2 && rull[i].x < width / 2) {
      textAlign(CENTER);
      textSize(16);
      current = i;
      //text(current, width / 2, 112);
    }
  }

  fill(255);
  triangle(width / 2, rull[0].h + 10, width / 2 - 10, rull[0].h + 20, width / 2 + 10, rull[0].h + 20);

  if (keyIsPressed) {
    if (keyCode == ENTER) {
      a = 0;
      v = 60;
    }
  }

  if (red.a == true) {
    rb = parseInt(bet.value());
  } else {
  	rb = 0;
  }
  if (green.a == true) {
    gb = parseInt(bet.value());
  } else {
  	gb = 0;
  }
  if (black.a == true) {
    bb = parseInt(bet.value());
  } else {
  	bb = 0;
  }

  if (v == 0) {
    fill(255, 222, 40);
    textAlign(CENTER);
    textSize(26);
    if (current == 0) {
      text("Grön vann!", width / 2, height / 2 - height / 8);
      if (update) {
        saldo += (gb * 14);
        update = false;
      }
    } else if (current % 2 == 0) {
      text("Svart vann!", width / 2, height / 2 - height / 8);
      if (update) {
        saldo += (bb * 2);
        update = false;
      }
    } else if (current > 0) {
      text("Röd vann!", width / 2, height / 2 - height / 8);
      if (update) {
        saldo += (rb * 2);
        update = !update;
      }
    }
    red.a = false;
    green.a = false;
    black.a = false;
  }
  red.display();
  green.display();
  black.display();

  textAlign(LEFT);
  textSize(16);
  fill(255, 199, 15);
  text("Ditt saldo: " + saldo + "kr", 250, 305);

}

function init() {
  rull[0] = new Box(0, color(100, 255, 100), 0);
  for (var i = 1; i <= 14; i++) {
    if (i % 2 == 0) {
      rull[i] = new Box(i * width / 8, color(0, 0, 0), i);
    } else {
      rull[i] = new Box(i * width / 8, color(255, 0, 0), i);
    }
  }
  rull[0] = new Box(0, color(100, 255, 100), 0);
  red = new Kvadrat(75, 200, 50, 50, color(255, 0, 0), false);
  green = new Kvadrat(175, 200, 50, 50, color(100, 255, 100), false);
  black = new Kvadrat(275, 200, 50, 50, color(0, 0, 0), false);
}

function roll() {
  if (v == 30) {
  	if (red.a || green.a || black.a) {
    	a = 0.125;
    	saldo -= (rb + gb + bb);
  } else {
    v = 30;
    a = 0;
    update = true;
    rb = 0;
    gb = 0;
    bb = 0;
  }
  }




}


function mouseOver(kvadrat) {
  if (mouseX > kvadrat.x &&
    mouseX < kvadrat.x + kvadrat.w &&
    mouseY > kvadrat.y &&
    mouseY < kvadrat.y + kvadrat.h) {
    kvadrat.a = !kvadrat.a;
    v = 30;
    a = 0;
    update = true;
  }
}

class Kvadrat {
  constructor(x, y, w, h, c, a) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.a = a;
  }

  display() {
    if (this.a == true) {
      strokeWeight(5);
      stroke(255);
    } else {
      noStroke();
    }
    fill(this.c);
    rect(this.x, this.y, this.w, this.h);
    noStroke();
  }
}

function mousePressed() {
  mouseOver(red);
  mouseOver(green);
  mouseOver(black);
}

class Box {
	constructor(plats, kulor, n) {
  	this.x = plats;
    this.kulor = kulor;
    this.n = n;
    this.w = width/8;
    this.h = width / 8 + width / 16;
  }


  update() {
  	this.x -= v;
    if (this.x < -50) {
    	this.x += 50 * (rull.length);
    }
  }

  display() {
  	fill(this.kulor);
    rect(this.x, 0, this.w, this.h);
    fill(255);
    textSize(12);
    //text(this.n, this.x + this.w / 2 - 2, this.h / 2);
  }


}
