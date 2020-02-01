let grid = [], xpos = [], ypos = [];
let cols = 20, rows = 20;
let xsize, ysize;
let tick = 0, interval = 2,  len = 5;
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

function setup() {
  xpos.push(snake.x);
  ypos.push(snake.y);

  createCanvas(400, 400)
  initGrid();
  xsize = (width - 1) / cols;
  ysize = (height - 1) / rows;

  apple = {
    x: floor(random(cols)),
    y: floor(random(rows))
  };
}


function draw() {

  background(255);
  update();
  updateSnake();

  collision();
  eaten();

  render();

  if (over) {
    textSize(56);
    stroke(0);
    fill(255, 100, 100);
    text("GAME OVER", 50, 200);
    text("SCORE: " + (xpos.length - 1).toString(), 50, 300);
    noLoop();
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

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j] == 1) {
        fill(0, 0, 0);
      } else if (grid[i][j] == 0) {
        fill(255, 255, 255);
      } else if (grid[i][j] == 2) {
        fill(255, 50, 50);
      } else if (grid[i][j] == 3) {
        fill(0, 50, 255);
      }
      stroke(200);
      rect(i * xsize, j * ysize, xsize, ysize);
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
  if (keyCode == '87' && dir.y != 1 && dir.x != 0) {
    dir.x = 0;
    dir.y = -1;
  }
  if (keyCode == '83' && dir.y != -1 && dir.x != 0) {
    dir.x = 0;
    dir.y = 1;
  }
  if (keyCode == '68' && dir.x != -1 && dir.y != 0) {
    dir.x = 1;
    dir.y = 0;
  }
  if (keyCode == '65' && dir.x != 1 && dir.y != 0) {
    dir.x = -1;
    dir.y = 0;
  }

}

function collision() {
  for (var i = 1; i <  xpos.length; i++) {
    if (snake.x == xpos[i] && snake.y == ypos[i]) {
      over = true;
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

function saveToFirebase(email) {
  var emailObject = {
    email: email
  };

  firebase.database().ref('subscription-entries').push().set(emailObject).then(function(snapshot) {
    console.log("Success");
  }, function(error) {
    console.log("error");

  });
}

saveToFirebase("test.se");
