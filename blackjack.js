
let START = 1;
let PLAY = 2;
let OVER = 3;
let xfactor, yfactor;
let GAME = START;
let spelare = 0;
let dealer = 0;
let vinnare;
let pressed = false;
let saldo;
let bet = 0;
let bettat = false;
let vinst = 'd';
let hide = true;

let starta, hit, stopp, restart, betta;
let suits, blackjack, card;

let spelareKort = [];
let dealerKort = [];
let symboler = [];
let bettar;
let cnv;
function preload() {

  saldo = float(localStorage.getItem("blackjacksaldo")) || 1000;

  if (saldo <= 0) {
    saldo = 999;
  }

  blackjack = loadImage("https://i.imgur.com/XU6oVyh.png");
  card = loadImage("https://i.imgur.com/n6K13ID.gif");
  suits = loadImage("https://i.imgur.com/blUrWaX.png");
}

function setup() {

  let smol = windowWidth / 1.4;
  if (smol > windowHeight / 1.4) {
  smol = windowHeight / 1.4;
}
  cnv = createCanvas(smol, smol)
  cnv.style('float', 'left')

  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  initBg();
  initi();


}

function windowResized() {
  let smol = windowWidth / 1.4;
  if (smol > windowHeight / 1.4) {
  smol = windowHeight / 1.4;
}
  cnv = resizeCanvas(smol, smol)


    bettar.position(290, 1.4 * height);
  initi();
}

function draw() {

  if (GAME == START)
    drawStart();
  if (GAME == PLAY)
    drawPlay();
  if (GAME == OVER)
    drawOver();

  //
  textSize(20);
  textAlign(LEFT, BOTTOM);
  text("Saldo: " + saldo, 0, height);
  textAlign(CENTER, CENTER);

}

function drawStart() {
  background(255);
  gradient(black, red);
  regn();
  image(blackjack, width / 2, height / 4);
  starta.display();
}

function drawPlay() {
  background(255);
  gradient(red, black);
  fill(255);
  if (!bettat)
    betta.display();
  else
    text("Aktuellt bet: " + bet, width / 2, 2 * height / 3);
  textSize(24);
  noStroke();
  if (spelare >= 21 || dealer >= 21) {
    vinnare = kontrolleraVinnare();
    flytta();
    GAME = OVER;
  }
  let ssurprise, dsurprise;
  if (bettat) {
    ssurprise = spelare.toString();
    dsurprise = dealer.toString();
  } else {
    ssurprise = "X"
    dsurprise = "X"
  }
  fill(white);
  text("Dealer: " + dsurprise, 0.15 * width, 0.2 * height);
  text("Spelare: " + ssurprise, 0.15 * width, 0.4 * height);

  for (var k in dealerKort)
    dealerKort[k].display();
  for (var k in spelareKort)
    spelareKort[k].display();
  hit.display();
  stopp.display();
}

function drawOver() {
  clear();
  gradient(red, black);
  if (vinst == 's')
    regn();
  textSize(16);
  fill(black);
  text("Dealer", width / 2, height * 0.2);
  fill(red);
  text("Spelare", width / 2, height * 0.8);
  textSize(16);
  fill(255);
  textLeading(18);
  text(vinnare, width / 2, (height / 2));
  textSize(20);
  fill(black);
  text(dealer, width / 2, (height * 0.4));
  for (var k in dealerKort)
    dealerKort[k].display();
  for (var k in spelareKort)
    spelareKort[k].display();
  restart.display();
  textSize(20);
  fill(red);
  text(spelare, width / 2, (height * 0.6));
}

function mousePressed() {
  pressed = true;
}

function mouseReleased() {
  pressed = false;
}

