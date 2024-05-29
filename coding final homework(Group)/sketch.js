let circles = [];
let circleDiameter = 180; // 主圆的直径，可以调整
let spacing = 35; // 圆圈之间的间距，可以调整
let offsetX = -10; // 所有圆向左移动的偏移量，可以调整
let offsetY = -20; // 所有圆向上移动的偏移量，可以调整

let specialCircleColor = [255, 255, 0]; // 特殊圆的颜色，默认黄色
let redLineStrokeWeight = 0.8; // 红线的宽度，默认3
let redLineSpikes = 130; // 红线的角的个数，默认16
let goldLineStrokeWeight = 3; // 金线的宽度，默认3
let goldLineSpikes = 16; // 金线的角的个数，默认16

function setup() {
  createCanvas(windowWidth, windowHeight); // 创建根据窗口大小调整画布
  noLoop(); // 停止draw函数连续执行，画面静止
  noStroke(); // 画圆时不显示边框

  // 初始化所有圆的信息，并加入到circles数组中
  let y = circleDiameter / 2;
  while (y < height + circleDiameter) {
    let x = circleDiameter / 2;
    while (x < width + circleDiameter) {
      let angle = random(TWO_PI);  // 随机起始角度
      let hasArc = random() > 0.5;  // 50% 的几率决定是否有弧线
      let styleType = random(['goldZigzag', 'multiLayeredRings']); // 随机选择风格
      circles.push({
        x: x + offsetX,
        y: y + offsetY,
        d: circleDiameter,
        colors: generateColors(),
        startAngle: angle,
        hasArc: hasArc,
        styleType: styleType  // 存储风格类型
      });
      x += circleDiameter + spacing;
    }
    y += circleDiameter + spacing;
  }

  // 随机选择两个同心圆组
  let selectedIndices = [];
  while (selectedIndices.length < 2) {
    let index = floor(random(circles.length));
    if (!selectedIndices.includes(index)) {
      selectedIndices.push(index);
    }
  }

  // 更新这两个同心圆的属性
  for (let i = 0; i < selectedIndices.length; i++) {
    circles[selectedIndices[i]].isSpecial = true;
  }
}

function draw() {
  background(50, 100, 150); // 设置背景颜色

  // 绘制所有圆和其他图形
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    let radii = [c.d, c.d * 0.55, c.d * 0.5, c.d * 0.25, c.d * 0.15, c.d * 0.1, c.d * 0.05]; // 主圆及内部圆的大小

    if (c.isSpecial) {
      drawSpecialCirclePattern(c.x, c.y, radii, c.colors, c.styleType);
    } else {
      drawCirclePattern(c.x, c.y, radii, c.colors, c.styleType);
    }
  }

  // 绘制橘色圆环
  drawOrangeCircles(circles);

  // 在橘色圆环上绘制图案
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    drawPatternOnRing(c.x, c.y, c.d / 2 + 15);
  }

  // 最后绘制粉色弧线，确保它们在最顶层
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    if (c.hasArc) {  // 检查是否需要绘制弧线
      drawArcThroughCenter(c.x, c.y, c.d / 2, c.startAngle);
    }
  }

  // 在两组特殊的同心圆中分别绘制红线
  drawRedLinesInSpecialCircles();
}

function drawCirclePattern(x, y, radii, colors, styleType) {
  let numRings = radii.length; // 同心圆的数量
  for (let i = 0; i < numRings; i++) {
    fill(colors[i % colors.length]); // 设置填充颜色
    ellipse(x, y, radii[i], radii[i]); // 绘制圆形
    if (i == 0) { // 只在最大的圆和第二大的圆之间绘制白色点
      fillDotsOnCircle(x, y, radii[0] / 2, radii[1] / 2); // 填充圆点到整个圆
    }
    if (i == 2 && i + 1 < numRings) { // 在第三大和第四大圆之间根据风格绘制
      if (styleType === 'goldZigzag') {
        drawGoldZShape(x, y, radii[2] / 2, radii[3] / 2);
      } else if (styleType === 'multiLayeredRings') {
        drawMultiLayeredRings(x, y, radii[2] / 2, radii[3] / 2);
      }
    }
    if (styleType === 'multiLayeredRings' && i == 3 && i + 1 < numRings) {
      drawGreenLayeredRings(x, y, radii[3] / 2, radii[4] / 2);
    }
  }
}

