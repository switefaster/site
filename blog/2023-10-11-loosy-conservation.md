---
slug: loosy-conservation
title: 更宽松条件的能量守恒
tags: [physics]
---

经典力学中，在从一个体系的拉格朗日量出发推导守恒量的过程，我们经常让拉格朗日量在一个无穷小变换下拉格朗日量的变化为0。这并非错误，然而我们都知道两个拉格朗日量若只相差一个仅含广义坐标与时间的函数的全导数，那么这两个拉格朗日量描述的体系便可以视为全同的。那么，若我们引入的条件是无穷小的时间轴标定平移下拉格朗日量的变化只差一个坐标与时间的全导数，我们到底能不能得出一样的能量守恒，或者修正的能量守恒呢？这篇文章中我们将着手解决这个问题。
<!-- truncate -->

## 时间平移

何为时间平移不变性？是说在力学规律的角度下，系统的任何时间都是等价的。粗略地说，这个条件可以等价为我们可以找两个人在不同的时间开始研究同一个力学系统，而这两人会得到同样的力学规律。从拉格朗日量的角度看，这意味着如果$\mathcal{L}$中显含的$t$中若经历了平移，我们仍然会得到一样的运动方程。这里需要注意我们只需要关注$\mathcal{L}$中显含的$t$，而不需要让$q\left(t\right)$中的$t$也产生平移。因为我们研究的是两个不同视角下的力学规律，而如果我们直接将整个时间轴进行平移，则拉格朗日量的变化量是$d\mathcal{L}$这个全微分，是同一个视角的拉格朗日量在时间下的变化罢了。在数学的角度，那也仅仅是将解进行了一个平移，并不能反映运动方程的变化。而显含于$\mathcal{L}$中的$t$才是将两个系统区分开的因素。

同时，我们还需注意一点，即我们进行的时间平移必须是一个“常量”。也就是说，我们并不能有$t^\prime=t+δt\left(t\right)$。这是因为，如果$t^\prime$与$t$之间的关系与$t$本身有关，我们实际上则创造出了一个时间流逝不均匀的参考系。然而伽利略相对性原理则指出不同的参考系之间总具有相同的全局时间，这使得我们无法对时间流逝不均的参考系做出任何断言，因为没有相对性原理保证其物理规律是一致的。

现在，我们考察无穷小的时间平移给拉格朗日量带来的影响

$$
\delta\mathcal{L}=\mathcal{L\left(q,\dot{q},t+δt\right)}-\mathcal{L\left(q,\dot{q},t\right)}=\frac{\partial \mathcal{L}}{\partial t}\delta t
$$

而我们希望其带来的影响是一个位置和时间对时间的全导数，即

$$
\frac{\partial \mathcal{L}}{\partial t}\delta t=\frac{d}{dt}f\left(q,t\right)
$$

而由于$\delta t$与$t$无关，我们将$\delta t$商掉并吸收进$f$中。虽然这一过程看似产生了除以一个无穷小量的不合理操作，但是由于我们在物理上可以将$\delta t$理解成一个造成的高阶项影响已经远小于我们测量精度的有限大量，所以并无大碍。再者，我们实际上需要的事实仅仅是$g=\dfrac{f}{\delta t}$仅依赖于$q$与$t$，其大小如何，我们并不关心。

现在，我们拥有了如下等式

$$
\frac{\partial \mathcal{L}}{\partial t}=\frac{d}{dt}g\left(q,t\right)=\frac{\partial g}{\partial q}\dot{q}+\frac{\partial g}{\partial t}
$$

由于我们需要获得$\mathcal{L}$的形式，我们可以将$q$与$\dot{q}$当作与$t$无关的常量对上式两侧积分，并定义

$$
\begin{equation}
\begin{cases}
\varphi\left(q,t\right)=\int \dfrac{\partial g}{\partial q} dt \\\\
\psi\left(q,t\right)\equiv g\left(q,t\right)+h\left(q\right)=\int \dfrac{\partial g}{\partial t} dt
\end{cases}
\end{equation}
$$

