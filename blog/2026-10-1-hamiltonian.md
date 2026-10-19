---
slug: hamiltonian
title: 数学物理小记：守恒荷的几何和最小作用量原理
draft: true
tags: [physics,maths]
---

哈密顿力学的底层结构由辛几何支撑，是守恒荷的动力学；由勒让德变换与哈密顿力学连接的拉格朗日力学则令系统中的对称性显形。守恒荷和对称性，这对由诺特定理被指明为一体两面的概念，在这两个力学的描述下又能带给我们怎样的视角呢？{/* truncate */}

## 辛几何

我们先引入必要的辛几何。物理背景的读者也无需心急，其结构与物理的对应在后文自然显现。
:::tip[辛形式]
流形 $\mathcal{M}$ 上的 $2$-形式 $\omega\in\Omega^2(\mathcal{M})$ 被称为辛形式当且仅当

1. $\omega$ 非退化
2. $\omega$ 是闭的，即 $d\omega=0$

:::
:::tip[辛流形]
二元组 $(\mathcal{M},\omega)$ 被称为**辛流形**，$\omega$ 亦被称作 $\mathcal{M}$ 的辛结构。
:::

事实上，仅 $\mathcal{M}$ 上存在辛结构的事实本身就给 $\mathcal{M}$ 带来诸多限制，我们在此列举一些：

::::info[命题]
辛流形 $\mathcal{M}$ 必定是**偶数**维的。
:::note[证明]
将 $\omega_p$ 视作切空间 $T_p\mathcal{M}$ 上斜对称双线性型，通过构造辛基证明 $\omega_p$ 若非退化，必然定义在偶数维的线性空间。过程略。
:::
::::
::::info[命题]
辛流形 $\mathcal{M}$ 必定**可定向**。
:::note[证明]
令 $2n=\dim\mathcal{M}$，考虑 $\Omega=\frac{1}{n!}\omega^n$，我们证明 $\Omega$ 是 $\mathcal{M}$ 上的体积形式。

由 $\omega_p$ 非退化，我们可以构造一组 $T_p\mathcal{M}$ 的辛基 $\{X_1,\cdots,X_n,Y_1,\cdots,Y_n\}$ 满足 $\omega_p(X_i,Y_j)=\delta_{ij}$。因此

$$
\left<X_1\wedge Y_1\wedge\cdots\wedge X_n\wedge Y_n,\omega_p^n\right>=n!\neq0
$$

很显然这说明 $\Omega_p\neq 0,\forall p\in\mathcal{M}$，因此 $\Omega$ 是体积形式，$\mathcal{M}$ 可定向。
:::
::::

这足以说明并非任意流形都可以被赋予辛结构，要求甚至于可以说稍显苛刻。闭流形上辛结构的存在条件仍然是一个重要的开放问题。

幸运的是，对于我们希望研究的哈密顿力学，我们总可以给对应的流形赋予辛结构。而这恰好构成了辛流形的一个重要的例子。

### 余切丛

这个重要的例子便是余切丛。为何哈密顿力学定义在余切丛上的问题，我们后面再做讨论。眼下，我们集中于证明所有余切丛上都存在辛结构。

:::tip[重言 $1$-形式]
令 $\pi:T^*\mathcal{N}\to\mathcal{N}$ 为 $T^*\mathcal{N}$ 的丛投射，$m\in T^*\mathcal{N}$，我们用 $\pi$ 将 $TT^*\mathcal{N}$ 推前，记作 $d\pi:TT^*\mathcal{N}\to T\mathcal{N}$。按定义 $m$ 可以理解为 $\pi(m)$ 点上的余切向量，因此 $m\circ d\pi_m$ 是一个 $T_mT^*\mathcal{N}$ 到 $\mathbb{R}$ 的线性映射。换言之，是 $T^*_mT^*\mathcal{N}$ 的元素。

按如上构造，我们典范地得到了一个映射 $\theta:T^*\mathcal{N}\to T^*T^*\mathcal{N}$，即 $m\mapsto (m,m\circ d\pi_m)$，$\theta$ 称为 **重言 $1$-形式**。
:::

我们通过具体的计算演示 $\theta_m$ 的作用。取 $T^*\mathcal{N}$ 的局部平凡化 $m=(q,p_i dq^i)$，则 $\pi(m)=q$，$d\pi_m(\Delta q^i\partial_{q^i}+\Delta p^i\partial_{dq^i})=\Delta q^i\partial_{q^i}$，$m\circ d\pi_m=p_i\Delta q^i$。

换言之，$\theta_m$ 可以表达为 $\theta_m=p_i\delta q^i$。其中 $\delta q^i$ 为 $T_m^*T^*\mathcal{N}$ 的部分基。$\theta$ 十分类似 $m$ 的余切向量部分，为了阐明这一联系，写出 $T^*T^*\mathcal{N}$ 的元素
$$
(q,p_i dq^i,Q_i \delta q^i+P_i\delta dq^i)
$$
$\theta$ 的像为
$$
(q,p_i dq^i)\mapsto(q,p_i dq^i,p_i \delta q^i)
$$
这解释了重言 $1$-形式的含义：在余切丛的余切丛中，通过“遗忘”余切向量的余切向量，存在与余切丛意义相同的截面。

