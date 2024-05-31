let clockX, clockY, clockSize;  // Define clock center coordinates and size
let colors = [];                // Array for main clock colors
let altColors = [];             // Array for alternating ring colors
let balls = [];                 // Array for storing ball properties (angle and speed)

let circles = [];
let circleDiameter = 130; // Diameter of the main circle, adjustable
let spacing = 25; // Spacing between circles, adjustable
let offsetX = -20; // Offset to move all circles left, adjustable
let offsetY = -30; // Offset to move all circles up, adjustable
let circleGroupDistanceFactor = 0.65; // Distance factor for concentric circle groups

let specialCircleColor = [255, 255, 0]; // Special circle color, default is yellow
let redLineStrokeWeight = 0.8; // Width of the red line
let redLineSpikes = 130; // Number of spikes on the red line
let goldLineStrokeWeight = 3; // Width of the gold line
let goldLineSpikes = 16; // Number of spikes on the gold line

let rotationAngle = 0;  // Angle for rotation control
let rotationSpeed = 0.05;  // Speed for rotation control

// Initialize variables
let gradientCircles = [];
let gradientSpeed = 0.02;

let coloredCircles = [];
let coloredRadius = []; // Initialize radius for colored circles, adjustable
let coloredSpeed = 0.01;  // Speed for colored circle rotation

function setup() {
  createCanvas(windowWidth, windowHeight);
  clockSize = min(windowWidth, windowHeight) * 0.7;  // Calculate clock size
  clockX = windowWidth / 2;  // Set clock center X coordinate
  clockY = windowHeight / 2; // Set clock center Y coordinate

  // Initialize main clock colors
  for (let i = 0; i < 24; i++) {
    colors.push([random(255), random(255), random(255)]);
  }

  // Initialize alternating ring colors
  for (let i = 0; i < 48; i++) {
    altColors.push([random(255), random(255), random(255)]);
  }

  // Initialize ball positions and speeds
  balls = [
    {radius: clockSize * 0.63 / 2, speed: 0.05, angle: 0},  // Third ring
    {radius: clockSize * 0.49 / 2, speed: 0.1, angle: 0},   // Fifth ring
    {radius: clockSize * 0.35 / 2, speed: 0.15, angle: 0}   // Seventh ring
  ];

  // Initialize outer circle information and add to circles array
  let angleStep = TWO_PI / 12;
  for (let i = 0; i < 12; i++) {
    let angle = i * angleStep;
    let x = clockX + cos(angle) * clockSize * circleGroupDistanceFactor;
    let y = clockY + sin(angle) * clockSize * circleGroupDistanceFactor;
    let angleStart = random(TWO_PI);  // Random start angle
    let hasArc = random() > 0.5;  // 50% chance to have an arc
    let styleType = random(['goldZigzag', 'multiLayeredRings']); // Random style choice
    circles.push({
      x: x,
      y: y,
      d: circleDiameter,
      colors: generateColors(),
      startAngle: angleStart,
      hasArc: hasArc,
      styleType: styleType  // Store style type
    });
  }

  // Randomly select two special concentric circles
  let selectedIndices = [];
  while (selectedIndices.length < 2) {
    let index = floor(random(circles.length));
    if (!selectedIndices.includes(index)) {
      selectedIndices.push(index);
    }
  }

  // Update properties of the two special concentric circles
  for (let i = 0; i < selectedIndices.length; i++) {
    circles[selectedIndices[i]].isSpecial = true;
  }

  // Initialize orange gradient circles
  let gradientColors = [
    color(255, 140, 0),
    color(255, 165, 0),
    color(255, 175, 0),
    color(255, 190, 0),
    color(255, 200, 0),
    color(255, 210, 0),
    color(255, 220, 0),
    color(255, 230, 0),
    color(255, 240, 0),
    color(255, 250, 0)
  ];

  let gradientRadius = (clockSize * 0.16 + clockSize * circleGroupDistanceFactor) / 2; // Adjust radius to move circles outward slightly
  let gradientAngleStep = TWO_PI / gradientColors.length;

  for (let i = 0; i < gradientColors.length; i++) {
    gradientCircles.push({
      color: gradientColors[i],
      angle: i * gradientAngleStep,
      radius: gradientRadius,
    });
  }

  // Calculate the radius for the colored circles to be just outside the largest dark blue circle
  coloredRadius = clockSize * 0.84 / 2 + 25;  // 25 units larger than the outer radius of the largest dark blue circle

  // Initialize 7 colored circles
  let coloredCircleColors = [
    color(255, 0, 0), // Red
    color(255, 165, 0), // Orange
    color(255, 255, 0), // Yellow
    color(0, 255, 0), // Green
    color(0, 255, 255), // Cyan
    color(0, 0, 255), // Blue
    color(128, 0, 128) // Purple
  ];
  let coloredAngleStep = TWO_PI / coloredCircleColors.length;

  for (let i = 0; i < coloredCircleColors.length; i++) {
    coloredCircles.push({
      color: coloredCircleColors[i],
      angle: i * coloredAngleStep,
      radius: coloredRadius,
    });
  }

  loop();  // Enable continuous updating
}

