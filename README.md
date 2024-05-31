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
我对于真实时间的时钟设置不是那么了解，所以我参考了Joh Jakob的GitHub文件查看如何用代码写出真实时间的代码。

[Link Text](https://www.instagram.com/p/CmdMcNcP2rL/?img_index=1)
因为小组代码的花纹非常复杂，我不知道时钟结合小组代码究竟怎么才可以让时钟变得好看，于是我翻看大量参考后，在我的偶像权志龙ins 的日常照片里得到了启发。
启示的照片都是关于花的，而我们小组的花纹类似于各式各样的花朵，于是我想到了把时钟做成以花为主题的时钟，在通过彩色的小圆球和不同颜色的中心圆去模拟花的花心，然后用小组元素去模拟花的花蕊，增添彩虹色滚动的小圆去代表蓝天白云。形成了一个漂亮的以花为主题的时钟。

- 4.Technical description of personal code
  - 4.1
  把小组代码中的元素，例如：（drawGoldZShape、drawMultiLayeredRings 和 drawGreenLayeredRings）装进了Circle 类中，并通过 Clock 类进行管理。这样会使得代码看起来有条理。把小组代码中generateColors 函数装到 Circle 类中。让他变成Circle初始化的一部分。小组中窗口大小调整的代码都被整理到Clock中。以上的一切变化都是让小组代码与个人代码功能一致。
  - 4.2
  
- 5.Technical references and explanations

[Link Text](https://github.com/JohJakob/clock-p5js)

个人作业里的写的drawClockHands函数用来绘制时钟的指针。分别绘制秒针、分针和时针。每个每个指针的位置和角度根据当前的真实时间去计算的。里面提到的 drawHandWithBall 函数是为了满足我在指针末端添加一个圆球，增强视觉效果和动态感。

[Link Text](https://www.instagram.com/p/CmdMcNcP2rL/?img_index=1)

个人作业里的写的drawColoredCircles函数用来绘制颜色不一样的圆，让这些圆沿着时钟的不同圆的外缘旋转。每个圆圈的角度和位置根据 rotationAngle 和 coloredRadius 这两个函数去计算，时间的增加rotationAngle也会 增加，从而使得圆圈不断循环旋转。

[Link Text](https://www.instagram.com/p/CmdMcNcP2rL/?img_index=1)

个人作业里的写的createGradientCircles函数用来画一组渐变的圆，并且将这些圆的信息储存在gradientCircles函数里。先写好颜色放进gradientColors 里面。计算半径gradientRadius。半径决定了这些渐变圆 的位置，计算了每个圆圈的角度 gradientAngleStep，从而实现均匀分布渐变的圆在在圆环上。最后把圆圈的颜色、角度和半径等信息存到 gradientCircles 数组里。从而实现渐变圆均匀分布在圆环上的效果，增加好看的元素，实现时钟的丰富程度。








