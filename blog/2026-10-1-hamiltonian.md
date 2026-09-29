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
令 $2n=\dim\mathcal{M}$，考虑 $\Omega=\omega^n$，我们证明 $\Omega$ 是 $\mathcal{M}$ 上的体积形式。

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

$\theta$ 是 $T^*\mathcal{N}$ 上的 $1$-形式。接下来，我们对重言 $1$-形式取外微分。在不引起歧义的情况下，我们仍用 $dq^i$ 和 $dp^i$ 作为 $T_m^*T^*\mathcal{N}$ 的基。
$$
d\theta=\sum_i dp^i\wedge dq^i\equiv-\omega
$$
按惯例，我们添加了一个负号。我们宣称 $\omega$ 是 $T^*\mathcal{N}$ 上的辛形式
:::info[证明]

1. $\omega$ 是非退化的：由表达式 $\omega=\sum_i dq^i\wedge dp^i$ 显然
2. $\omega$ 是闭的：由于 $d^2=0$，且 $\omega=-d\theta$， 显然

:::
因此任何流形的余切丛上都存在辛结构。

### 达布定理

### 哈密顿量

下文我们陈述的内容在任意辛流形上都是成立的。为了说服读者任意辛流形与我们在余切丛上构造的辛结构没有本质的不同，我们不做证明地介绍辛几何最重要的定理之一：达布定理
:::tip[达布定理]
给定任意辛流形 $(M,\omega)$ 上任意点 $p\in M$，则必定存在其邻域 $U$，使得在 $U$ 上存在坐标卡 $(p^i,q^i)$，使得
$$
\omega=\sum_i dq^i\wedge dp^i
$$
:::
注意到这是一个极强的性质。与黎曼几何的正则坐标只能在单点上令度规回归平坦形式 $\eta$ 不同，达布定理表明任意辛结构都具有完全相同的结构，被正则坐标 $(p,q)$ 描述。不同辛流形的区别仅能体现在辛流形全局的性质上，例如拓扑。这有时也被称作辛几何的刚性。

我们考虑在辛流形上放置一个光滑函数 $H(p,q)$，称为哈密顿量。我们定义哈密顿向量场 $X_H$
:::tip[哈密顿向量场]
哈密顿向量场 $X_H$ 满足
$$
X_H\llcorner\omega=dH
$$
或者等价的
$$
X_H=dH\llcorner\omega^{-1}
$$
:::
沿着 $X_H$ 生成的流被称为哈密顿流，或者相流。由定义以及 Cartan 魔法公式立刻可以注意到相流有趣的性质
:::tip[Cartan 魔法公式]
对于任意向量场 $X$ 及微分形式 $\Theta$，其李导数有恒等式
$$
\mathcal{L}_X\Theta=d(X\llcorner\Theta)+X\llcorner d\Theta
$$
:::
::::info[性质]
:::note[哈密顿量守恒]
$$
\mathcal{L}_{X_H}H=X_H(H)=dH(X_H)=\omega(X_H,X_H)=0
$$
:::
:::note[正则性]
$$
\mathcal{L}_{X_H}\omega=d(X_H\llcorner\omega)+X_H\llcorner d\omega=d(dH)+X_H\llcorner 0=0
$$
:::
:::note[刘维尔定理]
由正则性注意到
$$
\mathcal{L}_{X_H} (dp^n\wedge dq^n)=\mathcal{L}_{X_H}(\frac{1}{n!}\omega^n)=0
$$
即体积形式 $dp^n\wedge dq^n$ 沿哈密顿向量场生成的流守恒。
:::
::::
以上种种性质表明，哈密顿流给出了辛流形上一系列保持辛结构以及哈密顿量的微分同胚。由守恒性质不难看出，每一条流都始终处在哈密顿量的某个等值面 $H(p,q)=E$ 上。

### 正则方程

对于初次接触这种形式化定义的物理系读者而言，上述表述定让人感到既熟悉又陌生。这一方面是由于物理学家在写出正则方程时，不会显式地表明背后存在一个辛结构；同时也是因为上述描述里并不存在时间。事实上，第二点在某种程度上反而捕捉到了哈密顿力学的核心。我们接下来通过对照来说明这一点。

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
这正是泊松括号。对比正则方程[^4]
$$
\frac{df}{dt}=\{H,f\}
$$
不难意识到二者之间的对应关系为 $\frac{df}{dt}=\mathcal{L}_{X_H}f$。换言之，我们考虑的时间参数 $t$ 仅是哈密顿流的自然参数化。

这引出了哈密顿力学的核心：我们感兴趣的是守恒量，或者说运动积分，以及其对应的相流。在这个意义上，时间并不具有特殊地位，仅仅是标记我们称之为哈密顿量的守恒量的哈密顿流的参数。事实上，我们可以将任何运动积分当作上述讨论的“哈密顿量”，从而得到其相流。例如动量守恒时，$H(p,q)=p$，而对应的参数正是位置 $p$。真实的物理轨迹正是这些不同“哈密顿量”，或者说运动积分，等值面的交。由于我们知道哈密顿流已经给出了真实的物理轨迹，余下的运动积分必定需要满足某些性质，从而使得哈密顿流也处于他们的等值面上。而这个性质很显然就是
$$
\text{G在H-相流上等值}\iff\mathcal{L}_{X_H}G=0\iff\omega^{-1}(dH,dG)=0\iff\mathcal{L}_{X_G}H=0\iff\text{H在G-相流上等值}
$$

由于 $\omega^{-1}$ 是非退化的，给定 $dH$ 后 $\omega^{-1}(dH,dG)=0$ 的解必定是 $2n-1$ 维，且解集中一定含 $dG=dH$，也就是一定存在除 $H$ 外的 $2n-2$ 个独立的守恒量。这共计 $2n-1$ 个守恒量的等值面将限定出一个 $1$ 维子流形，也就是物理轨迹。

以上的讨论很难不让人去思考一个问题：两个运动积分 $H$ 与 $G$ 给出的相流分别是什么？他们给出的相流是相同的吗？若是不同，那什么把哈密顿量的相流又置于了特殊地位呢？