function draw() {
  drawClock();
  rotationAngle += rotationSpeed; // Update rotation angle
}

function drawClock() {
  background(255);  // Set background color to white
  drawMainCircles();
  drawMovingBalls();
  drawRandomColoredCircles();
  drawGradientCircles(); // Draw gradient circles
  drawColoredCircles(); // Draw colored circles
  drawClockHands();  // Draw clock hands
  drawGlassCover();  // Draw glass cover
}

function drawMainCircles() {
  noStroke();
  fill(0, 68, 116);
  ellipse(clockX, clockY, clockSize * 0.84);  // 0th circle
  fill(239, 248, 254);
  ellipse(clockX, clockY, clockSize * 0.77);  // 1st circle
  fill(0, 68, 116);
  ellipse(clockX, clockY, clockSize * 0.7);  // 2nd circle
  fill(239, 248, 254);
  ellipse(clockX, clockY, clockSize * 0.63);  // 3rd circle
  fill(0, 68, 116);
  ellipse(clockX, clockY, clockSize * 0.56);  // 4th circle
  fill(239, 248, 254);
  ellipse(clockX, clockY, clockSize * 0.49);  // 5th circle
  fill(0, 68, 116);
  ellipse(clockX, clockY, clockSize * 0.42);  // 6th circle
  fill(239, 248, 254);
  ellipse(clockX, clockY, clockSize * 0.35);  // 7th circle
  fill(0, 68, 116);
  ellipse(clockX, clockY, clockSize * 0.28);  // 8th circle
  fill(239, 248, 254);
  ellipse(clockX, clockY, clockSize * 0.21);  // 9th circle
  fill(247, 65, 151);
  ellipse(clockX, clockY, clockSize * 0.2);   // 10th circle
  fill(77, 200, 252);
  ellipse(clockX, clockY, clockSize * 0.19);  // 11th circle
  fill(247, 65, 151);
  ellipse(clockX, clockY, clockSize * 0.18);  // 12th circle
  fill(77, 200, 252);
  ellipse(clockX, clockY, clockSize * 0.17);  // 13th circle
  fill(255);
  ellipse(clockX, clockY, clockSize * 0.15);  // 14th circle
  fill(235, 92, 32);
  ellipse(clockX, clockY, clockSize * 0.145); // 15th circle
  fill(255);
  ellipse(clockX, clockY, clockSize * 0.14);  // 16th circle
  fill(235, 92, 32);
  ellipse(clockX, clockY, clockSize * 0.135); // 17th circle
  fill(255);
  ellipse(clockX, clockY, clockSize * 0.13);  // 18th circle
  fill(204, 93, 32);
  ellipse(clockX, clockY, clockSize * 0.05);  // 19th circle
}

function drawMovingBalls() {
  drawingContext.shadowOffsetX = 2;
  drawingContext.shadowOffsetY = 2;
  drawingContext.shadowBlur = 4;
  drawingContext.shadowColor = 'rgba(0, 0, 0, 0.5)';
  fill(0);  // Set ball color to black

  balls.forEach(ball => {
    let x = clockX + cos(ball.angle) * ball.radius;
    let y = clockY + sin(ball.angle) * ball.radius;
    ellipse(x, y, clockSize * 0.025);  // Ball diameter halved
    ball.angle += ball.speed;  // Update ball angle for clockwise movement
  });
}