$\theta$ 是 $T^*T^*\mathcal{N}$ 上的截面，即 $T^*\mathcal{N}$ 上的 $1$-形式。接下来，我们对重言 $1$-形式取外微分。在不引起歧义的情况下，我们仍用 $dq^i$ 和 $dp^i$ 作为 $T_m^*T^*\mathcal{N}$ 的基。
$$
d\theta=\sum_i dp^i\wedge dq^i\equiv-\omega
$$
按惯例，我们添加了一个负号。我们宣称 $\omega$ 是 $T^*\mathcal{N}$ 上的辛形式
:::note[证明]

1. $\omega$ 是非退化的：由表达式 $\omega=\sum_i dq^i\wedge dp^i$ 显然
2. $\omega$ 是闭的：由于 $d^2=0$，且 $\omega=-d\theta$， 显然

:::
因此任何流形的余切丛上都存在辛结构。

### 达布定理

辛几何的定义具有极强的刚性。为了理解这一点，我们先回顾黎曼几何中的情况。

在黎曼几何中，我们赋予流形 $\mathcal{M}$ 以度规 $g$ 以及相对应的联络。一个基础的结果是，对于每一点 $p\in\mathcal{M}$，存在一个正则坐标使得 $g_p=\eta$ 且 $\partial g_p=0$。这正是爱因斯坦等效原理。然而这种构造是局域的，即仅限于 $p$。尽管总可以在每一点选取标架使得度规 $g$ 具有平坦形式，这些标架却无法拼接成完整的坐标。若想在开集内获得平坦的坐标，则必须要求黎曼曲率 $R^\rho{}_{\mu\nu\sigma}=0$。该性质一般被人们形容为：黎曼几何局部等价于欧式几何。

辛几何中的情况大有不同。辛结构 $\omega$ 作为一个 $2$-形式具有和度规相似的地位，即作为某种“内积”联系切空间和余切空间。然而其额外限制 $d\omega=0$ 造成了极强的约束，在某种意义上接近 $R^\rho{}_{\mu\nu\sigma}=0$，从而造成辛几何的空间是全局“等价”的，即总能存在某些坐标选取使得辛结构具有标准形式。这一点与黎曼几何大为不同，并使得对辛几何局部性质的研究等价于对标准辛结构的研究。这一重要事实由达布定理刻画。

:::warning
我们考虑实的光滑流形。
:::

:::tip[辛同胚]
给定辛流形 $(\mathcal{M},\omega)$ 和 $(\mathcal{N},\omega^\prime)$ 之间的微分同胚 $\phi:\mathcal{M}\to\mathcal{N}$。$\phi$ 若满足
$$
\phi^*\omega^\prime=\omega
$$
则称 $\phi$ 为 $\mathcal{M}$ 和 $\mathcal{N}$ 间的辛同胚。若存在这样的 $\phi$，则称 $\mathcal{M}$ 和 $\mathcal{N}$ 辛同胚。辛同胚也被物理学家称为**正则变换**。
:::

辛同胚的地位类似黎曼几何中保持度规的等距变换，在微分同胚的基础上进一步要求保持我们额外赋予的结构。

:::info[达布定理]
对于任意给定辛流形 $(\mathcal{M},\omega)$，令开集 $U\subset\mathcal{M}$，则必定存在开集 $V\subset U$ 使得存在辛同胚 $\phi:V\to U_0$，满足 $\phi^*\omega_0=\omega$。其中 $U_0\subset\mathbb{R}^{2n}$，$\omega_0=\sum_{i=1}^n dx^i\wedge dy^i$。
:::

由于达布定理的证明比较繁琐，我们在此略过。

## 哈密顿力学

在流形 $\mathcal{M}$ 具有辛结构之后，我们可以在其上定义一系列有趣的结构。而这些结构正是所谓的哈密顿力学。

考虑任意一个函数 $H\in C^\infty(\mathcal{M})$，称作 $\mathcal{M}$ 上的哈密顿量。
:::tip[哈密顿向量场]
哈密顿向量场 $X_H\in\Gamma(T\mathcal{M})$ 由如下性质唯一确定：
$$
X_H\llcorner\omega=dH
$$
或者等价的：
$$
X_H=dH\llcorner\omega^{-1}
$$
上式可理解为定义了下式的 $\omega^{-1}$。
:::
:::tip[Cartan 魔法公式]
对于任意向量场 $X$ 及微分形式 $\Theta$，其李导数有恒等式
$$
\mathcal{L}_X\Theta=d(X\llcorner\Theta)+X\llcorner d\Theta
$$
:::
:::note
我们会交换使用李括号和向量场的李导数 $[X,Y]\equiv\mathcal{L}_XY$
:::
$X_H$ 生成的流被称为哈密顿流，或相流。由定义以及 Cartan 魔法公式立刻可以注意到相流有趣的性质。
:::info[哈密顿量守恒]
$$
\mathcal{L}_{X_H}H=X_H(H)=dH(X_H)=\omega(X_H,X_H)=0
$$
:::
:::info[正则性]
$$
\mathcal{L}_{X_H}\omega=d(X_H\llcorner\omega)+X_H\llcorner d\omega=d(dH)+X_H\llcorner 0=0
$$
:::
:::info[刘维尔定理]
$$
\mathcal{L}_{X_H}\Omega=\mathcal{L}_{X_H}\left(\frac{1}{n!}\omega^n\right)=0
$$
:::
以上种种性质表明，相流给出了辛流形上一系列保持辛结构、体积形式以及哈密顿量的微分同胚。由守恒性质不难看出，每一条流都始终处在哈密顿量的某个等值面 $H=E$ 上。

### 正则方程

