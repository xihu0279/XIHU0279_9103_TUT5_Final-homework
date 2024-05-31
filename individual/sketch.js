
 //Class representing a Clock with various interactive elements.
 
class Clock {
  constructor() {
    this.clockX = 0;
    this.clockY = 0;
    this.clockSize = 0;
    this.colors = [];
    this.altColors = [];
    this.balls = [];
    this.circles = [];
    this.gradientCircles = [];
    this.coloredCircles = [];
    this.coloredRadius = 0;
    this.rotationAngle = 0;
    this.rotationSpeed = 0.05;
    this.gradientSpeed = 0.02;
    this.coloredSpeed = 0.01;
  }

  // Initializes the clock properties and elements.
  init() {
    this.clockSize = min(windowWidth, windowHeight) * 0.7;
    this.clockX = windowWidth / 2;
    this.clockY = windowHeight / 2;

    // Generates random colors for the clock elements.
    this.generateRandomColors();

    // Creates the moving balls for the clock.
    this.createBalls();

    // Creates the main circles for the clock.
    this.createCircles();

    // Creates the gradient circles for the clock.
    this.createGradientCircles();

    // Creates the colored circles for the clock.
    this.createColoredCircles();
  }

  // Generates random colors for the clock elements.
  generateRandomColors() {
    for (let i = 0; i < 24; i++) {
      this.colors.push([random(255), random(255), random(255)]);
    }
    for (let i = 0; i < 48; i++) {
      this.altColors.push([random(255), random(255), random(255)]);
    }
  }

  // Creates the moving balls for the clock.
  createBalls() {
    this.balls = [
      new Ball(this.clockX, this.clockY, this.clockSize * 0.63 / 2, 0.05),
      new Ball(this.clockX, this.clockY, this.clockSize * 0.49 / 2, 0.1),
      new Ball(this.clockX, this.clockY, this.clockSize * 0.35 / 2, 0.15)
    ];
  }

  // Creates the main circles for the clock.
  createCircles() {
    this.circles = [];
    let angleStep = TWO_PI / 12;
    for (let i = 0; i < 12; i++) {
      let angle = i * angleStep;
      let x = this.clockX + cos(angle) * this.clockSize * 0.65;
      let y = this.clockY + sin(angle) * this.clockSize * 0.65;
      this.circles.push(new Circle(x, y, 130, this.generateColors(), random(TWO_PI), random() > 0.5, random(['goldZigzag', 'multiLayeredRings'])));
    }

    // Selects special circles.
    this.selectSpecialCircles();
  }

  // Selects special circles.
  selectSpecialCircles() {
    let selectedIndices = [];
    while (selectedIndices.length < 2) {
      let index = floor(random(this.circles.length));
      if (!selectedIndices.includes(index)) {
        selectedIndices.push(index);
      }
    }

    for (let i = 0; i < selectedIndices.length; i++) {
      this.circles[selectedIndices[i]].isSpecial = true;
    }
  }

  // Creates the gradient circles for the clock.
  createGradientCircles() {
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

    let gradientRadius = (this.clockSize * 0.16 + this.clockSize * 0.65) / 2;
    let gradientAngleStep = TWO_PI / gradientColors.length;

    for (let i = 0; i < gradientColors.length; i++) {
      this.gradientCircles.push({
        color: gradientColors[i],
        angle: i * gradientAngleStep,
        radius: gradientRadius
      });
    }
  }

  // Creates the colored circles for the clock.
  createColoredCircles() {
    this.coloredRadius = this.clockSize * 0.84 / 2 + 25;

    let coloredCircleColors = [
      color(255, 0, 0),
      color(255, 165, 0),
      color(255, 255, 0),
      color(0, 255, 0),
      color(0, 255, 255),
      color(0, 0, 255),
      color(128, 0, 128)
    ];
    let coloredAngleStep = TWO_PI / coloredCircleColors.length;

    for (let i = 0; i < coloredCircleColors.length; i++) {
      this.coloredCircles.push({
        color: coloredCircleColors[i],
        angle: i * coloredAngleStep,
        radius: this.coloredRadius
      });
    }
  }

