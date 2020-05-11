class Block {
  
  constructor(x,  y, w,  h) {
    this.x = x;
    this.y = y + buffer;
    this.w = w;
    this.h = h;
    this.bomb = false;
    this.state = 0;
    this.counter = 0;
  }
  
  // states
  // 0 - oupptäckt
  // 1 - upptäckt
  // 2 - flaggad
  // 3 - Kanske
  
  display() {

    
    if (this.state == 0) {
      fill(200); // Grå
    } else if (this.state == 1) {
      fill(255); // Vitt
    } else if (this.state == 2) {
      fill(71, 230, 50); // Grönt
    } else
      fill(255, 255, 0);
    
    if (this.bomb && this.state == 1)
      fill(255, 50, 50);
    print(this.x);
    rect(this.x, this.y, this.w, this.h);
    
    if (over && this.bomb) {
      strokeWeight(4);
      povar(this.x + this.w/2, this.y + this.h/2);
    }
    strokeWeight(1);
    if (this.state == 1 && this.counter > 0 && !this.bomb) {
      fill(0);
      
      textSize(18);
      text(this.counter, this.x + (this.w / 2), this.y + (this.h / 2.5));
    }
  }
  
  mouseOn( b) {
    if (mouseX > b.x && mouseY > b.y && mouseX < b.x + b.w && mouseY < b.y + b.h)
      return true;
    return false;
  }
}
show = false;
class Clock {
  constructor() {
    this.seconds = 0;
    this.s = 0;
    this.m = 0;
    this.start = 0;
  }
  
  display() {
    if (show)
      this.seconds = floor(millis() - this.start) / 1000;
    
    this.s = this.seconds % 60;
    this.m = floor(this.seconds / 60);
    
    //fill(255);
    text(nf(this.m, 2, 0) + ":" + nf(this.s, 2, 0), 30, buffer/2);
  }
  
  startClock() {
    this.start = millis();
    show = true;
  }
  
  stopClock() {
    show = false;
  }
  
  resetClock() {
    this.start = millis();
    this.seconds = 0;
  }
  
  getTime() {
    return nf(this.m, 2, 0) + ":" + nf(this.s, 2, 0);
  }
}

class Knapp {
  constructor(x, y, w,  h, text) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
  }
  
  display() {
    push();
    if (mouseOn(this))
      fill(128);
    else
      fill(255);
    
    
    if (mouseIsPressed && mouseOn(this) && this.text.equals("Starta Om")) {
      gameState = 1;
      initGrid();
      firstpress = true;
      over = false;
      bombs = bomber;
      clock.resetClock();
    }
    
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 4);
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(this.text, this.x, this.y);
    pop();
  }
  
  mouseOn( k) {
    if (mouseX > k.x - k.w / 2 &&
        mouseX < k.x + k.w / 2 &&
        mouseY > k.y - k.h / 2 &&
        mouseY < k.y + k.h / 2)
        return true;
    return false;
  }
  
}

var cols = 8;
var rows = 8;
var xsize, ysize;
var bomber = 10;
var bombs = bomber;
var gameState = 1;

let comicsans, defaultFont;
let starta, restart, settings;
var won = false;
var firstpress = true;
var over = false;
 var WIDTH = 304 + 1;
var HEIGHT = 304 + 1;
var buffer = 30;
let clock = new Clock();
let grid = [];
var board;
// states
// 0 - oupptäckt
// 1 - upptäckt
// 2 - flaggad


function setup() {
  
  for (var i = 0; i < rows; i++) {
    grid[i] = [];
  }
  
  createCanvas(WIDTH, HEIGHT + buffer);
  initGrid();
  
  textAlign(CENTER, CENTER);
  
  
  restart = new Knapp(width / 2, 3 * buffer + height / 2, 100, 40, "Starta Om");
}

function draw() {
  rectMode(CORNER);
  switch(gameState) {
    case 1:
      drawPlay();
      break;
    case 2:
      drawResult();
      break;
  }
  
}
function initGrid() {
  xsize = floor(WIDTH / cols);
  ysize = floor(HEIGHT / rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Block(i * xsize, j * ysize, xsize, ysize);
    }
  }
}


function drawResult() {
  
  image(board, 0, 0);
  restart.display();
  textSize(28);
  fill(255);
  stroke(0);
  
  if (gameWon()) {
    text("Storlek: " + cols+"x"+rows, width/2, 95);
    text("Bomber: " + bomber, width/2, 120);
    text("Tid: " + clock.getTime(), width/2, 145);
  } else {
    
    text("Du förlorade", width/2, height  /2);
  }
  
}

function drawPlay() {
  background(100);
  fill(255);
  textSize(14);
  
  clock.display();
  text("Antal bomber: " + bombs, width - 60, buffer / 2);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].display();
    }
  }
  if (gameWon()) {
    gameState = 2;
    clock.stopClock();
    board = get(0, 0, width, height);
    tint(0, 128, 0, 200);
  }
}

function mousePressed() {
  if (gameState == 1) {
  var ix = constrain(floor(mouseX/xsize), 0, cols-1);
  var iy = constrain(floor((mouseY-buffer)/ysize), 0, rows-1);
  
  if (mouseButton == LEFT) {
    if (firstpress) {
      generateBombs(ix, iy); 
      firstpress = false;
      clock.startClock();
    }
    clicked(grid[ix][iy], 1);
  } else  {
    clicked(grid[ix][iy], 0); 
  }
  gameWon();
  }
  
}