function drawRandomColoredCircles() {
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    let radii = [c.d, c.d * 0.55, c.d * 0.5, c.d * 0.25, c.d * 0.15, c.d * 0.1, c.d * 0.05]; // Sizes of main circle and inner circles

    push();  // Save current drawing state
    translate(c.x, c.y);  // Move origin to circle center
    rotate(rotationAngle);  // Rotate coordinate system

    if (c.isSpecial) {
      drawSpecialCirclePattern(0, 0, radii, c.colors, c.styleType);
    } else {
      drawCirclePattern(0, 0, radii, c.colors, c.styleType);
    }

    pop();  // Restore previous drawing state
  }

  // Draw orange rings
  drawOrangeCircles(circles);

  // Draw patterns on orange rings
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    drawPatternOnRing(c.x, c.y, c.d / 2 + 15);
  }

  // Draw pink arcs last to ensure they are on top
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    if (c.hasArc) {  // Check if arc is needed
      drawArcThroughCenter(c.x, c.y, c.d / 2, c.startAngle);
    }
  }

  // Draw red lines in special circles
  drawRedLinesInSpecialCircles();
}

function drawCirclePattern(x, y, radii, colors, styleType) {
  let numRings = radii.length; // Number of concentric circles
  for (let i = 0; i < numRings; i++) {
    fill(colors[i % colors.length]); // Set fill color
    ellipse(x, y, radii[i], radii[i]); // Draw circle
    if (i == 0) { // Only draw white dots between largest and second largest circles
      fillDotsOnCircle(x, y, radii[0] / 2, radii[1] / 2); // Fill dots in entire circle
    }
    if (i == 2 && i + 1 < numRings) { // Draw based on style between third and fourth largest circles
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
  fill(specialCircleColor); // Set largest circle to special color
  ellipse(x, y, radii[0], radii[0]); // Draw largest circle

  // Draw other circles, skip white dot drawing
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
  stroke(255, 0, 0); // Red color
  strokeWeight(redLineStrokeWeight); // Set line width
  noFill(); // No fill

  let numSpikes = redLineSpikes; // Number of spikes
  let angleStep = TWO_PI / numSpikes; // Angle between spikes

  beginShape();
  for (let i = 0; i < numSpikes; i++) {
    // Calculate outer point positions (between first and second largest circles)
    let angle = i * angleStep;
    let outerX = cx + cos(angle) * outerRadius;
    let outerY = cy + sin(angle) * outerRadius;
    vertex(outerX, outerY); // Add outer points

    // Calculate inner point positions (retract inward to form spikes)
    let innerAngle = angle + angleStep / 2;
    let innerRadiusAdjust = innerRadius + (outerRadius - innerRadius) * 0.3;
    let innerX = cx + cos(innerAngle) * innerRadiusAdjust;
    let innerY = cy + sin(innerAngle) * innerRadiusAdjust;
    vertex(innerX, innerY); // Add inner points
  }
  endShape(CLOSE);

  pop(); // Restore previous drawing state
}

function drawGoldZShape(cx, cy, thirdRadius, fourthRadius) {
  push();
  stroke(212, 175, 55); // Set stroke color to gold
  strokeWeight(goldLineStrokeWeight); // Set line width
  noFill(); // No fill

  let numSpikes = goldLineSpikes; // Number of spikes
  let angleStep = TWO_PI / numSpikes; // Angle between spikes

  beginShape();
  for (let i = 0; i < numSpikes; i++) {
    // Calculate outer point positions (outer ring of third circle)
    let angle = i * angleStep;
    let outerX = cx + cos(angle) * thirdRadius;
    let outerY = cy + sin(angle) * thirdRadius;
    vertex(outerX, outerY); // Add outer points

    // Calculate inner point positions (inner ring of fourth circle), slightly retracted to form spikes
    let innerAngle = angle + angleStep / 2;
    let innerRadiusAdjust = fourthRadius + (thirdRadius - fourthRadius) * 0.3;
    let innerX = cx + cos(innerAngle) * innerRadiusAdjust;
    let innerY = cy + sin(innerAngle) * innerRadiusAdjust;
    vertex(innerX, innerY); // Add inner points
  }
  endShape(CLOSE);

  pop(); // Restore previous drawing state
}

function drawMultiLayeredRings(cx, cy, thirdRadius, fourthRadius) {
  push();
  let colors = [
    color(255, 0, 121),  // Pink
    color(0, 179, 255)   // Blue
  ];
  strokeWeight(3);
  noFill();
  let numRings = 5; // Number of rings
  let radiusStep = (thirdRadius - fourthRadius) / numRings; // Radius step

  for (let j = 0; j < numRings; j++) {
    stroke(colors[j % colors.length]); // Set stroke color
    ellipse(cx, cy, thirdRadius * 2 - j * radiusStep, thirdRadius * 2 - j * radiusStep);
  }

  pop(); // Restore previous drawing state
}

function drawGreenLayeredRings(cx, cy, fourthRadius, fifthRadius) {
  push();
  let colors = [
    color(255, 255, 255),  // White
    color(68, 106, 55)     // Light green
  ];
  strokeWeight(3);
  noFill();
  let numRings = 4; // Number of rings
  let radiusStep = (fourthRadius - fifthRadius) / numRings; // Radius step

  for (let j = 0; j < numRings; j++) {
    stroke(colors[j % colors.length]); // Set stroke color
    ellipse(cx, cy, fourthRadius * 2 - j * radiusStep, fourthRadius * 2 - j * radiusStep);
  }

  pop(); // Restore previous drawing state
}

function fillDotsOnCircle(cx, cy, outerRadius, innerRadius) {
  fill(255); // Set fill color to white
  let numCircles = 6; // Total of 6 rings
  let dotSize = 3.5; // Dot diameter, adjustable
  let radiusStep = (outerRadius - innerRadius) / numCircles; // Distance between rings

  for (let j = 0; j < numCircles; j++) {
    let currentRadius = innerRadius + j * radiusStep + radiusStep / 2; // Current radius
    let numDots = Math.floor(TWO_PI * currentRadius / (dotSize * 3)); // Calculate number of dots per radius
    let angleStep = TWO_PI / numDots; // Angle between dots
    for (let i = 0; i < numDots; i++) {
      let angle = i * angleStep;
      let x = cx + cos(angle) * currentRadius;
      let y = cy + sin(angle) * currentRadius;
      ellipse(x, y, dotSize, dotSize); // Draw dot
    }
  }
}

function drawOrangeCircles(circles) {
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    let arcRadius = c.d / 2 + 15; // Radius for the arc, adjustable
    stroke(255, 165, 0); // Orange
    strokeWeight(2.5);
    noFill();
    ellipse(c.x, c.y, arcRadius * 2, arcRadius * 2); // Draw full ring
  }
}

function drawPatternOnRing(cx, cy, radius) {
  let numPatterns = 8; // Number of patterns, reduce density
  let angleStep = TWO_PI / numPatterns; // Angle between patterns

  for (let i = 0; i < numPatterns; i++) {
    let angle = i * angleStep;
    let x = cx + cos(angle) * radius;
    let y = cy + sin(angle) * radius;
    // Draw red circle
    fill(200, 0, 0);
    ellipse(x, y, 10, 10);
    // Draw yellow circle
    let angleOffset = angleStep / 3;
    let xOffset = cx + cos(angle + angleOffset) * radius;
    let yOffset = cy + sin(angle + angleOffset) * radius;
    fill(255, 255, 0);
    ellipse(xOffset, yOffset, 6, 6);
    // Draw black ring
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
  let baseColor = color(255, 20, 147); // Original pink
  let shadowColor = lerpColor(baseColor, color(0), 0.25); // Generate dark pink shadow

  strokeWeight(6); // Set line width
  noFill(); // No fill

  // Calculate arc start and end points based on startAngle
  let endX = x + cos(startAngle - PI / 4) * radius * 1.5;
  let endY = y + sin(startAngle - PI / 4) * radius * 1.5;

  // Draw shadow
  stroke(shadowColor); // Use dark pink for shadow
  drawCurvedLine(x, y + 3, endX, endY + 3);

  // Draw main arc  stroke(baseColor); // Use original pink
  drawCurvedLine(x, y, endX, endY);

  pop(); // Restore previous drawing state
}

function drawCurvedLine(x1, y1, x2, y2) {
  // Calculate control points to make the curve arc-shaped
  let cx1 = (x1 + x2) / 2 + (y2 - y1) * 0.5;
  let cy1 = (y1 + y2) / 2 - (x2 - x1) * 0.5;

  // Draw the arc using a bezier curve
  noFill();
  beginShape();
  vertex(x1, y1);
  quadraticVertex(cx1, cy1, x2, y2);
  endShape();
}

function generateColors() {
  // Randomly generate color arrays for each circle
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

  // Update ball radius to fit new size
  balls.forEach(ball => {
    ball.radius = clockSize * (ball.speed * 63 - 0.315);  // Update radius based on speed
  });

  circles = [];
  setup(); // Re-generate circles
  drawClock();
}

function randomizeColors() {
  // Re-generate colors for all circles
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

// Draw clock hands
function drawClockHands() {
  let now = new Date();

  let seconds = now.getSeconds();
  let minutes = now.getMinutes();
  let hours = now.getHours() % 12;

  drawHand(clockX, clockY, clockSize * 0.63, seconds / 60 * TWO_PI - HALF_PI, color(255), 4); // Second hand
  drawHandWithBall(clockX, clockY, clockSize * 0.42, minutes / 60 * TWO_PI - HALF_PI, color(0, 255, 255), 8, 16); // Minute hand
  drawHandWithBall(clockX, clockY, clockSize * 0.21, hours / 12 * TWO_PI - HALF_PI, color(0, 0, 255), 12, 24); // Hour hand
}

function drawHand(cx, cy, length, angle, col, weight) {
  stroke(col);
  strokeWeight(weight);
  line(cx, cy, cx + cos(angle) * length, cy + sin(angle) * length);
}

function drawHandWithBall(cx, cy, length, angle, col, weight, ballSize) {
  stroke(col);
  strokeWeight(weight);
  line(cx, cy, cx + cos(angle) * length, cy + sin(angle) * length);

  // Draw small circle at the end of the hand
  fill(255, 160, 0); // Set fill color to gold
  stroke(col);  // Keep original stroke color
  strokeWeight(5);  // Set stroke width, adjustable
  ellipse(cx + cos(angle) * length, cy + sin(angle) * length, ballSize, ballSize); // Adjust ball position and size
}

// Draw glass cover
function drawGlassCover() {
  push();
  fill(255, 255, 255, 10); // Semi-transparent white, 10% opacity
  stroke(200); // Gray border
  strokeWeight(2); // Border width
  ellipse(clockX, clockY, clockSize * 1.3, clockSize * 1.3); // Draw glass cover

  // Draw gold circle
  noFill();  // No fill
  stroke(255, 160, 0); // Set stroke color to gold
  strokeWeight(3); // Line width
  ellipse(clockX, clockY, clockSize * 1.27, clockSize * 1.27); // Draw gold circle just inside the glass cover

  pop();
}

// Draw orange gradient circles
function drawGradientCircles() {
  gradientCircles.forEach(circle => {
    let x = clockX + cos(circle.angle) * circle.radius;
    let y = clockY + sin(circle.angle) * circle.radius;
    fill(circle.color);
    noStroke();
    ellipse(x, y, 10, 10); // Small circle diameter
    circle.angle += gradientSpeed; // Update angle for clockwise movement
  });
}

// Draw colored circles
function drawColoredCircles() {
  let baseAngle = rotationAngle; // Rotate colored circles as a group
  let circleDiameter = 20; // Diameter of small circles

  coloredCircles.forEach((circle, index) => {
    let angle = baseAngle + index * (circleDiameter / coloredRadius); // Position of each small circle
    let x = clockX + cos(angle) * circle.radius;
    let y = clockY + sin(angle) * circle.radius;
    fill(circle.color);
    noStroke();
    ellipse(x, y, circleDiameter, circleDiameter); // Draw small circle
  });

  baseAngle += coloredSpeed; // Update base angle for clockwise rotation of colored circles
}

 
