---
slug: landau-constant-velocity
title: 是真的吗？——对称性与匀速运动
tags: [physics]
---

在朗道力学有这么一句话：

:::note[L.D.朗道 《力学》$\S$1.3]
...由此可得$\frac{\partial L}{\partial\mathbf{v}}=\mathbf{const}$.而$\frac{\partial L}{\partial\mathbf{v}}$只是速度的函数，故
$$\mathbf{v}=\mathbf{const}$$
:::

我们在这篇文章中将探讨这句话的真实性。
{/* truncate */}

![真的吗？](images/is_it_true.jpg)

## 探求

首先，以防万一，我们需要明确一下朗道中一个符号的含义，也就是

$$
\frac{\partial}{\partial \mathbf{v}}=\nabla_{\mathbf{v}}=\left(\frac{\partial}{\partial v_x}, \frac{\partial}{\partial v_y}, \frac{\partial}{\partial v_z}\right)
$$

一个标量函数对一个矢量求偏导，其含义便是将该标量函数对该矢量中的分量求梯度。

我们将不做疑问地接受如下由对称性做出的论断：

- 取笛卡尔坐标系$\mathbf{r}$作广义坐标，由于空间与时间的平移对称性，自由粒子的$\mathcal{L}$中不显含$\mathbf{r}$与$t$。或者说，我们的拉格朗日量总可以写成$\mathcal{L}=\mathcal{L^\prime}\left(\mathbf{v}\right)+\frac{d}{dt}f\left(\mathbf{r}, t\right)$的形式。由于之后我们的推导只会用到欧拉-拉格朗日方程而非具体的拉格朗日量形式，这意味着我们总可以认为我们研究的$\mathcal{L}$仅与$\mathbf{v}$相关
- 由于空间各向同性，我们的$\mathcal{L}$只能与速度的模有关。换句话说，$\mathcal{L}=\mathcal{L}\left(v\right)$

进而，由E-L方程

$$
\frac{d}{dt}\frac{\partial\mathcal{L}}{\partial \mathbf{v}}=\frac{\partial\mathcal{L}}{\partial \mathbf{r}}=\mathbf{0}
$$

意味着

$$
\begin{equation}
\frac{\partial L}{\partial\mathbf{v}}=\mathbf{const}
\end{equation}
$$

接下来我们将等价地定义$\mathcal{L}\left(v\right)=f\left(v^2\right)$，并记$f^\prime\left(v^2\right)=\frac{df}{d\left(v^2\right)}\left(v^2\right)$

若我们将$\left(1\right)$其写作分量的方程

$$
\begin{equation}
v_if^\prime\left(v^2\right)=C_i \quad i\in\set{x,y,z} \quad C_i=\frac{1}{2}\mathbf{const}_i
\end{equation}
$$

将三个方程平方并相加，我们得到

$$
\begin{equation}
f^\prime\left(v^2\right)=\dfrac{C}{v} \quad C=\sqrt{\sum_i C_i^2}
\end{equation}
$$

将其代入$\left(2\right)$，我们得到如下方程

$$
\frac{v_i}{v}=\frac{C_i}{C}
$$

由于$\dfrac{dC_i}{dt}=0$，这意味着$\dfrac{d\left(\dfrac{v_i}{v}\right)}{dt}=0$，或者说$\hat{\mathbf{v}}=\dfrac{\mathbf{v}}{v}=\mathbf{const}$。这意味着至少$\mathbf{v}$的方向是不随时间改变的。

接下来我们需要研究$v$的变化。有些读者可能会想将方程$\left(3\right)$进行积分，然而这是并不妥当的。这是因为尽管$C_i$对时间的全导数是0，但是$C_i$仍然可能是$v_i$的函数，只要$v_i$对时间的导数是0便可以了。这引导我们对$C$是否含有$v$进行分类。

- 若$C$含有$v$，则$C$给出了一个对$v$的约束方程$vf^\prime\left(v^2\right)=C$。只要知道了某一时刻$C$的值，我们便可以在之后每一个时刻通过该约束方程给出$v$的一系列取值，而且由于$\mathcal{L}$应当具有足够好的数学性质，$vf^\prime\left(v^2\right)$不应当有整个连续区间的根。再加上E-L方程要求速度对于时间是可微的，这就令$v$不能在离散的不同可能取值之间跳动。换而言之，$v$是守恒的。
- 若$C$不含有$v$，我们便可以对方程$\left(3\right)$进行积分。得到的结果便是$\mathcal{L}=Mv$。我们有很多视角可以审视该形式的拉格朗日量。若我们从作用量的角度来看，其所用量$S_{act}=\int Mvdt=M\int vdt=M\int ds$。该作用量只和空间中的线元有关，意义便是将两点之间最短的连线作为路径，而和时间导数的项则退化了。换句话说，在该拉格朗日量描述的体系下，粒子的速度大小随时间不受任何约束，只要其路径是直线就可以了。若我们等价地从E-L方程的角度看，其E-L方程也仅仅给出$\dfrac{\mathbf{v}}{v}=\mathbf{const}$，也就是方向不改变。

我们最终发现，除非$\mathcal{L}\propto v$，那么自由粒子的速度大小与方向就一定都是不变的。然而，在$\mathcal{L}\propto v$的特殊情况，粒子的速度大小竟然可以是任意关于时间的函数，实在是令人意外。

话又说回来，$\mathcal{L}=Mv=M\dfrac{dr}{dt}$与$\mathcal{L}=0$仅仅差了一个位置的全导数。这暗示着这种形式的运动方程将会给出一个奇异而无趣的物理系统。事实证明，确实如此。

:::info[2026/04/03 注]
现在回想，从变分的角度看，该无趣性也正来自于对速度边界条件的退化性。
:::

## 结论

我们花费长篇大论给朗道的结论挑了一个刺，一个无关紧要的问题。尽管我们无从得知朗道是否考虑到了这种情况，但是毕竟是朗道，他大有可能觉得这些讨论都是平凡的幼儿园微积分练习题，读者都应该瞬间想通这些；另一方面，无论他是否考虑到其严谨性，这也并不影响其之后的论述。在接下来伽利略不变性的引入下，$\mathcal{L}$的具体形式便被确定了，而之前的讨论便都变得无意义。而其导出$\mathcal{L}$的过程也并没有用到$v$必须不变这一条件。

很**霸道**，也很**朗道**。

![吗的真是](images/true_is_it.jpg)