function kontrolleraVinnare() {
  if (spelare == 21 && dealer != 21) {
    saldo += 2.5 * bet;
    vinst = 's';
    return "Du fick BlackJack och vinner";
  }
  if (dealer == 21 && spelare != 21) {
    vinst = 'd';
    return "Dealern fick BlackJack och vinner";
  }
  if (spelare == 21 && dealer == 21) {
    saldo += bet;
    return "Både Du och Dealern fick BlackJack\nIngen vinner";
  }
  if (spelare > 21 && dealer <= 21) {
    vinst = 'd';
    return "Du blev tjock\nDealern vinner";
  }
  if (spelare <= 21 && dealer > 21) {
    saldo += 2 * bet;
    vinst = 's';
    return "Dealern blev tjock\nDu vinner";
  }
  if (spelare > 21 && dealer > 21) {
    vinst = 'd';
    return "Både Dealern och Du blev tjock\nDealern vinner";
  }
  let spe = 21 - spelare;
  let dea = 21 - dealer;
  if (spe - dea < 0) {
    saldo += 2 * bet;
    vinst = 's';
    return "Du vann";
  }
  if (dea - spe < 0) {
    vinst = 'd';
    return "Dealern vann";
  }
  if (dea == spe) {
    saldo += bet;
    return "Du och Dealern spelade lika\nIngen vinner";
  }
  return "String";
}

function initBg() {
  red = color(250, 40, 40);
  black = color(0, 0, 0);
  white = color(255, 255, 255);
  green = color(30, 255, 30);

  bettar = createInput("").attribute('placeholder', 'Betta här');
  bettar.attribute('type', 'number');
  bettar.style('color', 'black');
  bettar.style('width', '100px');
  bettar.style('height', '18px');
  bettar.style('border', '2px solid black');
  bettar.style('background-color', '#ff2828');
  bettar.style('border-radius', '4px');
  bettar.position(290, height + 45);
  bettar.value(10);



  suits.resize(100, 100);
  let tempSuits = [suits.get(50,  0, 50, 50), suits.get(0,  0, 50, 50),
                   suits.get(50, 50, 50, 50), suits.get(0, 50, 50, 50)];
  for (let i = 0; i < 8; i++) {
    symboler.push(new Symbol(tempSuits[i%4]));
  }
}

function initi() {
    spelareKort = [];
    dealerKort = [];

    xfactor = round(1626 / 13);
    yfactor = round(906 / 5);

    starta = new Knapp((width / 2) - 50, (height / 2) - 25, 100, 50, "Starta", red, black);
    hit = new Knapp((2 * width / 3) - 50, 0.75 * height, 100, 50, "Nytt kort", white, green);
    stopp = new Knapp((width / 3)-50, height * 0.75, 100, 50, "Stanna", white, red);
    restart = new Knapp(width - 80, height - 80, 60, 60, "Spela\nigen", white, black);
    betta = new Knapp((width / 2) - 55, 0.625 * height, 110, 30, "Acceptera bet", white, black);

    dealerKort.push(new Kort("dealer", 0.4625 * width, height / 2));
    spelareKort.push(new Kort("spelare", 0.4625 * width, height / 2));
    spelareKort.push(new Kort("spelare", 0.4625 * width, height / 2));

}

function gradient(c1, c2) {
  for (let i = 0; i < height; i++) {
    let colorValue = map(i, 0, height, 0, 1);
    let c = lerpColor(c1, c2, colorValue);
    stroke(c);
    line(0, i, width, i);
  }
}

function regn() {
  for (var s = 0; s < symboler.length; s++) {
    symboler[s].display();
  }
}

function mouseOn(k) {
  if (mouseX > k.x && mouseX < k.x + k.w  && mouseY >k.y && mouseY < k.y + k.h)
    return true;
  return false;
}



