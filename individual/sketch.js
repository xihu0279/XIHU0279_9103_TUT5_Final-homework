let clockX, clockY, clockSize;
let colors = [];
let altColors = [];
let balls = [];

let circles = [];
let circleDiameter = 130;
let spacing = 25;
let offsetX = -20;
let offsetY = -30;
let circleGroupDistanceFactor = 0.65;

let specialCircleColor = [255, 255, 0];
let redLineStrokeWeight = 0.8;
let redLineSpikes = 130;
let goldLineStrokeWeight = 3;
let goldLineSpikes = 16;

let counter = 0;
const TWO_PI = 2 * Math.PI;
let angleOffset = -Math.PI / 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  clockSize = min(windowWidth, windowHeight) * 0.7;
  clockX = windowWidth / 2;
  clockY = windowHeight / 2;

  for (let i = 0; i < 24; i++) {
    colors.push([random(255), random(255), random(255)]);
  }

  for (let i = 0; i < 48; i++) {
    altColors.push([random(255), random(255), random(255)]);
  }

  balls = [
    {radius: clockSize * 0.63 / 2, speed: 0.05, angle: 0},
    {radius: clockSize * 0.49 / 2, speed: 0.1, angle: 0},
    {radius: clockSize * 0.35 / 2, speed: 0.15, angle: 0}
  ];

  let angleStep = TWO_PI / 12;
  for (let i = 0; i < 12; i++) {
    let angle = i * angleStep;
    let x = clockX + cos(angle) * clockSize * circleGroupDistanceFactor;
    let y = clockY + sin(angle) * clockSize * circleGroupDistanceFactor;
    let angleStart = random(TWO_PI);
    let hasArc = random() > 0.5;
    let styleType = random(['goldZigzag', 'multiLayeredRings']);
    circles.push({
      x: x,
      y: y,
      d: circleDiameter,
      colors: generateColors(),
      startAngle: angleStart,
      hasArc: hasArc,
      styleType: styleType
    });
  }

  let selectedIndices = [];
  while (selectedIndices.length < 2) {
    let index = floor(random(circles.length));
    if (!selectedIndices.includes(index)) {
      selectedIndices.push(index);
    }
  }

  for (let i = 0; i < selectedIndices.length; i++) {
    circles[selectedIndices[i]].isSpecial = true;
  }

  loop();
}

function draw() {
  drawClock();
}

function drawClock() {
  background(255);
  drawMainCircles();
  drawMovingBalls();
  drawRandomColoredCircles();
  drawClockHands();
}

function drawMainCircles() {
  noStroke();
  fill(0, 68, 116);
  ellipse(clockX, clockY, clockSize * 0.84);
  fill(239, 248, 254);
  ellipse(clockX, clockY, clockSize * 0.77);
  fill(0, 68, 116);
  ellipse(clockX, clockY, clockSize * 0.7);
  fill(239, 248, 254);
  ellipse(clockX, clockY, clockSize * 0.63);
  fill(0, 68, 116);
  ellipse(clockX, clockY, clockSize * 0.56);
  fill(239, 248, 254);
  ellipse(clockX, clockY, clockSize * 0.49);
  fill(0, 68, 116);
  ellipse(clockX, clockY, clockSize * 0.42);
  fill(239, 248, 254);
  ellipse(clockX, clockY, clockSize * 0.35);
  fill(0, 68, 116);
  ellipse(clockX, clockY, clockSize * 0.28);
  fill(239, 248, 254);
  ellipse(clockX, clockY, clockSize * 0.21);
  fill(247, 65, 151);
  ellipse(clockX, clockY, clockSize * 0.2);
  fill(77, 200, 252);
  ellipse(clockX, clockY, clockSize * 0.19);
  fill(247, 65, 151);
  ellipse(clockX, clockY, clockSize * 0.18);
  fill(77, 200, 252);
  ellipse(clockX, clockY, clockSize * 0.17);
  fill(255);
  ellipse(clockX, clockY, clockSize * 0.15);
  fill(235, 92, 32);
  ellipse(clockX, clockY, clockSize * 0.145);
  fill(255);
  ellipse(clockX, clockY, clockSize * 0.14);
  fill(235, 92, 32);
  ellipse(clockX, clockY, clockSize * 0.135);
  fill(255);
  ellipse(clockX, clockY, clockSize * 0.13);
  fill(255);
  ellipse(clockX, clockY, clockSize * 0.05);
}

