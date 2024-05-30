let x = 0;
let y = 100;
let speed = 2;
let lastTime = 0;

function setup() {
  createCanvas(400, 200);
}

function draw() {
  background(220);
  ellipse(x, y, 50, 50);
  
  let currentTime = millis();
  if (currentTime - lastTime > 1000) {
    x += speed;
    if (x > width) {
      x = 0;
    }
    lastTime = currentTime;
  }
}

function mousePressed() {
  speed = -speed; // 点击鼠标时改变方向
}