  // Draws the entire clock.
  draw() {
    this.drawClock();
    this.rotationAngle += this.rotationSpeed;
  }

  // Draws the main clock elements.
  drawClock() {
    background(255);
    this.drawMainCircles();
    this.drawMovingBalls();
    this.drawRandomColoredCircles();
    this.drawGradientCircles();
    this.drawColoredCircles();
    this.drawClockHands();
    this.drawGlassCover();
  }

  // Draws the main circles of the clock.
  drawMainCircles() {
    noStroke();
    fill(0, 68, 116);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.84);
    fill(239, 248, 254);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.77);
    fill(0, 68, 116);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.7);
    fill(239, 248, 254);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.63);
    fill(0, 68, 116);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.56);
    fill(239, 248, 254);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.49);
    fill(0, 68, 116);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.42);
    fill(239, 248, 254);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.35);
    fill(0, 68, 116);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.28);
    fill(239, 248, 254);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.21);
    fill(247, 65, 151);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.2);
    fill(77, 200, 252);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.19);
    fill(247, 65, 151);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.18);
    fill(77, 200, 252);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.17);
    fill(255);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.15);
    fill(235, 92, 32);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.145);
    fill(255);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.14);
    fill(235, 92, 32);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.135);
    fill(255);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.13);
    fill(204, 93, 32);
    ellipse(this.clockX, this.clockY, this.clockSize * 0.05);
  }

  // Draws the moving balls in the clock.
  drawMovingBalls() {
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 4;
    drawingContext.shadowColor = 'rgba(0, 0, 0, 0.5)';
    fill(0);

    this.balls.forEach(ball => {
      ball.draw();
    });
  }

  // Draws the random colored circles in the clock.
  drawRandomColoredCircles() {
    this.circles.forEach(c => {
      c.draw(this.rotationAngle);
    });

    this.drawOrangeCircles(this.circles);

    this.circles.forEach(c => {
      this.drawPatternOnRing(c.x, c.y, c.d / 2 + 15);
    });

    this.circles.forEach(c => {
      if (c.hasArc) {
        this.drawArcThroughCenter(c.x, c.y, c.d / 2, c.startAngle);
      }
    });

    this.drawRedLinesInSpecialCircles();
  }

  // Draws the gradient circles in the clock.
  drawGradientCircles() {
    this.gradientCircles.forEach(circle => {
      let x = this.clockX + cos(circle.angle) * circle.radius;
      let y = this.clockY + sin(circle.angle) * circle.radius;
      fill(circle.color);
      noStroke();
      ellipse(x, y, 10, 10);
      circle.angle += this.gradientSpeed;
    });
  }

  // Draws the colored circles in the clock.
  drawColoredCircles() {
    let baseAngle = this.rotationAngle;
    let circleDiameter = 20;

    this.coloredCircles.forEach((circle, index) => {
      let angle = baseAngle + index * (circleDiameter / this.coloredRadius);
      let x = this.clockX + cos(angle) * circle.radius;
      let y = this.clockY + sin(angle) * circle.radius;
      fill(circle.color);
      noStroke();
      ellipse(x, y, circleDiameter, circleDiameter);
    });

    this.rotationAngle += this.coloredSpeed;
  }

  // Draws the clock hands.
  drawClockHands() {
    let now = new Date();

    let seconds = now.getSeconds();
    let minutes = now.getMinutes();
    let hours = now.getHours() % 12;

    this.drawHand(this.clockX, this.clockY, this.clockSize * 0.63, seconds / 60 * TWO_PI - HALF_PI, color(255), 4);
    this.drawHandWithBall(this.clockX, this.clockY, this.clockSize * 0.42, minutes / 60 * TWO_PI - HALF_PI, color(0, 255, 255), 8, 16);
    this.drawHandWithBall(this.clockX, this.clockY, this.clockSize * 0.21, hours / 12 * TWO_PI - HALF_PI, color(0, 0, 255), 12, 24);
  }

  // Draws a clock hand.
  drawHand(cx, cy, length, angle, col, weight) {
    stroke(col);
    strokeWeight(weight);
    line(cx, cy, cx + cos(angle) * length, cy + sin(angle) * length);
  }

  // Draws a clock hand with a ball at the end.
  drawHandWithBall(cx, cy, length, angle, col, weight, ballSize) {
    stroke(col);
    strokeWeight(weight);
    line(cx, cy, cx + cos(angle) * length, cy + sin(angle) * length);

    fill(255, 160, 0);
    stroke(col);
    strokeWeight(5);
    ellipse(cx + cos(angle) * length, cy + sin(angle) * length, ballSize, ballSize);
  }

  // Draws a glass cover over the clock.
  drawGlassCover() {
    push();
    fill(255, 255, 255, 10);
    stroke(200);
    strokeWeight(2);
    ellipse(this.clockX, this.clockY, this.clockSize * 1.3, this.clockSize * 1.3);

    noFill();
    stroke(255, 160, 0);
    strokeWeight(3);
    ellipse(this.clockX, this.clockY, this.clockSize * 1.27, this.clockSize * 1.27);

    pop();
  }

  // Draws red lines in special circles.
  drawRedLinesInSpecialCircles() {
    let specialCircles = this.circles.filter(c => c.isSpecial);
    specialCircles.forEach(c => {
      this.drawRedLine(c.x, c.y, c.d / 2, c.d * 0.55 / 2);
    });
  }

  // Draws a red line within a circle.
  drawRedLine(cx, cy, outerRadius, innerRadius) {
    push();
    stroke(255, 0, 0);
    strokeWeight(0.8);
    noFill();

    let numSpikes = 130;
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

  // Draws an arc through the center of a circle.
  drawArcThroughCenter(x, y, radius, startAngle) {
    push();
    let baseColor = color(255, 20, 147);
    let shadowColor = lerpColor(baseColor, color(0), 0.25);

    strokeWeight(6);
    noFill();

    let endX = x + cos(startAngle - PI / 4) * radius * 1.5;
    let endY = y + sin(startAngle - PI / 4) * radius * 1.5;

    stroke(shadowColor);
    this.drawCurvedLine(x, y + 3, endX, endY + 3);

    stroke(baseColor);
    this.drawCurvedLine(x, y, endX, endY);

    pop();
  }

  // Draws a curved line.
  drawCurvedLine(x1, y1, x2, y2) {
    let cx1 = (x1 + x2) / 2 + (y2 - y1) * 0.5;
    let cy1 = (y1 + y2) / 2 - (x2 - x1) * 0.5;

    noFill();
    beginShape();
    vertex(x1, y1);
    quadraticVertex(cx1, cy1, x2, y2);
    endShape();
  }

  // Generates random colors.
  generateColors() {
    return [
      [random(255), random(255), random(255)],
      [random(255), random(255), random(255)],
      [random(255), random(255), random(255)]
    ];
  }

  // Handles window resize event.
  windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    this.init();
    this.drawClock();
  }

  // Randomizes the colors of the clock elements.
  randomizeColors() {
    for (let i = 0; i < 24; i++) {
      this.colors[i] = [random(255), random(255, random(255))];
    }
    for (let i = 0; i < 48; i++) {
      this.altColors[i] = [random(255), random(255, random(255))];
    }
  }

  // Draws a pattern on a ring.
  drawPatternOnRing(cx, cy, radius) {
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

  // Draws orange circles around the main circles.
  drawOrangeCircles(circles) {
    circles.forEach(c => {
      let arcRadius = c.d / 2 + 15;
      stroke(255, 165, 0);
      strokeWeight(2.5);
      noFill();
      ellipse(c.x, c.y, arcRadius * 2, arcRadius * 2);
    });
  }
}