对于初次接触这种形式化定义的物理读者而言，上述表述定让人感到既熟悉又陌生。这一方面是由于物理学家在写出正则方程时，不会显式地表明背后存在一个辛结构；同时也是因为上述描述里并不存在时间。事实上，第二点在某种程度上反而捕捉到了哈密顿力学的核心。我们接下来通过对照来说明这一点。

考虑辛流形上的任意光滑函数 $f(p,q)$，则
$$
\mathcal{L}_{X_H}f=X_H(f)=\omega^{-1}(dH,df)
$$
代入 $\omega=\sum_i dq^i\wedge dp^i$，得到
$$
\begin{align*}
\omega^{-1}(dH,df)&=\omega^{-1}(\partial_{p_i}Hdp^i+\partial_{q_i}Hdq^i+,\partial_{p_i}fdp^i+\partial_{q_i}fdq^i)\\
&=\partial_{p_i}H\partial_{q_j}f\omega^{-1}(dp^i,dq^j)+\partial_{q_i}H\partial_{p_j}f\omega^{-1}(dq^i,dp^j)\\
&=\partial_{p_i}H\partial_{q_j}fdq^j(\partial_{q^i})-\partial_{q_i}H\partial_{p_j}fdp^j(\partial_{p^i})\\
&=\partial_{p_i}H\partial_{q_i}f-\partial_{q_i}H\partial_{p_i}f
\end{align*}
$$
这正是泊松括号。对比正则方程[^1]
$$
\frac{df}{dt}=\{H,f\}
$$
不难意识到二者之间的对应关系为 $\frac{df}{dt}=\mathcal{L}_{X_H}f$。换言之，我们考虑的时间参数 $t$ 仅是哈密顿流的自然参数化。而物理上考虑的相空间正是广义坐标构成的流形 $\mathcal{M}$ 的余切丛 $T^*\mathcal{M}$。

这引出了哈密顿力学的核心：我们真正操作的是守恒量本身，以及其对应的相流。在这个意义上，时间并不具有特殊地位，仅仅是标记我们称为哈密顿量的守恒量的哈密顿流的参数。事实上，我们可以将任何守恒荷当作上述讨论的“哈密顿量”，从而得到其相流。例如动量守恒时，可以取 $H(p,q)=p$。真实的物理轨迹正是这些不同“哈密顿量”等值面的交。

由于我们提前知道相流已经给出了真实的物理轨迹，余下的守恒荷必定需要满足某些性质，从而使得相流也处于他们的等值面上。而这个性质可以轻易检验：
$$
\text{$G$在$H$-相流上等值}\iff\mathcal{L}_{X_H}G=0\iff\omega^{-1}(dH,dG)=0\iff\mathcal{L}_{X_G}H=0\iff\text{$H$在$G$-相流上等值}
$$
这就是哈密顿力学中所说守恒量 $G$ 满足 $\{H,G\}=0$，此时我们称这两个哈密顿量是**相容**的。

事实上，我们可以把这个关系加强到哈密顿量对应的哈密顿向量场上。
::::info[恒等式]
对于任意向量场 $X$ 和微分形式 $\alpha$
$$
\mathcal{L}_X(Y\llcorner\alpha)=[X,Y]\llcorner\alpha+Y\llcorner\mathcal{L}_X\alpha
$$
:::note[证明]
略，可直接由定义证明。
:::
::::
::::info[重要引理]
$$
\mathcal{L}_{X_H}X_G=[X_H,X_G]=X_{\{X,G\}}
$$
:::note[证明]
直接计算
$$
[X_H,X_G]\llcorner\omega=\mathcal{L}_{X_H}(X_G\llcorner\omega)-X_G\llcorner\mathcal{L}_{X_H}\omega=\mathcal{L}_{X_H}(dG)=d(X_H\llcorner dG)=d(\omega^{-1}(dH,dG))=d(\{H,G\})
$$
由定义 $[X_H,X_G]=X_{\{H,G\}}$
:::
::::

从上述的论断来看，没有任何一个证据表明有某个哈密顿量的相流需要被置于特殊的地位，而相流则一定坐落于这些相容的哈密顿量某些等值面的交上。一个自然的问题是，由于 $\omega^{-1}$ 是非退化的，给定 $dH$ 后 $\omega^{-1}(dH,dG)=0$ 的解必定是 $2n-1$ 维，且解集中一定含 $dG=dH$。这意味着除了 $H$ 本身外，存在 $2n-2$ 个“局域”的守恒量（余切向量）。这些局域的守恒量能否来自真正的定义在整个辛流形上的哈密顿量？也就是说，是否有某些方法，使得我们能获得确切的，至少也是闭的 $1$-形式？

抱着这些疑问，让我们先将目光投向那个处于一切核心的美丽定理——诺特定理。

### 诺特定理

#### 对称性

诺特定理常常在拉格朗日力学中表述，因为在拉格朗日力学中“系统满足某个对称性”的表述是自然的，系统的不变性完全由作用量的不变性来确定。在哈密顿力学中，情况则更加微妙：哈密顿力学描述着运动的轨迹，而对称作用是完全可以改变轨迹的。因此，为了陈述和证明诺特定理的核心——**对称性导致守恒量**，我们必须思考所谓的对称变换究竟在哈密顿力学中表示着什么。