function drawMovingBalls() {
  drawingContext.shadowOffsetX = 2;
  drawingContext.shadowOffsetY = 2;
  drawingContext.shadowBlur = 4;
  drawingContext.shadowColor = 'rgba(0, 0, 0, 0.5)';
  fill(0);

  balls.forEach(ball => {
    let x = clockX + cos(ball.angle) * ball.radius;
    let y = clockY + sin(ball.angle) * ball.radius;
    ellipse(x, y, clockSize * 0.025);
    ball.angle += ball.speed;
  });
}

function drawRandomColoredCircles() {
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    let radii = [c.d, c.d * 0.55, c.d * 0.5, c.d * 0.25, c.d * 0.15, c.d * 0.1, c.d * 0.05];

    if (c.isSpecial) {
      drawSpecialCirclePattern(c.x, c.y, radii, c.colors, c.styleType);
    } else {
      drawCirclePattern(c.x, c.y, radii, c.colors, c.styleType);
    }
  }

  drawOrangeCircles(circles);

  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    drawPatternOnRing(c.x, c.y, c.d / 2 + 15);
  }

  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    if (c.hasArc) {
      drawArcThroughCenter(c.x, c.y, c.d / 2, c.startAngle);
    }
  }

  drawRedLinesInSpecialCircles();
}

