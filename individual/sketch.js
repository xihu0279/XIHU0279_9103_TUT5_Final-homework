let clockX, clockY, clockSize;  // 定义时钟中心坐标和大小
let colors = [];                // 主时钟颜色数组
let altColors = [];             // 交替圆环颜色数组

function setup() {
  createCanvas(windowWidth, windowHeight);
  clockSize = min(windowWidth, windowHeight) * 0.8;  // 计算时钟大小
  clockX = windowWidth / 2;                          // 设置时钟中心X坐标
  clockY = windowHeight / 2;                         // 设置时钟中心Y坐标
  
  // 初始化主时钟的颜色
  for (let i = 0; i < 24; i++) {
    colors.push([random(255), random(255), random(255)]);
  }

  // 初始化交替圆环的颜色
  for (let i = 0; i < 48; i++) {
    altColors.push([random(255), random(255), random(255)]);
  }

  noLoop();  // 设置画面仅绘制一次
  drawClock();
}

function draw() {
  // 绘图逻辑已移至drawClock()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  clockSize = min(windowWidth, windowHeight) * 0.8;
  clockX = windowWidth / 2;
  clockY = windowHeight / 2;
  
  drawClock();
}

function drawClock() {
  background(255);  // 设置背景颜色为白色
  
  // 绘制主要的圆环
  drawMainCircles();

  // 绘制24个随机颜色的圆
  drawRandomColoredCircles();

  // 绘制交替大小的圆环
  drawAlternatingCircles();
}

function drawMainCircles() {
  // 绘制多个层次的圆环
  fill(79, 79, 217);
  noStroke();
  ellipse(clockX, clockY, clockSize);  // 第一圈

  fill(0, 68, 116);
  ellipse(clockX, clockY, clockSize * 0.7);  // 第二圈
  fill(239, 248, 254);
  ellipse(clockX, clockY, clockSize * 0.63);  // 第三圈
  fill(0, 68, 116);
  ellipse(clockX, clockY, clockSize * 0.56);  // 第四圈
  fill(239, 248, 254);
  ellipse(clockX, clockY, clockSize * 0.49);  // 第五圈
  fill(0, 68, 116);
  ellipse(clockX, clockY, clockSize * 0.42);  // 第六圈
  fill(239, 248, 254);
  ellipse(clockX, clockY, clockSize * 0.35);  // 第七圈
  fill(0, 68, 116);
  ellipse(clockX, clockY, clockSize * 0.28);  // 第八圈
  fill(239, 248, 254);
  ellipse(clockX, clockY, clockSize * 0.21);  // 第九圈
  fill(247,65,151);
  ellipse(clockX, clockY, clockSize * 0.2);   // 第十圈
  fill(77,200,252);
  ellipse(clockX, clockY, clockSize * 0.19);  // 第十一圈
  fill(247,65,151);
  ellipse(clockX, clockY, clockSize * 0.18);  // 第十二圈
  fill(77,200,252);
  ellipse(clockX, clockY, clockSize * 0.17);  // 第十三圈
  fill(255);
  ellipse(clockX, clockY, clockSize * 0.15);  // 第十四圈
  fill(235,92,32);
  ellipse(clockX, clockY, clockSize * 0.145); // 第十五圈
  fill(255);
  ellipse(clockX, clockY, clockSize * 0.14);  // 第十六圈
  fill(235,92,32);
  ellipse(clockX, clockY, clockSize * 0.135); // 第十七圈
  fill(255);
  ellipse(clockX, clockY, clockSize * 0.13);  // 第十八圈
  fill(255);
  ellipse(clockX, clockY, clockSize * 0.05);  // 第十九圈
}

function drawRandomColoredCircles() {
  let angleStep = TWO_PI / 24;
  let innerRadius = clockSize * 0.7 / 2;  // 内圈半径
  let outerRadius = clockSize / 2;        // 外圈半径

  for (let i = 0; i < 24; i++) {
    let angle = i * angleStep;
    let x = clockX + cos(angle) * ((innerRadius + outerRadius) / 2);
    let y = clockY + sin(angle) * ((innerRadius + outerRadius) / 2);

    fill(colors[i]);
    ellipse(x, y, clockSize * 0.06);  // 绘制随机颜色的圆
  }
}

function drawAlternatingCircles() {
  let angleStep = TWO_PI / 24;  // 角度步长
  let radius = clockSize * 0.6;  // 圆环半径

  for (let i = 0; i < 48; i++) {
    let angle = i * angleStep;
    let x = clockX + cos(angle) * radius;
    let y = clockY + sin(angle) * radius;
    let size = (i % 2 === 0) ? clockSize * 0.1 : clockSize * 0.05;  // 交替的圆大小

    fill(altColors[i]);
    ellipse(x, y, size);  // 绘制交替大小的圆
  }
}

function randomizeColors() {
  // 重新生成所有圆的颜色
  for (let i = 0; i < 24; i++) {
    colors[i] = [random(255), random(255), random(255)];
  }
  for (let i = 0; i < 48; i++) {
    altColors[i] = [random(255), random(255), random(255)];
  }
}

function mousePressed() {
  randomizeColors();
  drawClock();
}
