# XIHU0279_9103_TUT5_Final-homework
Major project

# Interactive Description of the Artwork

This code creates a complex clock.1. After loading the page, the clock reloads all the kinetic effects.2. When resizing the browser window, the clock changes with the size of the browser window.3. The color of the outermost 12 circles (the panel code elements) of the clock changes randomly when the mouse clicks on them to refresh.4. The position of the clock's hands is constantly changing according to the real time.5. The orange blob, black blob and rainbow blob will keep rotating around the different circles in a loop.

Through these interactive effects, a dynamic and vivid clock interface is formed.


# Details of Personal Approach to Group Code Modifications

- 1.Personal choice

  I chose to drive my personal code with time.

- 2.How the code is animated

  In this animated clock work 1. The rotation effect of the outermost 12 circles (group elements) is mainly achieved by changing the values of the rotationAngle and rotate functions to achieve the angle and speed of rotation. This makes the outermost 12 circles rotate around the center of the clock. 2. The 7 rainbow balls and 10 orange balls connected together are controlled by the coloredSpeed and gradientSpeed functions to control the angle and rotation of the balls. The rainbow balls and orange balls rotate around the center of the clock at different speeds to form a dynamic rotating ball effect.3. 3 black balls with different starting points are defined as Balls, and 4 parameters are set, the x and y coordinates of the center point, the radius of the circular motion and the speed of the motion, and the angle function is added to control the current angle of the black ball motion. So that the black ball in different starting points around the respective track cycle movement. 4. clock in the hour hand, minute hand and second hand through the drawClockHands function to update the position of the clock hands in real time. This will realize the effect of moving according to the real clock.

- 3.How the code is animated

![An image of my inspiration](readmeImages/assets/Reference _21%.jpeg)

[Link Text](https://github.com/JohJakob/clock-p5js)

I don't know much about clock Settings for real time, so I consulted Joh Jakob's GitHub file to see how to write real time in code.

![An image of my inspiration](readmeImages/assets/Rerference-234%-.jpeg)

[Link Text](https://www.instagram.com/p/CmdMcNcP2rL/?img_index=1)

Because the pattern of the group code is very complicated, I didn't know how exactly the clock combined with the group code could make the clock look good, so after looking through a lot of references, I got inspired by my idol Kwon Chi-Lung ins his daily photos.
The photos of the revelation are all about flowers, and the pattern of our group is similar to various kinds of flowers, so I thought of making the clock into a flower-themed clock, and simulate the heart of the flower by using colorful spheres and different colors of the center circle, and then simulate the stamen of the flower by using the group elements, and add rainbow-colored scrolling circles to represent the blue sky and white clouds. The result is a beautiful flower-themed clock.

- 4.Technical description of personal code


 Fit elements from the group code such as (drawGoldZShape, drawMultiLayeredRings and drawGreenLayeredRings) into the Circle class and manage them through the Clock class. This will make the code look organized. Take the generateColors function from the group code and put it into the Circle class. Make it part of the Circle initialization. The code for window resizing in the panel is organized into Clock. All of the above changes were made to make the group code functionally consistent with the individual code.

- 5.Reference technology cited

[Link Text](https://github.com/JohJakob/clock-p5js)

The drawClockHands function written in Personal Assignment is used to draw the hands of the clock. The second, minute and hour hands are drawn separately. The position and angle of each hand is calculated based on the current real time. The drawHandWithBall function was written to add a ball at the end of the hands to enhance the visual effect and dynamics.

[Link Text](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

The drawColoredCircles function, written in a personal assignment, is used to draw circles of different colors and rotate them along the outer edges of different circles of the clock. The angle and position of each circle is calculated by the rotationAngle and coloredRadius functions, and the rotationAngle increases as time goes on, thus making the circles rotate in a circular fashion.

[Link Text](https://github.com/antiboredom/p5.patgrad)

ndividual assignments written in the createGradientCircles function is used to draw a set of gradient circles, and will be stored in the gradientCircles function of the information of these circles. Write the colors and put them in gradientColors. Calculate the radius gradientRadius. radius determines the position of these gradient circles, calculated the angle of each circle gradientAngleStep, so as to achieve an even distribution of gradient circles in the ring. Finally, the color, angle and radius of the circles are stored in the gradientCircles array. Thus realize the effect of uniform distribution of gradient circles on the ring, add good-looking elements to achieve the richness of the clock.