其中第二式是因为偏导和这个积分过程都是将$q$与$\dot{q}$当作常数处理的，其显然是完全互逆的操作。

因此，$\mathcal{L}$具有如下形式

$$
\mathcal{L}=\mathcal{L}_0\left(q,\dot{q}\right)+\varphi\dot{q}+\psi
$$

其中$\mathcal{L}_0$是积分过程中产生的常数，其不显含$t$。而由于我们的拉格朗日量描述的是真实的物理系统，我们断言其形式为一般情况下的拉格朗日量$\mathcal{L}_0=T-U$。而$\mathcal{L}$应当满足E-L方程，这意味着

$$
\begin{equation}
\frac{\partial \mathcal{L}_0}{\partial q}+\frac{\partial \varphi}{\partial q}\dot{q}+\frac{\partial g}{\partial q}+\frac{\partial h}{\partial q}=\frac{d}{dt}\left(\frac{\partial \mathcal{L}_0}{\partial \dot{q}}+\varphi\right)
\end{equation}
$$

而稍作观察便可以发现

$$
\begin{equation}
\frac{d\varphi}{dt}=\frac{\partial\varphi}{\partial q}\dot{q}+\frac{\partial\varphi}{\partial t}=\frac{\partial\varphi}{\partial q}\dot{q}+\frac{\partial g}{\partial q}
\end{equation}
$$

最右边的等号是因为方程$\left(1\right)$。将方程$\left(3\right)$代入$\left(2\right)$中，我们得到

$$
\frac{\partial \mathcal{L}_0}{\partial q}+\frac{\partial h}{\partial q}=\frac{d}{dt}\left(\frac{\partial \mathcal{L}_0}{\partial \dot{q}}\right)
$$

现在我们终于可以开始考察$\mathcal{L}$对时间的全微分

$$
\begin{alignat*}{100}
\frac{d\mathcal{L}}{dt}
=\frac{\partial\mathcal{L}_0}{\partial q}\dot{q}+\frac{\partial\mathcal{L}_0}{\partial\dot{q}}\ddot{q}+\frac{d}{dt}\left(\varphi\dot{q}+\psi\right)
\\\\ =\left(\frac{d}{dt}\left(\frac{\partial \mathcal{L}_0}{\partial \dot{q}}\right)-\frac{\partial h}{\partial q}\right)\dot{q}+\frac{\partial\mathcal{L}_0}{\partial\dot{q}}\ddot{q}+\frac{d}{dt}\left(\varphi\dot{q}+\psi\right)
\\\\ =\frac{d}{dt}\left(\frac{\partial\mathcal{L}_0}{\partial q}\dot{q}+\varphi\dot{q}+\psi-h\right)
\end{alignat*}
$$

换而言之

$$
\mathcal{L}-\frac{\partial\mathcal{L}_0}{\partial q}\dot{q}-\varphi\dot{q}-\psi+h=h-T-U
$$

守恒的能量比常规能量多出了一项$h$。这个$h$，究竟是何方神圣？

该$h$有很多来源，从过程上看他是积分$\left(1\right)$过程中产生的常数项。而我们当然知道，只关于$q$的函数是时间平移不变的。因此，在这个常数中，我们实际上可以引入任意势能场。在这个意义下，$h$仅仅表示了时间无关的势能而已。

然而$h$代表的意义或许可以超过此。在大多数情况下，我们是知道系统的具体配置的。或者说，我们知道势能$U$到底取什么形式。此时，若拉格朗日量具有$\varphi\dot{q}$项，那么我们便可以通过解方程$\left(1\right)$的方式将$h$解出来，也就是说，体系在原有的势能上会多出一项$h$的势能修正。该修正由$\varphi\dot{q}$项产生，我们可以认为其表示了一个时间平移不变但是与速度相关的相互作用产生的能量修正。这样的例子包括形如这样的修正项$\varphi=t$，其效果是会产生一个恒定的“加速度”，而$h$则会将其加速度的等效力场的势能囊括。不过我并没有想到太多这样的例子。

## 结论

好像没啥用？不过挺有意思的，于是罢了。