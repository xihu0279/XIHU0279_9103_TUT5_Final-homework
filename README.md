# XIHU0279_9103_TUT5_Final-homework
Major project

# Interactive Description of the Artwork

这段代码创建了一个复杂的时钟，1.加载页面后，时钟会重新加载所有的动效效果。2.调整浏览器窗口大小时，时钟随着浏览器窗口的大小变化而变化。3.鼠标点击刷新时，时钟最外面的12个圆（小组代码元素）颜色会随机变化。4.时钟的指针的位置是根据真实时间不断变化的。5.橙色小球，黑色小球和彩虹小球会一直绕着不同的圆环循环旋转。

通过这些交互效果，形成了一个动态生动的时钟界面。

# Details of Personal Approach to Group Code Modifications

- 1.Personal choice

  I chose to drive my personal code with time.

- 2.How the code is animated

  在这个动画时钟的作品里1.最外面12个圆（小组元素）的自转效果主要是通过改变rotationAngle 和 rotate函数的数值来实现旋转的角度和速度。这使得最外面的12个圆围绕时钟中心自转。2.连在一起的7个彩虹小球和10个橙色小球分别是通过coloredSpeed和gradientSpeed两个函数去控制小球得角度和旋转。彩虹小球和橙色小球围绕时钟中心以不同的速度旋转，形成动态的旋转小球的效果。3.3个不同起点的黑色小球通过分别定义成Ball，并且设置4个参数，中心点的 x 和 y 坐标、圆周运动的半径 radius 和运动速度 speed。在加上angle函数控制其当前角度使得黑球运动。这样黑色小球在不同的起点上绕着各自的轨道循环运动。4.时钟里的时针分针秒针通过 drawClockHands 函数实时更新时钟指针的位置。从而实现按照真实的时钟运动的效果。


- 3.How the code is animated

! [An image of my inspiration](readmeImages/Reference 1.png
)
 
[Link Text](https://github.com/JohJakob/clock-p5js)








- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