function clicked(b, opt) {
  if (opt == 1) {
     if (b.state == 2) // Flaggade blocks ska inget hända
       return;
     
     else if (b.state == 0) { // Oupptäckta blocks blir upptäckta
       
       b.state = 1;
       uncover(b);
       if (b.bomb)
         gameOver();
     }
  } else if (b.state == 2) {
    b.state = 3;
    bombs++;
  } else if (b.state == 3) {
    b.state = 0;
  } else if (b.state == 0) {
    b.state = 2;
    bombs--;
  }
}

function gameOver() {
  over = true;
  bombs = bomber;
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].state = 1;
      grid[i][j].display();
      
    }
  }
  clock.stopClock();
  
  board = get(0, 0, width, height);
  tint(128, 50, 50, 200);
  gameState = 2;
  
}

function gameWon() {
  if (over) return false;
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (!grid[i][j].bomb && grid[i][j].state != 1)
        return false;
    }
  }
  
  
  return true;
}

function uncover(b) {
  
  var x = b.x / xsize;
  var y = (b.y-buffer) / ysize;
  //prvarln("(" + x + ", " + y + ")");
  if (b.counter == 0) {
    if (y > 0) {
      if (grid[x][y-1].state == 0) {
        grid[x][y-1].state = 1;
        uncover(grid[x][y-1]);
      }
    }
    if (x > 0) {
      if (grid[x-1][y].state == 0) {
        
        grid[x-1][y].state = 1;
        uncover(grid[x-1][y]);
      }
    }
    if (x < cols - 1) {
      if (grid[x+1][y].state == 0) {
        grid[x+1][y].state = 1;
        uncover(grid[x+1][y]);
        
      }
    }
    if(y < rows - 1) {
      if (grid[x][y+1].state == 0) {
        grid[x][y+1].state = 1;
        uncover(grid[x][y+1]);
        
      }
    }
    if (y > 0 && x < cols - 1) {
      if (grid[x+1][y-1].state == 0) {
        grid[x+1][y-1].state = 1;
        uncover(grid[x+1][y-1]);
      }
    }
    if (x > 0 && y > 0) {
      if (grid[x-1][y-1].state == 0) {
        grid[x-1][y-1].state = 1;
        uncover(grid[x-1][y-1]);
      }
    }
    if (y < rows - 1 && x > 0) {
      if (grid[x-1][y+1].state == 0) {
        grid[x-1][y+1].state = 1;
        uncover(grid[x-1][y+1]);
        
      }
    }
    if(y < rows - 1 && x < cols - 1) {
      if (grid[x+1][y+1].state == 0) {
        grid[x+1][y+1].state = 1;
        uncover(grid[x+1][y+1]);
        
      }
    }
  }
  
}

function generateBombs(px, py) {
  let possiblePositions = [];
  for (var i = 0; i < rows*cols; i++) {
    possiblePositions.splice(i, 0, i);
  }
  
  // x + y * width
  var ind = possiblePositions.indexOf(px+cols*py);
  possiblePositions.splice(ind, 1); // Sätt vare bomber på den rutan som spelaren klickar på
  
  if (px > 0 && py > 0) {
    ind = possiblePositions.indexOf((px-1)+cols*(py-1));
     possiblePositions.splice(ind, 1);
      
  }
  if (py > 0) {
    ind = possiblePositions.indexOf((px)+cols*(py-1));
     possiblePositions.splice(ind, 1);
      
  }
  if (px < cols - 1 && py > 0) {
    ind = possiblePositions.indexOf((px+1)+cols*(py-1));
     possiblePositions.splice(ind, 1);
      
  }
  if (px > 0) {
    ind = possiblePositions.indexOf((px-1)+cols*(py));
     possiblePositions.splice(ind, 1);
      
  }
  if (px < cols - 1) {
    ind = possiblePositions.indexOf((px+1)+cols*(py));
     possiblePositions.splice(ind, 1);
      
  }
  if (px > 0 && py < rows - 1) {
    ind = possiblePositions.indexOf((px-1)+cols*(py+1));
     possiblePositions.splice(ind, 1);
      
  }
  if (py < rows - 1) {
    ind = possiblePositions.indexOf((px)+cols*(py+1));
     possiblePositions.splice(ind, 1);
      
  }
  if (px < cols - 1 && py < rows - 1) {
    ind = possiblePositions.indexOf((px+1)+cols*(py+1));
     possiblePositions.splice(ind, 1);
      
  }
  
  
  for (var n = 0; n < bombs; n++) {
    var pos = possiblePositions[floor(random(possiblePositions.length))];
    var y = floor(pos/cols);
    var x = pos-cols*y;
    //prvarln("Bomb nr " + i  + " på plats (" + x + " ," + y + ")");
    grid[x][y].bomb = true;
    var temp = possiblePositions.indexOf(pos);
    possiblePositions.splice(temp, 1);
    if ( x > 0 && y > 0)
      grid[ x-1][y-1].counter++;
    if (y > 0) 
      grid[ x][y-1].counter++;
    if ( x < cols - 1 && y > 0)
      grid[ x+1][y-1].counter++;
    if ( x > 0)
      grid[ x-1][y].counter++;
    if ( x < cols - 1)
      grid[ x+1][y].counter++;
    if ( x > 0 && y < rows - 1)
      grid[ x-1][y+1].counter++;
    if (y < rows - 1)
      grid[ x][y+1].counter++;
    if ( x < cols - 1 && y < rows - 1)
      grid[ x+1][y+1].counter++;
  }
}

function resetCounters() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].counter = 0;
    }
  }
}