我们考虑辛流形 $(\mathcal{M},\omega)$ 和由某个李群 $G$ 描述的连续对称性。$G$ 连续地作用在 $\mathcal{M}$ 上，从而诱导出一个微分同胚：
$$
\begin{gathered}
T_g:\mathcal{M}\to \mathcal{M}\\
p\mapsto g\cdot p
\end{gathered}
$$
不妨考虑某个哈密顿量 $H$ 确定的相流 $\sigma_{H,t}$。对称变换对轨迹的意义很明确：物理的运动轨迹经过对称变换后，必定还是物理的运动轨迹。$T_g$ 作用在 $\sigma_{H,t}$ 后仍然产生物理轨迹，这一要求现在可以严格表述：
$$
(T_g)_*\sigma\text{仍然是轨迹}\iff (T_g)_*X_H\text{仍然是哈密顿向量场}\iff (T_g)_*X_H=X_H
$$
最后一个等号与李导数中定义类似：$T_g$ 的推前将原本 $p$ 处的向量场推至了 $g\cdot p$ 处，因而和原本 $g\cdot p$ 处的向量场变得可比。

这似乎让我们在哈密顿力学中成功描述了对称性。现在，它如何导致守恒量呢？对此，我们注意到 $T_g$ 的作用和相流的作用极其相似。如果 $\bar{G}$ 是某个和 $H$ 相容的哈密顿量，那么 $\mathcal{L}_{X_{\bar{G}}}X_H=0$ 处处为 $0$ 的要求等价于 $(\sigma_{X_{\bar{G}},-t})_*X_H=X_H$。因此，$T_g$ 的作用，严格来说，一个单参数子群 $T_{g(-t)}$ 的作用，是与 $H$ 相容的守恒量的相流的作用。这指导我们将 $T_g$ 理解为某些守恒荷的相流[^2]。

然而这足够了吗？如果我们小小作弊，先假定 $T_g$ 确实是存在哈密顿量的相流，那么便应有 $(T_g)^*\omega=\omega$。一个对称作用若要对应守恒荷，除了与 $H$ 相容以外，还必须尊重辛结构本身。事实上，这一条才是至关重要的。只要 $T_g$ 是辛作用，我们就能得到生成 $T_g$ 的哈密顿量，只是 $H$ 未必与其相容罢了。为了区分，我们将由 $G$ 得到的哈密顿量称为守恒荷。仅当 $H$ 与守恒荷相容时，这些守恒荷才成为守恒量。

这一要求并不完全意外，毕竟若 $G$-作用没有任何限制的话，我们可以想象变换后的流形和原来的辛流形没有任何关系。在后文我们将会看到，辛形式作为某种内积，实际上刻画了不同演化之间的相关性，而辛作用则保护这种相关性。

:::tip[辛作用]
$T_g$ 是一个辛同胚时，李群 $G$ 在 $\mathcal{M}$ 上的作用 $T_g$ 被称为辛作用。
:::

#### 无穷小作用

因此，我们类比 $X_{\bar{G}}$ 考虑对应 $T_g$ 的分布子丛 $\mathfrak{D}_G\subset T\mathcal{M}$，即所有不同的轨道子流形 $\text{Orb }(p)=\{T_g(p);g\in G\}$ 的切空间的并。我们为方便仅讨论 $\text{rank }\mathfrak{D}_G=\dim G$ 的情况，即 $G$ 的作用是自由的[^3]。对于给定点 $p\in\mathcal{M}$，$T_g(p):G\to\text{Orb }(p)\subset\mathcal{M}$ 可以将 $G$ 上的李代数，即一个左不变的向量场 $\mathfrak{g}$ 推前，也就是 $T(p)_*:\mathfrak{g}\to T\text{Orb }(p)\hookrightarrow\mathfrak{D}_{G}\subset T_p\mathcal{M}$。记 $E\in\mathfrak{g}$ 在该推前下的像为 $X_E$。
::::info[引理]
对于任意 $E\in\mathfrak{g}$，$X_E$ 的流 $\sigma_{X_E,t}(p)=T_{\exp(Et)}(p)$
:::note[证明]
由于左侧向量场的切向量为 $X_E$，仅需证明等式右侧的切向量等于 $X_E$。

先考虑指数映射的切向量。由左不变向量场和指数映射的定义，$\exp(Et)$ 正是由 $E$ 在 $G$ 上生成的流。因此
$$
\exp(Et)_*\partial_t=E
$$
$T_{\exp(Et)}(p)$ 的切向量定义为
$$
\left[T_{\square}(p)\circ\exp(Et)\right]_*\partial_t=\left[T_{\square}(p)\right]_*\circ\left[\exp(Et)\right]_*\partial_t=\left[T_{\square}(p)\right]_*E=X_E
$$