function drawSpecialCirclePattern(x, y, radii, colors, styleType) {
  fill(specialCircleColor); // 设置最大的圆为特殊颜色
  ellipse(x, y, radii[0], radii[0]); // 绘制最大的圆

  // 绘制其他的圆，跳过白色小圆点的绘制
  for (let i = 1; i < radii.length; i++) {
    fill(colors[i % colors.length]);
    ellipse(x, y, radii[i], radii[i]);
  }

  if (styleType === 'goldZigzag') {
    drawGoldZShape(x, y, radii[2] / 2, radii[3] / 2);
  } else if (styleType === 'multiLayeredRings') {
    drawMultiLayeredRings(x, y, radii[2] / 2, radii[3] / 2);
  }
}

function drawRedLinesInSpecialCircles() {
  let specialCircles = circles.filter(c => c.isSpecial);
  for (let i = 0; i < specialCircles.length; i++) {
    let c = specialCircles[i];
    drawRedLine(c.x, c.y, c.d / 2, c.d * 0.55 / 2);
  }
}

function drawRedLine(cx, cy, outerRadius, innerRadius) {
  push();
  stroke(255, 0, 0); // 红色
  strokeWeight(redLineStrokeWeight); // 设置线条宽度
  noFill(); // 不填充

  let numSpikes = redLineSpikes; // 尖角的数量
  let angleStep = TWO_PI / numSpikes; // 每个尖角之间的角度

  beginShape();
  for (let i = 0; i < numSpikes; i++) {
    // 计算外圈点位置（第一大圆和第二大圆的区间）
    let angle = i * angleStep;
    let outerX = cx + cos(angle) * outerRadius;
    let outerY = cy + sin(angle) * outerRadius;
    vertex(outerX, outerY); // 添加外圈点

    // 计算内圈点位置（向内缩进以形成尖角）
    let innerAngle = angle + angleStep / 2;
    let innerRadiusAdjust = innerRadius + (outerRadius - innerRadius) * 0.3;
    let innerX = cx + cos(innerAngle) * innerRadiusAdjust;
    let innerY = cy + sin(innerAngle) * innerRadiusAdjust;
    vertex(innerX, innerY); // 添加内圈点
  }
  endShape(CLOSE);

  pop(); // 恢复之前保存的绘图设置
}

function drawGoldZShape(cx, cy, thirdRadius, fourthRadius) {
  push();
  stroke(212, 175, 55); // 设置画笔颜色为金色
  strokeWeight(goldLineStrokeWeight); // 设置线条宽度
  noFill(); // 不填充

  let numSpikes = goldLineSpikes; // 尖角的数量
  let angleStep = TWO_PI / numSpikes; // 每个尖角之间的角度

  beginShape();
  for (let i = 0; i < numSpikes; i++) {
    // 计算外圈点位置（第三圆的外圈）
    let angle = i * angleStep;
    let outerX = cx + cos(angle) * thirdRadius;
    let outerY = cy + sin(angle) * thirdRadius;
    vertex(outerX, outerY); // 添加外圈点

    // 计算内圈点位置（第四圆的内圈），但稍微向内缩进以形成尖角
    let innerAngle = angle + angleStep / 2;
    let innerRadiusAdjust = fourthRadius + (thirdRadius - fourthRadius) * 0.3; // 调整内圈半径使尖角不会太尖
    let innerX = cx + cos(innerAngle) * innerRadiusAdjust;
    let innerY = cy + sin(innerAngle) * innerRadiusAdjust;
    vertex(innerX, innerY); // 添加内圈点
  }
  endShape(CLOSE);

  pop(); // 恢复之前保存的绘图设置
}

function drawMultiLayeredRings(cx, cy, thirdRadius, fourthRadius) {
  push();
  let colors = [
    color(255, 0, 121),  // 粉色
    color(0, 179, 255)    // 蓝色
  ];
  strokeWeight(3);
  noFill();
  let numRings = 5; // 圆环数量
  let radiusStep = (thirdRadius - fourthRadius) / numRings; // 半径步长

  for (let j = 0; j < numRings; j++) {
    stroke(colors[j % colors.length]); // 设置画笔颜色
    ellipse(cx, cy, thirdRadius * 2 - j * radiusStep, thirdRadius * 2 - j * radiusStep);
  }

  pop(); // 恢复之前保存的绘图设置
}

function drawGreenLayeredRings(cx, cy, fourthRadius, fifthRadius) {
  push();
  let colors = [
    color(255, 255, 255),  // 深绿255, 255, 255
    color(68, 106, 55) // 浅绿
  ];
  strokeWeight(3);
  noFill();
  let numRings = 4; // 圆环数量
  let radiusStep = (fourthRadius - fifthRadius) / numRings; // 半径步长

  for (let j = 0; j < numRings; j++) {
    stroke(colors[j % colors.length]); // 设置画笔颜色
    ellipse(cx, cy, fourthRadius * 2 - j * radiusStep, fourthRadius * 2 - j * radiusStep);
  }

  pop(); // 恢复之前保存的绘图设置
}