function drawCirclePattern(x, y, radii, colors, styleType) {
  let numRings = radii.length;
  for (let i = 0; i < numRings; i++) {
    fill(colors[i % colors.length]);
    ellipse(x, y, radii[i], radii[i]);
    if (i == 0) {
      fillDotsOnCircle(x, y, radii[0] / 2, radii[1] / 2);
    }
    if (i == 2 && i + 1 < numRings) {
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
  fill(specialCircleColor);
  ellipse(x, y, radii[0], radii[0]);

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
  stroke(255, 0, 0);
  strokeWeight(redLineStrokeWeight);
  noFill();

  let numSpikes = redLineSpikes;
  let angleStep = TWO_PI / numSpikes;

  beginShape();
  for (let i = 0; i < numSpikes; i++) {
    let angle = i * angleStep;
    let outerX = cx + cos(angle) * outerRadius;
    let outerY = cy + sin(angle) * outerRadius;
    vertex(outerX, outerY);

    let innerAngle = angle + angleStep / 2;
    let innerRadiusAdjust = innerRadius + (outerRadius - innerRadius) * 0.3;
    let innerX = cx + cos(innerAngle) * innerRadiusAdjust;
    let innerY = cy + sin(innerAngle) * innerRadiusAdjust;
    vertex(innerX, innerY);
  }
  endShape(CLOSE);

  pop();
}

function drawGoldZShape(cx, cy, thirdRadius, fourthRadius) {
  push();
  stroke(212, 175, 55);
  strokeWeight(goldLineStrokeWeight);
  noFill();

  let numSpikes = goldLineSpikes;
  let angleStep = TWO_PI / numSpikes;

  beginShape();
  for (let i = 0; i < numSpikes; i++) {
    let angle = i * angleStep;
    let outerX = cx + cos(angle) * thirdRadius;
    let outerY = cy + sin(angle) * thirdRadius;
    vertex(outerX, outerY);

    let innerAngle = angle + angleStep / 2;
    let innerRadiusAdjust = fourthRadius + (thirdRadius - fourthRadius) * 0.3;
    let innerX = cx + cos(innerAngle) * innerRadiusAdjust;
    let innerY = cy + sin(innerAngle) * innerRadiusAdjust;
    vertex(innerX, innerY);
  }
  endShape(CLOSE);

  pop();
}

function drawMultiLayeredRings(cx, cy, thirdRadius, fourthRadius) {
  push();
  let colors = [
    color(255, 0, 121),
    color(0, 179, 255)
  ];
  strokeWeight(3);
  noFill();
  let numRings = 5;
  let radiusStep = (thirdRadius - fourthRadius) / numRings;

  for (let j = 0; j < numRings; j++) {
    stroke(colors[j % colors.length]);
    ellipse(cx, cy, thirdRadius * 2 - j * radiusStep, thirdRadius * 2 - j * radiusStep);
  }

  pop();
}

function drawGreenLayeredRings(cx, cy, fourthRadius, fifthRadius) {
  push();
  let colors = [
    color(255, 255, 255),
    color(68, 106, 55)
  ];
  strokeWeight(3);
  noFill();
  let numRings = 4;
  let radiusStep = (fourthRadius - fifthRadius) / numRings;

  for (let j = 0; j < numRings; j++) {
    stroke(colors[j % colors.length]);
    ellipse(cx, cy, fourthRadius * 2 - j * radiusStep, fourthRadius * 2 - j * radiusStep);
  }

  pop();
}

function fillDotsOnCircle(cx, cy, outerRadius, innerRadius) {
  fill(255);
  let numCircles = 6;
  let dotSize = 3.5;
  let radiusStep = (outerRadius - innerRadius) / numCircles;

  for (let j = 0; j < numCircles; j++) {
    let currentRadius = innerRadius + j * radiusStep + radiusStep / 2;
    let numDots = Math.floor(TWO_PI * currentRadius / (dotSize * 3));
    let angleStep = TWO_PI / numDots;
    for (let i = 0; i < numDots; i++) {
      let angle = i * angleStep;
      let x = cx + cos(angle) * currentRadius;
      let y = cy + sin(angle) * currentRadius;
      ellipse(x, y, dotSize, dotSize);
    }
  }
}

function drawOrangeCircles(circles) {
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    let arcRadius = c.d / 2 + 15;
    stroke(255, 165, 0);
    strokeWeight(2.5);
    noFill();
    ellipse(c.x, c.y, arcRadius * 2, arcRadius * 2);
  }
}

function drawPatternOnRing(cx, cy, radius) {
  let numPatterns = 8;
  let angleStep = TWO_PI / numPatterns;

  for (let i = 0; i < numPatterns; i++) {
    let angle = i * angleStep;
    let x = cx + cos(angle) * radius;
    let y = cy + sin(angle) * radius;
    fill(200, 0, 0);
    ellipse(x, y, 10, 10);
    let angleOffset = angleStep / 3;
    let xOffset = cx + cos(angle + angleOffset) * radius;
    let yOffset = cy + sin(angle + angleOffset) * radius;
    fill(255, 255, 0);
    ellipse(xOffset, yOffset, 6, 6);
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
  let baseColor = color(255, 20, 147);
  let shadowColor = lerpColor(baseColor, color(0), 0.25);

  strokeWeight(6);
  noFill();

  let endX = x + cos(startAngle - PI / 4) * radius * 1.5;
  let endY = y + sin(startAngle - PI / 4) * radius * 1.5;

  stroke(shadowColor);
  drawCurvedLine(x, y + 3, endX, endY + 3);

  stroke(baseColor);
  drawCurvedLine(x, y, endX, endY);

  pop();
}

function drawCurvedLine(x1, y1, x2, y2) {
  let cx1 = (x1 + x2) / 2 + (y2 - y1) * 0.5;
  let cy1 = (y1 + y2) / 2 - (x2 - x1) * 0.5;

  noFill();
  beginShape();
  vertex(x1, y1);
  quadraticVertex(cx1, cy1, x2, y2);
  endShape();
}

function generateColors() {
  return [
    [random(255), random(255), random(255)],
    [random(255), random(255, 255)],
    [random(255), random(255, 255)]
  ];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  clockSize = min(windowWidth, windowHeight) * 0.8;
  clockX = windowWidth / 2;
  clockY = windowHeight / 2;

  balls.forEach(ball => {
    ball.radius = clockSize * (ball.speed * 63 - 0.315);
  });

  circles = [];
  setup();
  drawClock();
}

function randomizeColors() {
  for (let i = 0; i < 24; i++) {
    colors[i] = [random(255), random(255, random(255))];
  }
  for (let i = 0; i < 48; i++) {
    altColors[i] = [random(255), random(255, random(255))];
  }
}

function mousePressed() {
  randomizeColors();
  drawClock();
}

function drawClockHands() {
  drawHand(7, 255, 255, 255, TWO_PI / 12, clockSize * 1.2);
  drawHand(5, 0, 255, 255, TWO_PI / 24, clockSize * 1.2);
  drawHand(3, 0, 0, 255, TWO_PI / 6, clockSize * 1.2);
}

function drawHand(strokeWeightVal, r, g, b, angleStep, length) {
  let angle = angleOffset + angleStep * counter;
  let x1 = clockX + cos(angle) * length * 0.2;
  let y1 = clockY + sin(angle) * length * 0.2;
  let x2 = clockX + cos(angle) * length;
  let y2 = clockY + sin(angle) * length;

  stroke(r, g, b);
  strokeWeight(strokeWeightVal);
  line(x1, y1, x2, y2);
}

function drawHand(strokeWeightVal, r, g, b, angleStep, length) {
  let angle = angleOffset + angleStep * counter;
  let x1 = clockX + cos(angle) * length * 0.2;
  let y1 = clockY + sin(angle) * length * 0.2;
  let x2 = clockX + cos(angle) * length;
  let y2 = clockY + sin(angle) * length;

  stroke(r, g, b);
  strokeWeight(strokeWeightVal);
  line(x1, y1, x2, y2);
}

function autoClock() {
  counter++;
  drawClock();
}
setInterval(autoClock, 1000);
