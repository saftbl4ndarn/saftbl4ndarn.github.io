let rull = [];
let shown = 8;
let v = 30;
let a = 0;
let intervall = 0;
let current = 0;
let saldo;
let betta, rulla, dubbla, halvera;
let red, green, black;
let rb = 0;
let gb = 0;
let bb = 0;
let update = true;

function preload() {
  saldo = float(localStorage.getItem("highscore")) || 1000;
  if (saldo <= 0) {
    saldo = 999;
  }
}

function setup() {
  let smol = windowWidth / 1.4;
  if (smol > windowHeight / 1.4) {
  smol = windowHeight / 1.4;
}
  cnv = createCanvas(smol, smol)
  cnv.style('float', 'left')


  dubbla = createButton("2X");
  halvera = createButton("1/2X");
  dubbla.position(0.32 * width + 175, 0.75 * height + 65);
  halvera.position(0.39 * width + 175, 0.75 * height + 65);
  dubbla.style('border', 'none');
  dubbla.style('border-radius', '5px');
  dubbla.style('padding', '10px 10px');
  dubbla.style('background-color', '#ffffff');

  halvera.style('border', 'none');
  halvera.style('border-radius', '5px');
  halvera.style('padding', '10px 10px');
  halvera.style('background-color', '#ffffff');

  rulla = createButton("Roll");
  rulla.position(0.18 *  width + 175, 0.88 * height + 65);
  rulla.style('border', 'none');
  rulla.style('border-radius', '5px');
  rulla.style('padding', '10px 10px');
  rulla.style('background-color', '#ffffff');

  betta = createInput("10");
  betta.attribute("type", "number");
  betta.position(0.18 *  width + 175, 0.75 * height + 65);
  betta.style('width', '50px')
  betta.style('border', 'none');
  betta.style('border-radius', '5px');
  betta.style('padding', '10px 10px');
  betta.style('background-color', '#ffffff');
  textAlign(LEFT);
  noStroke();



init();
  rulla.mousePressed(roll);
  dubbla.mousePressed(dubblera);
  halvera.mousePressed(halva);
}

function windowResized() {
  let smol = windowWidth / 1.4;
  if (smol > windowHeight / 1.4) {
  smol = windowHeight / 1.4;
}
  cnv = resizeCanvas(smol, smol)
  betta.position(0.18 *  width + 175, 0.75 * height + 65);
  rulla.position(0.18 *  width + 175, 0.88 * height + 65);
  dubbla.position(0.32 * width + 175, 0.75 * height + 65);
  halvera.position(0.39 * width + 175, 0.75 * height + 65);

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
    rb = float(betta.value());
  } else {
  	rb = 0;
  }
  if (green.a == true) {
    gb = float(betta.value());
  } else {
  	gb = 0;
  }
  if (black.a == true) {
    bb = float(betta.value());
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

  textAlign(CENTER, CENTER);
  textSize(16);
  fill(255, 199, 15);
  text("Ditt saldo: " + saldo + "kr", 0.78 * width, 0.7 * height);
  localStorage.setItem("highscore", saldo.toString());
}

function dubblera() {
  var temp = float(betta.value());
  temp *= 2;
  betta.value(temp.toString());
}

function halva() {
  var temp = float(betta.value());
  temp /= 2;
  betta.value(temp.toString());
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
  red = new Kvadrat(0.25 * width - 25, height / 2, 50, 50, color(255, 0, 0), false);
  green = new Kvadrat(0.5 * width - 25, height / 2, 50, 50, color(100, 255, 100), false);
  black = new Kvadrat(0.75 * width - 25, height / 2, 50, 50, color(0, 0, 0), false);
}

function roll() {
  if (v == 30 && float(betta.value()) > 0) {
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
    rect(this.x, this.y, this.w, this.h, 8);
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
    this.w = width / 8;
    this.h = width / 8 + width / 16;
  }


  update() {
  	this.x -= v;
    if (this.x < -this.w) {
    	this.x += this.w * (rull.length);
    }
  }

  display() {
  	fill(this.kulor);
    rect(this.x, 0, this.w, this.h);
    //fill(255);
    //textSize(12);
    //text(this.n, this.x + this.w / 2 - 2, this.h / 2);
  }


}
