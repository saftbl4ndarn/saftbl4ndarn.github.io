
let START = 1;
let PLAY = 2;
let OVER = 3;
let xfactor, yfactor;
let GAME = START;
let spelare = 0;
let dealer = 0;
let vinnare;
let pressed = false;
let saldo = 100;
let bet = 0;
let bettat = false;
let vinst = 'd';
let hide = true;

let starta, hit, stopp, restart, betta, help;
let suits, blackjack, card;
let def, font;
let spelareKort = [];
let dealerKort = [];
let symboler = [];
let bettar;

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  initBg();
  initi();
  textFont(def);
}

function draw() {
  if (GAME == START)
    drawStart();
  if (GAME == PLAY)
    drawPlay();
  if (GAME == OVER)
    drawOver();
  textAlign(LEFT, BOTTOM);
  text("Saldo: " + saldo, 0, 400);
  textAlign(CENTER, CENTER);
  help.display();
}

function drawStart() {
  background(255);
  gradient(black, red);
  regn();
  image(blackjack, 200, 100);
  starta.display();
}

function drawPlay() {
  background(255);
  gradient(red, black);
  fill(255);
  if (!bettat)
    betta.display();
  else
    text("Aktuellt bet: " + bet, 200, 265);
  textSize(24);
  noStroke();
  if (spelare >= 21 || dealer >= 21) {
    vinnare = kontrolleraVinnare();
    flytta();
    GAME = OVER;
  }
  if (bettat) {
    fill(white);
    text("Dealer:  " + dealer, 75, 75);
    text("Spelare: " + spelare, 75, 175);
  } else {
    fill(white);
    text("Dealer:  X", 75, 75);
    text("Spelare: X", 75, 175);
  }
  for (var k in dealerKort)
    k.display();
  for (var k in spelareKort)
    k.display();
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
  text("Dealer", 200, 25);
  fill(red);
  text("Spelare", 200, 375);
  textSize(16);
  fill(255);
  textLeading(18);
  text(vinnare, 200, 200);
  textSize(20);
  fill(black);
  text(dealer, 200, 170);
  for (var k in dealerKort)
    k.display();
  for (var k in spelareKort)
    k.display();
  restart.display();
  textSize(20);
  fill(red);
  text(spelare, 200, 230);
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

  def = textFont("Arial");
  font = textFont("Arial Black");
  blackjack = loadImage("https://i.imgur.com/XU6oVyh.png");
  card = loadImage("https://i.imgur.com/n6K13ID.gif");
  suits = loadImage("https://i.imgur.com/blUrWaX.png");
  suits.resize(100, 100);
  let tempSuits = [suits.get(50,  0, 50, 50), suits.get(0,  0, 50, 50),
                   suits.get(50, 50, 50, 50), suits.get(0, 50, 50, 50)];
  for (let i = 0; i < 8; i++) {
    symboler.push(new Symbol(tempSuits[i%4]));
  }
}

function initi() {
  bettar = createInput("").attribute('placeholder', 'Betta här');
  bettar.position(100, 380);
  xfactor = card.width / 13;
  yfactor = card.height / 5;
  starta = new Knapp(150, 175, 100, 50, "Starta", red, black);
  hit = new Knapp(234, 300, 100, 50, "Nytt kort", white, green);
  stopp = new Knapp(66, 300, 100, 50, "Stanna", white, red);
  restart = new Knapp(345, 345, 50, 50, "Spela\nigen", white, black);
  betta = new Knapp(160, 250, 80, 30, "Betta Här", white, black);
  help = new Knapp(380, 0, 20, 20, "?", white, black);
  dealerKort.push(new Kort("dealer", 185, 200));
  spelareKort.push(new Kort("spelare", 185, 200));
  spelareKort.push(new Kort("spelare", 185, 200));
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
  for (var s in symboler)
    s.display();
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
      spelareKort.add(new Kort("spelare", 0.4625 * width, height / 2));
      pressed = false;
    }
    if (mouseOn(this) && pressed && this == restart) {
      spelare = 0;
      dealer = 0;
      bet = 0;
      spelareKort.clear();
      dealerKort.clear();
      init();
      GAME = PLAY;
      pressed = false;
      bettat = false;
      hide = true;
    }
    if (mouseOn(this) && mouseIsPressed && this == betta && pressed) {
      try {
        bet = int(bettar.value);
      } catch(e) {
        bet = 0;
        alert("BETTA ENDAST NUMMER FÖR FAN");
      }
      saldo -= bet;
      pressed = false;
      bettat = true;
      hide = false;
    }
    if (mouseOn(this) && mouseIsPressed && txt.equals("Stanna") && bettat && pressed) {
      while (dealer < 17)
        dealerKort.push(new Kort("dealer", 0.4625 * width, height / 2));
      GAME = OVER;
      flytta();
      vinnare = kontrolleraVinnare();
      pressed = false;
    }
    if (bettat || this == betta || this == starta || this == help) {
      if (mouseOn(this)) {
        textFont(font);
        fill(red(c) - 50, green(c) - 50, blue(c) - 50, alpha(c));
      } else {
        textFont(def);
        fill(c);
      }
    } else {
      textFont(def);
      fill(red(c) - 50, green(c) - 50, blue(c) - 50, alpha(c));
    }
    if (mouseOn(this) && this == help) {
      fill(255);
      rect(70, 140, 260, 120, 7);
      fill(0);
      textFont(def);
      text("1. Klicka på Starta\n2. Klicka på Betta Här\n3. Välj summan att spela för\n4. Klicka på Nytt Kort eller Stanna\n5. Spela igen", 200, 200);
    }
    strokeWeight(1);
    noStroke();
    rect(x, y, w, h, 8);
    fill(tc);
    textSize(16);
    textLeading(16);
    text(txt, x + w/2, y + h/2.2);
    textFont(def);
  }
}

function flytta() {
  for (var k in spelareKort) {
    k.x = 150 + k.antal * (k.buffer + k.w);
    k.y = 310;
  }
  for (var k in dealerKort) {
    k.x = 150 + k.antal * (k.buffer + k.w);
    k.y = 90;
  }
}

class Kort {

  constructor(owner, x, y) {
    let w = width / 10;
    let h = round(0.15 * height);
    this.owner = owner;
    this.x = x;
    this.y = y;
    this.val = int(random(1, 14)).toString();  //heltal mellan 1-13 för nummer på kort
    this.blackjackVal = int(this.val) > 10 ? 10 : int(this.val);  //värde på kortet enligt regler. Ess = 1
    let xval = int(this.val) - 2;
    let yval = int(random(4));
    if (xval < 0)
      xval = 12;
    this.kort = card.get(xval*xfactor, yval*yfactor, xfactor, yfactor);
    this.kort.resize(w, h);
    baksida = card.get(0, 4*yfactor, xfactor, yfactor);
    baksida.resize(w, h);
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
    if (owner == "spelare") {
      spelare += blackjackVal;
      this.y = 0.45 * height;
      this.antal = spelareKort.size();
    } else {

      dealer += blackjackVal;
      this.y = height * 0.2;
      this.antal = dealerKort.size();
    }
    this.x += this.antal * (w + buffer);
  }

  display() {
    if (!hide)
      image(kort, x, y);
    else
      image(baksida, x, y);
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
    translate(x, y);
    rotate(a);
    image(img, 0, 0);
    pop();
    y += vy;
    if (y > height + 25) {
      x = random(25, width-25);
      y = -25;
      vy = random(2, 4);
      vr *= -1;
    }
    a += vr;
  }
}
