let grid = [],
  xpos = [],
  ypos = [];
let cols = 20,
  rows = 20;
let xsize, ysize;
let tick = 0,
  interval = 2,
  len = 5;
var over = false;

let snake = {
  x: 0,
  y: 5
};
let dir = {
  x: 1,
  y: 0
};

let apple;
let cnv;

function setup() {
  xpos.push(snake.x);
  ypos.push(snake.y);
  textAlign(CENTER, CENTER);
  let smol = windowWidth / 2;
  if (smol > windowHeight / 2) {
  smol = windowHeight / 2;
}
  cnv = createCanvas(smol, smol)
  cnv.style('float', 'left')
  var x = (windowWidth - width) / 2;
  //cnv.position(185, 70);
  initGrid();
  xsize = (width - 1) / cols;
  ysize = (height - 1) / rows;

  apple = {
    x: floor(random(cols)),
    y: floor(random(rows))
  };
}

function windowResized() {
  let smol = windowWidth / 2;
  if (smol > windowHeight / 2) {
  smol = windowHeight / 2;
}
  cnv = resizeCanvas(smol, smol)
  var x = (windowWidth - width) / 2;
  //cnv.position(185, 70);
  initGrid();
  xsize = (width - 1) / cols;
  ysize = (height - 1) / rows;
}

function draw() {




  if (over) {
    textSize(width / 10);
    stroke(255, 50, 50);
    fill(255, 50, 50);
    text("SCORE: " + (xpos.length - 1).toString(), width / 2, height / 2);
    textSize(width / 20);
    fill(0);
    stroke(255);
    text("Press Enter to Play Again", width / 2, 0.65 * height);
    //text("Ditt Highscore: " + best, width / 2, 0.75 * height);
    //text("SCORE: " + (xpos.length - 1).toString(), 50, 300);
  } else {
    background(200);

    updateSnake();

    collision();
    eaten();

    render();
    update();
  }

}

function initGrid() {
  for (var i = 0; i < cols; i++) {
    grid[i] = [];
    for (var j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
}

function render() {
  grid[apple.x][apple.y] = 2;
  noStroke();
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {

      if (grid[i][j] != 0) {
        if (grid[i][j] == 1) {
          fill(50);
        } else if (grid[i][j] == 2) {
          fill(255, 50, 50);
        } else if (grid[i][j] == 3) {
          fill(0, 50, 255);
        }
        rect(i * xsize, j * ysize, xsize, ysize);
      }
    }
  }



}

function update() {
  if (tick > interval) {

    snake.x += dir.x;
    snake.y += dir.y;

    if (snake.x == cols) {
      snake.x -= (cols)
    }
    if (snake.x == -1) {
      snake.x += (cols)
    }
    if (snake.y == rows) {
      snake.y -= (rows)
    }
    if (snake.y == -1) {
      snake.y += (rows)
    }

    xpos.unshift(snake.x);
    ypos.unshift(snake.y);
    if (len < xpos.length) {
      for (var c = 0; c < xpos.length; c++) {
        var x = xpos[c]
        var y = ypos[c];
        grid[x][y] = 0;
      }
      xpos.pop();
      ypos.pop();
    }
    tick = 0;

  } else {
    tick++;
  }
}

function updateSnake() {
  for (var i = 1; i < xpos.length; i++) {
    var x = xpos[i];
    var y = ypos[i];
    grid[x][y] = 1;
  }
  grid[xpos[0]][ypos[0]] = 3;
}



function keyPressed() {
  if (!over) {
    if (keyCode == '87' || keyCode == UP_ARROW) {
      dir.x = 0;
      dir.y = -1;
    }
    if (keyCode == '83' || keyCode == DOWN_ARROW) {
      dir.x = 0;
      dir.y = 1;
    }
    if (keyCode == '68' || keyCode == RIGHT_ARROW) {
      dir.x = 1;
      dir.y = 0;
    }
    if (keyCode == '65' || keyCode == LEFT_ARROW) {
      dir.x = -1;
      dir.y = 0;
    }

  } else if (key == ' ' || keyCode == ENTER) {
    over = false;
    initGrid();
    len = 5;
    xpos = [];
    ypos = [];
    snake = {
      x: 0,
      y: 5
    };
    dir = {
      x: 1,
      y: 0
    };
    xpos.push(snake.x);
    ypos.push(snake.y);
  }

}

function collision() {
  for (var i = 1; i < xpos.length; i++) {
    if (snake.x == xpos[i] && snake.y == ypos[i]) {
      over = true;
      //if (score > best) {
      //  best = score;
       // document.cookie = best;
      //}
    }
  }
}

function eaten() {
  if (snake.x == apple.x && snake.y == apple.y) {
    grid[apple.x][apple.y] = 0;
    len++;
    apple = {
      x: floor(random(cols)),
      y: floor(random(rows))
    };
  }
}