function fillDotsOnCircle(cx, cy, outerRadius, innerRadius) {
  fill(255); // 设置填充颜色为白色
  let numCircles = 6; // 总共绘制6圈
  let dotSize = 3.5; // 圆点的直径，可以调整
  let radiusStep = (outerRadius - innerRadius) / numCircles; // 计算圈与圈之间的距离

  for (let j = 0; j < numCircles; j++) {
    let currentRadius = innerRadius + j * radiusStep + radiusStep / 2; // 当前半径
    let numDots = Math.floor(TWO_PI * currentRadius / (dotSize * 3)); // 计算当前半径上可以放置的圆点数
    let angleStep = TWO_PI / numDots; // 每个点之间的角度
    for (let i = 0; i < numDots; i++) {
      let angle = i * angleStep;
      let x = cx + cos(angle) * currentRadius;
      let y = cy + sin(angle) * currentRadius;
      ellipse(x, y, dotSize, dotSize); // 绘制圆点
    }
  }
}

function drawOrangeCircles(circles) {
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    let arcRadius = c.d / 2 + 15; // 弧的半径，可以根据需要调整
    stroke(255, 165, 0); // 橘色
    strokeWeight(2.5);
    noFill();
    ellipse(c.x, c.y, arcRadius * 2, arcRadius * 2); // 绘制完整的圆环
  }
}

function drawPatternOnRing(cx, cy, radius) {
  let numPatterns = 8; // 图案的数量，减少密集度
  let angleStep = TWO_PI / numPatterns; // 每个图案之间的角度

  for (let i = 0; i < numPatterns; i++) {
    let angle = i * angleStep;
    let x = cx + cos(angle) * radius;
    let y = cy + sin(angle) * radius;
    // 绘制红色圆
    fill(200, 0, 0);
    ellipse(x, y, 10, 10);
    // 绘制黄色圆
    let angleOffset = angleStep / 3;
    let xOffset = cx + cos(angle + angleOffset) * radius;
    let yOffset = cy + sin(angle + angleOffset) * radius;
    fill(255, 255, 0);
    ellipse(xOffset, yOffset, 6, 6);
    // 绘制黑色圆环
    let angleOffset2 = angleStep / 3 * 2;
    let xOffset2 = cx + cos(angle + angleOffset2) * radius;
    let yOffset2 = cy + sin(angle + angleOffset2) * radius;
    fill(0);
    ellipse(xOffset2, yOffset2, 21, 21);
    fill(255);
    ellipse(xOffset2, yOffset2, 7, 7);
  }
}

function drawArcThroughCenter(x, y, radius, startAngle) {
  push();
  let baseColor = color(255, 20, 147); // 原始粉色
  let shadowColor = lerpColor(baseColor, color(0), 0.25); // 生成深粉色阴影

  strokeWeight(6); // 设置线条宽度
  noFill(); // 不填充

  // 计算弧线起止点基于 startAngle
  let endX = x + cos(startAngle - PI / 4) * radius * 1.5;
  let endY = y + sin(startAngle - PI / 4) * radius * 1.5;

  // 绘制阴影
  stroke(shadowColor); // 使用深粉色作为阴影色
  drawCurvedLine(x, y + 3, endX, endY + 3);

  // 绘制主弧线
  stroke(baseColor); // 使用原始粉色
  drawCurvedLine(x, y, endX, endY);

  pop(); // 恢复之前保存的绘图设置
}

function drawCurvedLine(x1, y1, x2, y2) {
  // 计算控制点，使得曲线是弧形
  let cx1 = (x1 + x2) / 2 + (y2 - y1) * 0.5;
  let cy1 = (y1 + y2) / 2 - (x2 - x1) * 0.5;

  // 使用贝塞尔曲线绘制弧线
  noFill();
  beginShape();
  vertex(x1, y1);
  quadraticVertex(cx1, cy1, x2, y2);
  endShape();
}

function generateColors() {
  // 随机生成颜色数组，为每个圆指定颜色
  return [
    [random(255), random(255), random(255)],
    [random(255), random(255, 255)],
    [random(255), random(255, 255)]
  ];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  circles = [];
  setup(); // 重新生成圆圈
  redraw();
}