得证。
:::
::::
::::info[引理]
$X_E$ 构成李代数 $\mathfrak{g}$ 的表示，即对任意 $E,F\in\mathfrak{g}$ 都有
$[X_E,X_F]=X_{[E,F]}$
:::note[证明]
$$
\begin{split}
[X_{E},X_{F}]&=\mathcal{L}_{X_E}X_F\\
&=\lim_{t\to0}\frac{(\sigma_{X_E,-t})_*X_F-X_F}{t}\\
&=\lim_{t\to0}\frac{(T_{\exp(-Et)})_*X_F-X_F}{t}\\
&=\lim_{t\to0}\frac{(T_{\exp(-Et)})_*(T(p))_*F-X_F}{t}\\
&=\lim_{t\to0}\frac{(T_{\exp(-Et)\cdot \square})_*F-(T(p))_*F}{t}\\
&=\lim_{t\to0}\frac{(T_{\exp(-Et)\cdot \square}(p))_*F-(T(p))_*F}{t}\\
&=\lim_{t\to0}\frac{(T_\square(p)\circ\exp(-Et))_*F-(T(p))_*F}{t}\\
&=\lim_{t\to0}\frac{(T(p))_*(\exp(-Et))_*F-(T(p))_*F}{t}\\
&=(T(p))_*\lim_{t\to0}\frac{(\exp(-Et))_*F-F}{t}\\
&=(T(p))_*\mathcal{L}_EF\\
&=(T(p))_*[E,F]\\
&=X_{[E,F]}
\end{split}
$$
其中我们使用 $T(p)$ 或 $T_\square(p)$ 来强调 $T(p):G\to\mathcal{M}$，$T_g$ 来强调 $T_g:\mathcal{M}\to\mathcal{M}$。证明过程实际上是利用 $T$ 作为群作用的性质，说明下图交换
$$
\begin{CD}
\mathfrak{g} @>T(p)_*>> \mathfrak{D}_G \\
@V{\exp(-Et)_*}VV @VV{(T_{\exp(-Et)})_*}V \\
\mathfrak{g} @>>T(p)_*> \mathfrak{D}_G
\end{CD}
$$
:::
::::
令 $H^i$ 为李代数的一组基，使得 $[H^i,H^j]=c^{ij}{}_k H^k$ 则很显然有 $[X_{H^i},X_{H^j}]=c^{ij}{}_kX_{H^k}$。

由这些无穷小的对称作用，我们可以获得一组局域的哈密顿量
$$
J_E=X_E\llcorner\omega
$$
由 Cartan 魔法公式
$$
0=\mathcal{L}_{X_E}\omega=d(X_E\llcorner\omega)+X_E\llcorner d\omega=dJ_E
$$
最左边的等号当且仅当在 $T_g$ 是辛作用时才恒成立。因此，若 $T_g$ 仅尊重给定哈密顿量的对称性，我们不能保证 $J_E$ 是闭形式，因而无法保证存在哈密顿量 $J_E=dQ_E$。在 $T_g$ 是辛作用时，由庞加莱引理一定在一个开集上存在 $J_E=dQ_E$。一般我们假设 $J_E$ 是一个确切形式，从而 $Q_E$ 是一个 $\mathcal{M}$ 上定义的哈密顿量[^4]。$Q_E$ 除一个积分常数外是良定义的。通过对李代数选取恰当的基，我们最多可以自由指定 $\dim G$ 个积分常数，从而使得 $Q_E$ 关于 $E$ 是线性的。

:::tip[动量映射]
在正式文献中，一般使用一个更加紧致的定义来囊括上述构造，这就是所谓的**动量映射**[^5]。

对于一个 $(\mathcal{M},\omega)$ 上的 $G$-作用，若存在映射 $\mu:\mathcal{M}\to\mathfrak{g}^*$ 使得
$$
d(\left<\mu,E\right>)=X_E\llcorner\omega
$$
则称 $\mu$ 为该作用的动量映射。其中 $\mathfrak{g}^*$ 是李代数 $\mathfrak{g}$ 的对偶，$\left<,\right>$ 是对偶空间的自然配对。

很显然，$\left<\mu,E\right>$ 就是我们上述构造的 $Q_E$，$\mu=Q_\square$。$\mu$ 至多差一个积分常数 $\mu_0=\xi_0\in\mathfrak{g}^*$。

若 $G$-作用是辛作用且存在动量映射，则称这个 $G$-作用是**哈密顿**的。

除此之外，我们还会要求 $\mu$ 是 $G$-等变的。这意味着 $\left<\text{Ad}^*_g\mu,E\right>\equiv\left<\mu,\text{Ad}_{g^{-1}}E\right>=(T_g)^*\left<\mu,E\right>$。
:::
:::info[例子：$\mathbb{R}^3$ 与 $SO(3)$]
我们考虑一个具体的例子：$\mathbb{R}^3$ 上的经典力学，此时辛流形为 $T^*\mathbb{R}^3\simeq \mathbb{R}^3\times\mathbb{R}^3$。我们取坐标 $(x,y,z,p_x,p_y,p_z)$，则辛形式为
$$
\omega=dx\wedge dp_x+dy\wedge dp_y+dz\wedge dp_z
$$
取 $R\in SO(3)$，$R$ 是一个 $3\times 3$ 实矩阵，令 $R$ 在 $T^*\mathbb{R}^3$ 上作用 $T_R$ 为
$$
\begin{pmatrix}x\\ y\\ z\end{pmatrix}\mapsto R \begin{pmatrix}x\\ y\\ z\end{pmatrix},\quad \begin{pmatrix}p_x\\ p_y\\ p_z\end{pmatrix}\mapsto R\begin{pmatrix}p_x\\ p_y\\ p_z\end{pmatrix}
$$
这是一个辛作用
$$
\begin{split}
(T_R)^*\omega&=\frac12\omega_{ij}\frac{\partial (T_Rx)^i}{\partial x^a}\frac{\partial (T_Rx)^j}{\partial x^b}dx^a\wedge dx^b\\
&=\sum_{i\in\{x,y,z\}}\omega_{i,p_i}\frac{\partial (Rx)^i}{\partial x^a}\frac{\partial (Rp)^i}{\partial p^b}dx^a\wedge dp^b\\
&=\sum_{i\in\{x,y,z\}}\omega_{i,p_i}R^i{}_aR^i{}_bdx^a\wedge dp^b\\
&=\delta_{ab}dx^a\wedge dp^b=\omega
\end{split}
$$
取 $\mathfrak{so}(3)$ 的生成元
$$
\Omega_1=\begin{pmatrix}
0 & 0 & 0 \\
0 & 0 & -1 \\
0 & 1 & 0
\end{pmatrix},\quad
\Omega_2=\begin{pmatrix}
0 & 0 & 1 \\
0 & 0 & 0 \\
-1 & 0 & 0
\end{pmatrix},\quad
\Omega_3=\begin{pmatrix}
0 & -1 & 0 \\
1 & 0 & 0 \\
0 & 0 & 0
\end{pmatrix}
$$
则 $X_{\Omega_i}=(\Omega_i)^a{}_bx^b\partial_a+(\Omega_i)^a{}_bp^b\partial_{p_a}$, $dQ_{\Omega_i}=(\Omega_i)^a{}_bx^bdp^a-(\Omega_i)^a{}_bp^bdx^a=-\epsilon^{iab}x^bdp^a+\epsilon^{iab}p^bdx^a=d(\epsilon^{iab}x^ap^b)$