/**
 * Class representing a Circle in the clock.
 */
class Circle {
  constructor(x, y, diameter, colors, startAngle, hasArc, styleType) {
    this.x = x;
    this.y = y;
    this.d = diameter;
    this.colors = colors;
    this.startAngle = startAngle;
    this.hasArc = hasArc;
    this.styleType = styleType;
    this.isSpecial = false;
  }

  // Draws the circle with patterns and styles.
  draw(rotationAngle) {
    let radii = [this.d, this.d * 0.55, this.d * 0.5, this.d * 0.25, this.d * 0.15, this.d * 0.1, this.d * 0.05];

    push();
    translate(this.x, this.y);
    rotate(rotationAngle);

    if (this.isSpecial) {
      this.drawSpecialCirclePattern(0, 0, radii, this.colors, this.styleType);
    } else {
      this.drawCirclePattern(0, 0, radii, this.colors, this.styleType);
    }

    pop();
  }

  // Draws the circle pattern.
  drawCirclePattern(x, y, radii, colors, styleType) {
    let numRings = radii.length;
    for (let i = 0; i < numRings; i++) {
      fill(colors[i % colors.length]);
      ellipse(x, y, radii[i], radii[i]);
      if (i == 0) {
        this.fillDotsOnCircle(x, y, radii[0] / 2, radii[1] / 2);
      }
      if (i == 2 && i + 1 < numRings) {
        if (styleType === 'goldZigzag') {
          this.drawGoldZShape(x, y, radii[2] / 2, radii[3] / 2);
        } else if (styleType === 'multiLayeredRings') {
          this.drawMultiLayeredRings(x, y, radii[2] / 2, radii[3] / 2);
        }
      }
      if (styleType === 'multiLayeredRings' && i == 3 && i + 1 < numRings) {
        this.drawGreenLayeredRings(x, y, radii[3] / 2, radii[4] / 2);
      }
    }
  }