class Knapp {
  constructor(x, y, w,  h, txt, c, tc) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.txt = txt;
    this.c = c;
    this.tc = tc;
  }

  display() {
    if (mouseOn(this) && pressed && GAME == START) {
      pressed = false;
      GAME = PLAY;
    }
    if (mouseOn(this) && pressed && this == hit && bettat) {
      spelareKort.push(new Kort("spelare", 0.4625 * width, height / 2));
      pressed = false;
    }
    if (mouseOn(this) && pressed && this == restart) {
      spelare = 0;
      dealer = 0;
      bet = 0;
      initi();
      GAME = PLAY;
      pressed = false;
      bettat = false;
      hide = true;
    }
    if (mouseOn(this) && mouseIsPressed && this == betta && pressed) {
      try {
        bet = int(bettar.value());
      } catch(e) {
        bet = 0;
        alert("BETTA ENDAST NUMMER FÖR FAN");
      }
      saldo -= bet;
      localStorage.setItem("blackjacksaldo", saldo.toString());
      pressed = false;
      bettat = true;
      hide = false;
    }
    if (mouseOn(this) && mouseIsPressed && this.txt == "Stanna" && bettat && pressed) {
      while (dealer < 17)
        dealerKort.push(new Kort("dealer", 0.4625 * width, height / 2));
      GAME = OVER;
      flytta();
      vinnare = kontrolleraVinnare();
      localStorage.setItem("blackjacksaldo", saldo.toString());
      pressed = false;
    }
    if (bettat || this == betta || this == starta) {
      if (mouseOn(this)) {

        fill((this.c >> 16 & 0xFF) - 50, (this.c >> 8 & 0xFF) - 50, (this.c & 0xFF) - 50);
      } else {

        fill(this.c);
      }
    } else {

      fill((this.c >> 16 & 0xFF) - 50, (this.c >> 8 & 0xFF) - 50, (this.c & 0xFF) - 50);
    }

    strokeWeight(1);
    noStroke();
    rect(this.x,this.y, this.w, this.h, 8);
    fill(this.tc);
    textSize(16);
    textLeading(16);
    text(this.txt, this.x + this.w/2, this.y + this.h/2.2);

  }
}

function flytta() {
  for (var k in spelareKort) {
    spelareKort[k].x = (width / 2) - (width / 6) + spelareKort[k].antal * (spelareKort[k].buffer + spelareKort[k].w);
    spelareKort[k].y = 0.7 * height;
  }
  for (var k in dealerKort) {
    dealerKort[k].x = (width / 2) - (width / 6) + dealerKort[k].antal * (dealerKort[k].buffer + dealerKort[k].w);
    dealerKort[k].y = 0.3 * height;
  }
}

class Kort {
  constructor(owner, x, y) {
    this.w = round(width / 10);
    this.h = round(0.14 * height);
    this.buffer = 10;
    this.owner = owner;
    this.x = width * 0.35;
    this.y = y;
    this.val = int(random(1, 14)).toString();  //heltal mellan 1-13 för nummer på kort
    this.blackjackVal = int(this.val) > 10 ? 10 : int(this.val);  //värde på kortet enligt regler. Ess = 1
    let xval = int(this.val) - 2;
    let yval = int(random(4));
    if (xval < 0)
      xval = 12;
    this.kort = card.get(xval*xfactor, yval*yfactor, xfactor, yfactor);

    this.kort.resize(this.w, this.h);
    this.baksida = card.get(0, 4*yfactor, xfactor, yfactor);
    this.baksida.resize(this.w, this.h);
    switch (this.val) {
    case "11":
      this.val = "J";

      break;
    case "12":
      this.val = "Q";
      break;
    case "13":
      this.val = "K";
      break;
    case "1":
      this.val = "A";
      break;
    }
    if (this.owner == "spelare") {
      spelare += this.blackjackVal;
      this.y = 0.4 * height;
      this.antal = spelareKort.length;
    } else {

      dealer += this.blackjackVal;
      this.y = height * 0.2;
      this.antal = dealerKort.length;
    }
    this.x += this.antal * (this.w + this.buffer);
  }

  display() {
    if (!hide)
      image(this.kort, this.x, this.y);
    else
      image(this.baksida, this.x, this.y);
  }
}

class Symbol {
  constructor(img) {
    this.x = random(25, width-25);
    this.y = random(-height, -25);
    this.vy = random(2, 4);
    this.a = random(TWO_PI);
    this.vr = random(0.01, 0.05);
    this.img = img;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.a);
    image(this.img, 0, 0);
    pop();
    this.y += this.vy;
    if (this.y > height + 25) {
      this.x = random(25, width-25);
      this.y = -25;
      this.vy = random(2, 4);
      this.vr *= -1;
    }
    this.a += this.vr;
  }
}