因此这个$SO(3)$-辛作用是哈密顿的，$\theta=\theta^i\Omega_i$ 生成的哈密顿量为 $Q_\theta=(\mathbf{x}\times\mathbf{p})\cdot\begin{pmatrix}\theta_1\\ \theta_2\\ \theta_3\end{pmatrix}$，对应的动量映射 $\mu=\mathbf{x}\times\mathbf{p}$。

由于 $\text{Ad}^*_R\mu=R(\mathbf{x}\times\mathbf{p})$，而 $(T_R)^*\mu=(R\mathbf{x}\times R\mathbf{p})=R(\mathbf{x}\times\mathbf{p})$，$\mu$ 是等变的。$\mu$ 正是角动量。

需要注意等变性消除了角动量的积分常数冗余，这一点在之后变得重要。
:::

小结：我们通过一个辛作用的群 $G$ 得到了 $\dim G$ 个哈密顿量。在相容的情况下，$G$-作用给出的对称性导致了 $G$-作用的守恒量。辛几何更像是在描述动力学的空间上可以存在什么形式的守恒荷，而非从某个哈密顿量具有的形式导出可能的守恒量。这再次呼应了我们的困惑：我们习以为常给定的，被认为确定了整个系统的哈密顿量，真的具有特殊地位吗？一个思考这个问题的方向是，会不会其实所有哈密顿量都是由某种对称作用生成的？会不会所有守恒荷都诱导了某种群作用？直觉上，这个问题的答案应当是肯定的：毕竟我们当作能量的哈密顿量，正是时间平移导致的守恒荷。

我们来探究这个问题。给定某些哈密顿量 $Q^i$，每个 $Q^i$ 都生成对应的流 $X_{Q^i}$。无论如何我们都可以把 $X_{Q^i}$ 当作某个单参数子群的无穷小作用，因此这个问题其实本身是平凡的。一个更有趣的问题是：我们能不能从守恒荷之间的关系读出对称群本身的结构？由于群 $G$ 生成的哈密顿向量场构成 $\mathfrak{g}$ 的表示，我们很自然地想通过 $[X_{Q^i},X_{Q^j}]$ 还原 $\mathfrak{g}$。

事实上，由前文提到的重要引理，我们已经知道 $[X_{Q^i},X_{Q^j}]=X_{\{Q^i,Q^j\}}$ 了。我们可以通过对哈密顿向量场本身的计算更加确定这一点
::::info[引理]
对于任意向量场 $X$ 及微分形式 $\alpha$，有
$$
d\mathcal{L}_X\alpha=\mathcal{L}_Xd\alpha
$$
:::note[证明]
$$
\mathcal{L}_Xd\alpha=d(X\llcorner d\alpha)+X\llcorner d^2\alpha=d(X\llcorner d\alpha+d(X\llcorner\alpha))=d\mathcal{L}_X\alpha
$$
:::
::::
::::info[引理]
令 $\alpha$ 为任意微分形式，则
$$
\mathcal{L}_{[X,Y]}\alpha=[\mathcal{L}_X,\mathcal{L}_Y]\alpha=\mathcal{L}_X\mathcal{L}_Y\alpha-\mathcal{L}_Y\mathcal{L}_X\alpha
$$
:::note[证明]
$$
\begin{split}
\mathcal{L}_{[X,Y]}\alpha&=d([X,Y]\llcorner\alpha)+[X,Y]\llcorner d\alpha\\
&=d(\mathcal{L}_X(Y\llcorner\alpha)-Y\llcorner\mathcal{L}_X\alpha)+\mathcal{L}_X(Y\llcorner d\alpha)-Y\llcorner\mathcal{L}_Xd\alpha\\
&=d\mathcal{L}_X(Y\llcorner\alpha)+\mathcal{L}_X(Y\llcorner d\alpha)-(d(Y\llcorner\mathcal{L}_X\alpha)+Y\llcorner\mathcal{L}_Xd\alpha)\\
&=\mathcal{L}_X(d(Y\llcorner\alpha))+\mathcal{L}_X(Y\llcorner d\alpha)-(d(Y\llcorner\mathcal{L}_X\alpha)+Y\llcorner d\mathcal{L}_X\alpha)\\
&=\mathcal{L}_X\mathcal{L}_Y\alpha-\mathcal{L}_Y\mathcal{L}_X\alpha
\end{split}
$$
:::
::::
由上述引理：
$$
\mathcal{L}_{[X_{Q^i},X_{Q^j}]}\omega=\mathcal{L}_{X_{Q^i}}\mathcal{L}_{X_{Q^j}}\omega-\mathcal{L}_{X_{Q^j}}\mathcal{L}_{X_{Q^i}}\omega=0
$$
因此 $[X_{Q^i},X_{Q^j}]$ 仍然是哈密顿向量场，实际上就是 $\{Q^i,Q^j\}$ 的。我们可以通过对守恒荷不断计算泊松括号得到新的守恒荷。我们最多得到 $2n$ 个独立的守恒荷[^6]，其中最多有 $n$ 个两两相容的；在给定某个守恒荷 $H$ 的情况下最多还有 $2n-1$ 个与它相容的[^7]。对于一些守恒荷，通过加减一些常数，我们可能可以获得代数
$$
\{Q^i,Q^j\}=c^{ij}{}_kQ^k
$$
由此有 $[X_{Q^i},X_{Q^j}]=X_{\{Q^i,Q^j\}}=c^{ij}{}_kX_{Q^k}$。$c^{ij}{}_k$ 可以反过来理解成 $\mathfrak{g}$ 的结构常数，守恒荷也在泊松括号下构成了 $\mathfrak{g}$ 的表示。