  // Draws the special circle pattern.
  drawSpecialCirclePattern(x, y, radii, colors, styleType) {
    fill([255, 255, 0]);
    ellipse(x, y, radii[0], radii[0]);

    for (let i = 1; i < radii.length; i++) {
      fill(colors[i % colors.length]);
      ellipse(x, y, radii[i], radii[i]);
    }

    if (styleType === 'goldZigzag') {
      this.drawGoldZShape(x, y, radii[2] / 2, radii[3] / 2);
    } else if (styleType === 'multiLayeredRings') {
      this.drawMultiLayeredRings(x, y, radii[2] / 2, radii[3] / 2);
    }
  }

  // Draws a gold zigzag shape in the circle.
  drawGoldZShape(cx, cy, thirdRadius, fourthRadius) {
    push();
    stroke(212, 175, 55);
    strokeWeight(3);
    noFill();

    let numSpikes = 16;
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

  // Draws multi-layered rings in the circle.
  drawMultiLayeredRings(cx, cy, thirdRadius, fourthRadius) {
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

  // Draws green layered rings in the circle.
  drawGreenLayeredRings(cx, cy, fourthRadius, fifthRadius) {
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

  // Fills dots on a circle.
  fillDotsOnCircle(cx, cy, outerRadius, innerRadius) {
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
}

/**
 * Class representing a Ball in the clock.
 */
class Ball {
  constructor(centerX, centerY, radius, speed) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.speed = speed;
    this.angle = 0;
  }

  // Draws the ball.
  draw() {
    let x = this.centerX + cos(this.angle) * this.radius;
    let y = this.centerY + sin(this.angle) * this.radius;
    fill(0);
    ellipse(x, y, this.radius * 0.1);
    this.angle += this.speed;
  }
}

let clock = new Clock();

function setup() {
  createCanvas(windowWidth, windowHeight);
  clock.init();
  loop();
}

function draw() {
  clock.draw();
}

function windowResized() {
  clock.windowResized();
}

function mousePressed() {
  clock.randomizeColors();
}
