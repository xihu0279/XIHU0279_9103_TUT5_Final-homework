# XIHU0279_9103_TUT5_Final-homework
Major project
# 1.Interaction Instructions

在这个动画时钟的作品中，可以通过点击鼠标来随机化钟表的颜色。这增加了互动性，使用户能够根据自己的喜好自定义钟表的外观。此外，作品中的旋转速度、颜色和圈环的大小都可以调整，这些参数都可以通过代码轻松修改，以达到不同的视觉效果。通过这些互动元素，用户可以在静态时钟和动态动画之间进行切换，享受多样化的视觉体验。
# 2.Detailed Information on Personal Methods

- 个人选择——时间

- 如何动画化
为了使时钟看起来更生动，我采用了多层次的动画方法。首先，通过旋转角度和速度来控制时钟的旋转，使其看起来更加动态。具体来说，在 draw() 函数中，不断更新 rotationAngle 和 rotationSpeed，使时钟以恒定的速度旋转。同时，小球在不同半径的圆周上移动，增加了动画的复杂性。每个小球的角度和位置通过其速度和半径进行更新，创造出一种层次分明的动态效果。此外，颜色变化通过 mousePressed() 函数触发，调用 randomizeColors() 函数生成新的随机颜色，使得动画每次点击时都有新的视觉体验。

- 参考的动画灵感
我的代码灵感来源于动态时钟设计，如 Jacob & Co. 的 Astronomia 系列。这些时钟以其复杂的机制和精美的设计著称。在代码实现中，我使用了 p5.js 的绘图和动画功能，例如 ellipse() 函数绘制圆形、line() 函数绘制指针，以及 rotate() 函数实现旋转效果。通过这些技术，我能够创建一个复杂的、多层次的动画时钟，使其不仅具有实际的时间显示功能，还具有艺术美感。

- 参考的简短技术说明









**Bold Text** or __Bold Text__
*Italic Text* or _Italic Text_
- Item 1
  - Subitem 2.1
  - Subitem 2.2

![An image of a cat](http://placekitten.com/200/300
Links to an external site.)