特别地，$G$ 的作用与其他哈密顿量之间的相容性可以理解成生成其他哈密顿量的群（比如时间的平移群 $\mathbb{R}$）在 $\mathcal{M}$ 上的作用是交换的。或者说，当做一个更大的群 $G\times H$ 的作用。

### 可积系统

由于达布定理的存在，任何维数相同的相空间都具有局部上相同的结构，任何守恒荷都可以表示做 $q^i,p^i$ 的函数。我们可以选择 $Q=p^i$ 和 $Q=q^i$ 作为一组极大独立守恒荷，它们生成的守恒流结构非常简单：$p^i$ 生成沿着 $q^i$ 的平移，$q^i$ 生成沿着 $-p^i$ 的平移。达布定理在这里的作用是非常强的，$G$ 在任何流形上的辛作用都可以（在某些开集上）由达布定理写成 $q^i$ 和 $p^i$ 上作用的形式。这给我们提供了理解辛流形，或者说相空间结构的视角：相空间是由可能的物理状态和物理状态可能演化的方向组成的空间。达布定理告诉我们，物理状态和其演化总可以拆分成两两一对，使得一个演化方向只影响一个物理状态的自由度，即在辛形式意义下是“垂直”的。

“垂直”的性质非常美好，因为这意味着在考虑这一组自由度的演化时我们可以将其他自由度当作常数（但是它们生成的流并不重合）。然而我们需要考虑的问题并非总是能在达布定理意义下表现良好：有一个哈密顿量 $H$ 是给定的，我们需要考虑它的相流。同样的我们想要找出和 $H$ “垂直”的演化，这就是相容性条件。

我们在前文提出了疑问：在每一点上我们都能找出和 $H$ 垂直的余切矢量，那它们是否能来自真正的守恒荷呢？答案是，我们未必总能使 $\text{span}\{dH\}^\perp$ 由闭形式张成，因此并不是所有系统都能充分由守恒荷描述。系统在多大程度上能被守恒荷描述，被称为可积性。

一种最好的情况是我们找到了除 $H$ 外 $2n-2$ 个和 $H$ 相容的守恒荷。这种情况被称为**超可积系统**。超可积系统拥有太多对称性，以至于我们仅靠守恒荷就能唯一确定下来一个相流。所有一维动力学问题，开普勒问题，还有对称陀螺等，都属于超可积系统。

另一种较好的情况下，我们能找到 $n$ 个两两“垂直”的守恒荷，这些守恒荷的流实际上给出了一个正则坐标的 $p$ 部分[^8]。此时我们称这个系统是**可积**的。可积系统的 $n$ 个守恒荷约束出一个 $n$ 维的子流形，这个子流形，仿照李群中的命名，被称为环面。这些相互对易的作用将轨道在环面上演化，他们的哈密顿向量场拥有和李代数的 Cartan 子代数类似的地位[^9]。

如此来看，解出一个动力系统实际上是在寻找相容的守恒荷，而在最理想的情况下，这些守恒荷将组成一组正则坐标，使得系统在其上的演化是平凡的。这正是哈密顿-雅可比力学的观点，我们在后文会重新谈到这一点。

一般来说没有通用的算法使得我们得以遍历和 $H$ 相容的守恒荷，而诺特定理提供了一个很好的寻找守恒荷的方式。只要存在某个哈密顿的群作用与 $H$ 相容，则它的动量映射 $\mu$ 自动给出了 $\dim G$ 个和 $H$ 相容的守恒荷。这些守恒荷还继承了群本身的结构：它们生成的哈密顿流正是群作用对应的无穷小变换。

将守恒荷 $Q$ 理解成正则坐标的 $p$，对应 $q$ 的部分则实际上是 $Q$-相流的参数。$dQ$ 与 $X_Q$ 分别代表了这两个方向。$Q$ 可以理解成对应的 $q$ 的变换生成元。

### 约化动力系统

在有了等变的动量映射 $\mu$ 之后，便有手段得到“去除掉” $G$ 的辛空间 $\mathcal{M}$。

:::tip[辛约化]
考虑 $0\in\mathfrak{g}^*$ 的原像 $\mu^{-1}(0)$。由于等变性，对于任意 $p\in\mu^{-1}(0)$ 我们有 $\mu(T_g(p))=\text{Ad}^*_g\mu(p)=\text{Ad}^*_g0=0$。因此 $\mu^{-1}(0)$ 是 $G$-不变的。由此我们定义商流形 $\tilde{M}_G=\mu^{-1}(0)/G$。

假设 $G$ 自由且逆紧地作用在 $\mu^{-1}(0)$ 上，则 $\mu^{-1}(0)$ 和 $\mu^{-1}(0)/G$ 都是光滑流形。$\mathcal{M}$ 上的辛形式 $\omega$ 可以拉回到 $\mu^{-1}(0)$ 上，记作 $\hat{\omega}$，而由于 $G$-作用是辛同胚，$\hat{\omega}$ 在 $\mu^{-1}(0)/G$ 上也是良定义的。容易验证 $\hat{\omega}$ 也是辛形式。

我们称 $\tilde{M}_G$ 为 $G$-辛约化或者辛商，记作 $\mathcal{M}//G$，有 $\dim\mathcal{M}//G=\dim\mathcal{M}-2\dim G$。
:::

等变性让 $0$ 的原像变得特殊，这个情况对规范对称性而言十分重要。数学上只把这种情况称作辛约化，但对于其他原像，$\mu^{-1}(\xi_0)$，我们可以商去稳定化子 $G_{\xi_0}$。它们给出的其实就是物理中所说用守恒荷得到约化的物理系统。此时得到的约化维度为

$$
\dim\mathcal{M}-\dim G-\dim G_{\xi_0}
$$

若 $G$ 的作用与 $H$ 相容，则 $H$ 在 $\mathcal{M}//G$ 上仍然是良定义的。动力学被简化到少去 $G$ 提供的 $\dim G$ 个守恒量的问题上：由于垂直作用，$G$ 的守恒荷可以当作常数，用 $\mu^{-1}(0)$ 得到等值面；等值面上还存在 $G$ 的演化，由于 $H$ 的演化与 $G$ 的演化互不干扰，将 $G$-相流也进一步视作同一个点。正是这两个过程分别减去了 $\dim G$ 和 $\dim G_{\xi_0}$ 个自由度。对照上一节末尾，这两个操作分别在去除守恒荷的 $p$ 与 $q$。

::::info[例子：角动量]
我们尝试计算 $T^*\mathbb{R}^3//SO(3)$，$SO(3)$ 的作用在上文例子中给出。由于 $0$ 的原像在这个例子奇异，我们不做计算。

:::note
由于 $T^*\mathbb{R}^3$ 和 $\omega$ 的良好性质，我们可以想象 $\mathbf{x}$ 和 $\mathbf{p}$ 都是同一个 $\mathbb{R}^3$ 中的向量。在计算时 $\hat{\omega}$ 需要意识到它们其实分别是六维空间的一部分。
:::

按照定义 $\mu^{-1}(\mathbf{L}_0)=\{(\mathbf{x},\mathbf{p});\mathbf{x}\times\mathbf{p}=\mathbf{L}_0\}$，$SO(3)_{\mathbf{L}_0}=SO(2)$。可见 $\mu^{-1}(\mathbf{L}_0)/SO(2)$ 是过原点垂直于 $\mathbf{L}_0$ 的平面中满足 $xp\sin\left<\mathbf{x},\mathbf{p}\right>=L_0$ 的两个向量，模去平面内的旋转，换言之仅保留相对关系。

我们可以选择 $x$，$p$ 或 $\cos\left<\mathbf{x},\mathbf{p}\right>\equiv\cos\theta$ 中任意两个参数来描述剩余的自由度。为了方便我们计算 $\hat{\omega}$，我们选取一个平面中的正交基 $\{\mathbf{e}_1,\mathbf{e}_2\}$，并选取代表元 $\mathbf{x}=x\mathbf{e}_1$，则 $\mathbf{p}=p\cos\theta\mathbf{e}_1+p\sin\theta\mathbf{e}_2$。记平面到 $T^*\mathbb{R}^3$ 的嵌入映射为 $i$，则
$$
i^*\omega(\partial_x,\partial_p)=\omega(i_*\partial_x,i_*\partial_p)=\omega(e_1^i\partial_{x^i},e_1^i\cos\theta\partial_{p^i}+e_2^i\sin\theta\partial_{p^i})=e_1^2\cos\theta+\mathbf{e}_1\cdot\mathbf{e}_2\sin\theta=\cos\theta
$$
::::

[^1]: 这里的泊松括号取朗道《力学》中的定义。
[^2]: 敏锐的读者已经注意到，我们在量子力学中对这种操作驾轻就熟。
[^3]: $\text{Stab }(p)$ 常常是一个正规子群，因此可以考虑 $G/\text{Stab }(p)$。
[^4]: 在 $\mathcal{M}$ 是余切丛 $T^*\mathcal{C}$ 的情况下，若 $\mathcal{C}$ 的第一上同调群是平凡的，那便没有这个问题。
[^5]: 在一些文献中，动量映射被误译称为 _moment map_。
[^6]: “独立”指不存在某些守恒荷为另一些守恒荷的函数。对于任何微分流形而言，若 $df$ 之间有线性关系，都会使得 $f$ 不独立。
[^7]: 对此感到困惑的读者可以了解有辛形式的线性代数，因为如上论断完全基于 $\omega^{-1}$ 在余切空间上的性质。
[^8]: 当然也可以认为是对应 $q$，只是我们习惯性将 $p$ 与对称性的生成元联系起来。
[^9]: 不如说，整个哈密顿力学的构造都和李群十分相似。
