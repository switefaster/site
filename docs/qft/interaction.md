---
sidebar_position: 3
title: "The Pandora Box: Interaction"
---

# The Pandora Box: Interaction

If you wish, we could go on and carry out every detail of the quantum free scalar, i.e., it is exactly solved. But that's too much for us. All the introduced devices in the previous section are enough to let us peek into the world of interacting field theories, meaning that the fields are no longer decomposed into decoupled wave modes. In our interpretation where excitation of modes are recognized as particles, this indicates interaction between them: as time elapses, modes can cease or arise in accord to each other. However, all those interpretations usually only make sense when the interactions are small, so the theory can be thought as modified upon the free theory, or equivalently, free particles. And indeed, we will only work with perturbative interactions, though another important reason for that is nobody knows how to properly deal with strongly coupled quantum fields.

Even if we are to work with perturbative calculations, the interacting theories are incredibly complicated, and we will inevitably run into the problem of infinities and renormalization. In fact, one would fairly say that the entire complication of QFT comes from interactions. In this section, we will avoid renormalization as much as possible, and focus on introducing the formalism. Even in this case, there are still many things to say.

## The Interaction Picture

We all know that the Schrödinger picture involves evolving states and stationary operators, while the Heisenberg picture involves stationary states and evolving operators. The key idea of the interaction picture is that, find a way to evolve both the states and the operators, so that the time evolution looks as if only part of the Hamiltonian is relevant. We denote a Schrödinger picture state by $\ket{\Psi(t)}_S$. Also, we assume a Hamiltonian of the form

$$
H=H_0+H_\text{int}
$$

Although the separation of the Hamiltonian is arbitrary, we conventionally separate it into a free part and an interaction part.

Then, we define the transformation from the Schrödinger picture to the interaction picture, with identification at $t=t_0$

$$
\ket{\Psi(t)}_I=\exp{\{iH_{0,S} (t-t_0)\}}\ket{\Psi(t)}_S\quad\ket{\Psi(t_0)}_I=\ket{\Psi(t_0)}_S
$$

and the corresponding transformation of operators

$$
\mathcal{O}_I(t)=\exp{\{iH_{0,S} (t-t_0)\}}\mathcal{O}_S\exp{\{-iH_{0,S} (t-t_0)\}}
$$

With all the rules, we can now transform the Schrödinger equation

$$
\begin{aligned}
    i\frac{\ket{\Psi(t)}_I}{dt}&=i\frac{d\left(\exp{\{iH_{0,S} (t-t_0)\}}\ket{\Psi(t)}_S\right)}{dt}\\
    &=-\exp{\{iH_{0,S} (t-t_0)\}}H_{0,S}\ket{\Psi(t)}_S+i\exp{\{iH_{0,S} (t-t_0)\}}\frac{\ket{\Psi(t)}_S}{dt}\\
    &=-\exp{\{iH_{0,S} (t-t_0)\}}H_{0,S}\exp{\{-iH_{0,S} (t-t_0)\}}\exp{\{iH_{0,S} (t-t_0)\}}\ket{\Psi(t)}_S\\
    &\quad+\exp{\{iH_{0,S} (t-t_0)\}}H_S\exp{\{-iH_{0,S} (t-t_0)\}}\exp{\{iH_{0,S} (t-t_0)\}}\ket{\Psi(t)}_S\\
    &=-H_{0,I}(t)\ket{\Psi(t)}_I+H_{I}(t)\ket{\Psi(t)}_I\\
    &=H_{\text{int},I}(t)\ket{\Psi(t)}_I
    \end{aligned}
$$

Although not that important, we can directly read off the evolution of the operator from the definition of transformation

$$
i\frac{d\mathcal{O}_I(t)}{dt}=\comm{\mathcal{O}_I(t)}{H_{0,I}(t)}
$$

much like the Heisenberg picture.

The transformed Schrödinger equation can be solved iteratively by

$$
\begin{aligned}
        \ket{\Psi(t)}_I&=\left(1+i\int_{t_0}^t H_{\text{int},I}(\tau)d\tau+i^2\int_{t_0}^t\int_{t_0}^\tau H_{\text{int},I}(\tau)H_{\text{int},I}(\tau^\prime)d\tau^\prime d\tau+\cdots\right)\ket{\Psi(t_0)}_I\\
        &=\left(1+i\int_{t_0}^t H_{\text{int},I}(\tau)d\tau+\frac{i^2}{2!}\int_{t_0}^t\int_{t_0}^t T\left[H_{\text{int},I}(\tau)H_{\text{int},I}(\tau^\prime)\right]d\tau^\prime d\tau+\cdots\right)\ket{\Psi(t_0)}_I\\
        &=T\left[\exp{\left\{i\int_{t_0}^t H_{\text{int},I}(\tau) d\tau\right\}}\right]\ket{\Psi(t_0)}_I
    \end{aligned}
$$

The first line can be checked to solve the equation by direct differentiation, and in the second line we inserted the time ordering to unify the interval of integral, with a $\frac{1}{n!}$ accounting for the multiplicity. The third line is a compact way to denote this.

This is the celebrated **Dyson series**, the explicit evolution of states in the interaction picture, which is also significant in time dependent perturbation. It is worth pointing out that so far every results are exact and non-perturbative, but this scheme is especially suitable for perturbation because if $H_\text{int}$ is controlled by some small parameter $\epsilon$, then the Dyson series make explicit the contributions of different orders of $\epsilon$ into the time evolution, and one can reasonably cutoff at some finite order of $\epsilon$ to get perturbative results.

## Physical Vacuum

It is time to utilise the device to the real scalar theory. Let us introduce an interaction to the Klein-Gordon field by modifying the Lagrangian density as

$$
\mathcal{L}=\frac12\partial^\mu\phi\partial_\mu\phi-\frac12 m^2\phi^2-\frac{\lambda}{4!}\phi^4
$$

so that the corresponding $\mathbf{H}_\text{int}$ is

$$
\mathbf{H}_\text{int}=\int d^3x\,\frac{\lambda}{4!}\phi^4
$$

Here we begin to enjoy the first elegance provided by the interaction picture: since the operators are just evolved with the free part, the time-dependent $\phi(x)$ we worked out is still available, just with the creation and annihilation operators in it replaced with the corresponding interaction picture one. For this is the general case, we will drop the subscripts indicating pictures without ambiguity.

But we also run into our first problem: what is the vacuum now? Note that we have two “vacua", one that is annihilated by the annihilation operator $\annhil{a}{p}\ket{0}=0$, and another that is the lowest-energy eigenstate of the full Hamiltonian. In free theories, the two coincides. But since we modified the Hamiltonian, we can no longer expect that[^1], and the *de facto* vacuum we should look for is, of course, the latter one, which we will call it the physical vacuum[^2]. However, the creation annihilation description is too good to dispose, and it is pleasing if we can find the relation between the two.

For convenience, we will denote the evolution operator by

$$
U(t,t_0)\equiv T\left[\exp{\left\{i\int_{t_0}^t \mathbf{H}_{\text{int}}(\tau) d\tau\right\}}\right]
$$

and the energy eigenstate of the full Hamiltonian by $\ket{\Omega}$ and $\ket{n}\,n\geq1$. Then if we evolve the free vacuum $\ket{0}$

$$
U(t,t_0)\ket{0}=\braket{\Omega}{0}e^{-iE_0(t-t_0)}\ket{\Omega}+\sum_{n=1}^\infty \braket{n}{0}e^{-iE_n(t-t_0)}\ket{n}
$$

It is satisfying if states with higher energy would die out. In principle, we can imagine a process where the interaction is turned off (i.e. $\lambda=0$) at some distant past, and then adiabatically turned on, so that the ground state evlolved to the ground state. We can implement this without being rigorous by pushing $t_0$ to the far past while it takes on a small imaginary part (characterizing the dissipation caused by the adiabatic process).

$$
\lim_{T\to (1-i\epsilon)\infty}U(t,-T)\ket{0}=\braket{\Omega}{0}e^{-iE_0(t+T)}\ket{\Omega}
$$

We can repeat the process for $\bra{\Omega}$

$$
\bra{0}U(t,t_0)^\dagger=\bra{\Omega}\braket{0}{\Omega}e^{iE_0(t-t_0)}+\sum_{n=1}^\infty \bra{n}\braket{0}{n}e^{iE_n(t-t_0)}
$$

$$
\lim_{T\to (1-i\epsilon)\infty}\bra{0}U(T,t)=\bra{\Omega}\braket{0}{\Omega}e^{-iE_0(T-t)}
$$

Therefore, we have isolated the physical vacuum

$$
\begin{cases}
    \ket{\Omega}=\lim_{T\to (1-i\epsilon)\infty}(\braket{\Omega}{0}e^{-iE_0(t+T)})^{-1}U(t,-T)\ket{0}\\
    \bra{\Omega}=\lim_{T\to (1-i\epsilon)\infty}(\braket{0}{\Omega}e^{-iE_0(T-t)})^{-1}\bra{0}U(T,t)
\end{cases}
$$

From which, we can, for example, calculate the vacuum norm

$$
\braket{\Omega}{\Omega}=\lim_{T\to (1-i\epsilon)\infty}\frac{\bra{0}U(T,-T)\ket{0}}{\left|\braket{\Omega}{0}\right|^2e^{-2iE_0T}}\stackrel{?}{=}1
$$

Which is appropriately independent of $t$, the current time reference. However, it consists of unknown quantities such as $\braket{\Omega}{0}$ and a suspicious phase for the physical vacuum energy, which, usually, should in principle be fine because we will set this to $1$ for normalization. A more solid reasoning is that, when we later calculate the $n$-point correlation function, we will divide the entire expectation value with this normalization, and the expectation value indeed contains the exact same factor, that is safely quotiented, so no annoying phase will survive.

One last thing to remark here is that the imaginary time $i\epsilon$ is somehow identified with the $i\epsilon$ prescription of the Feynman propagator, as we will see later.

## Wick Theorem

We made the physical vacuum available in last subsection, and we can proceed to work out more interesting quantities. One family of such quantities is the $n$-point correlation functions, as mentioned before, which we here formally define it as the vacuum expectation value of the time-ordered product of $n$ fields. For example, the below is a $3$-point correlation function

$$
\bra{\Omega}T[\phi(x)\phi(y)\phi(z)]\ket{\Omega}
$$

Actually, the correlation functions are the only quantities relevant in QFT, in the sense that they contain all the data needed to obtain observables, especially the $S$-matrix, which is the core observable of QFT.

With that being said, we now try to work out the simplest correlation function, the $2$-point correlation function. You might wonder why we care not the $1$-point correlator. In $\phi^4$ theory, we don't worry about it because it will turn out to be $0$. In other $\phi$-to-an-odd-number theories, it will apparently have non-zero values, but it will eventually be fixed to $0$, by renormalization, anyway.

We express the $2$-point function in free vacuum

$$
\lim_{T\to (1-i\epsilon)\infty}\frac{\bra{0}U(T,t)T\left[\phi(x)\phi(y)\right]U(t,-T)\ket{0}}{\left|\braket{\Omega}{0}\right|^2e^{-2iE_0T}}
$$

But wait! There are three time labels here, the reference time for the adiabatically constructed vacuum $t$, and the time label of time-evolved $\phi$, $x^0$ and $y^0$. For the vacuum to make any sense, operators must be defined on $t$, so there actually exists hidden time evolution. Without loss of generality, we assume $x^0>y^0$

$$
\begin{aligned}
        &\lim_{T\to (1-i\epsilon)\infty}\frac{\bra{0}U(T,t)U(x^0,t)^\dagger\phi(x)U(x^0,t)U(y^0,t)^\dagger\phi(y)U(y^0,t)U(t,-T)\ket{0}}{\left|\braket{\Omega}{0}\right|^2e^{-2iE_0T}}\\
        =&\lim_{T\to (1-i\epsilon)\infty}\frac{\bra{0}U(T,x^0)\phi(x)U(x^0,y^0)\phi(y)U(y^0,-T)\ket{0}}{\left|\braket{\Omega}{0}\right|^2e^{-2iE_0T}}\\
        =&\lim_{T\to (1-i\epsilon)\infty}\frac{\bra{0}T\left[\phi(x)\phi(y)\exp{\left\{i\int_{-T}^T \mathbf{H}_{\text{int}}(\tau) d\tau\right\}}\right]\ket{0}}{\left|\braket{\Omega}{0}\right|^2e^{-2iE_0T}}
    \end{aligned}
$$

The time order manifest itself and combined to a big one! After dividing by the normalization $\braket{\Omega}{\Omega}$, we are left with

$$
\lim_{T\to (1-i\epsilon)\infty}\frac{\bra{0}T\left[\phi(x)\phi(y)\exp{\left\{i\int_{-T}^T \mathbf{H}_{\text{int}}(\tau) d\tau\right\}}\right]\ket{0}}{\bra{0}T\left[\exp{\left\{i\int_{-T}^T \mathbf{H}_{\text{int}}(\tau) d\tau\right\}}\right]\ket{0}}
$$

This is much simpler. All we need to consider now is how to evaluate the free-vacuum expectation of time-ordered product of operators. Or more precisely, product of field operators, since $\mathbf{H}_\text{int}$ is no more than a string of field operators as well. Due to the nature that the free vacuum can be annihilated, the most obvious idea is to try to commutate the creation and annihilation operators in the operator product until we get a sum of normal ordered operator products. Then, any operator product that still contains annihilation or creation operators will vanish, simply because $\annhil{a}{p}\ket{0}=\bra{0}\crea{a}{p}=0$. Our goal is clear now: find the relation between time ordered operator products and normal ordered operator products. This is the essence of **Wick Theorem**.

For we are simply working with the field operator, we denote the creation operator and the annihilation operator part of it, respectively, by $\phi_+$ and $\phi_-$. Then the normal ordering is simply all $\phi_+$ to the left and all $\phi_-$ to the right.

We begin by finding out what we get by flipping $\phi_-(x)\phi_+(y)$

$$
\begin{aligned}
    \comm{\phi_-(x)}{\phi_+(y)}=&\int\frac{d^3\mathbf{p}}{(2\pi)^3\sqrt{2E_\mathbf{p}}}\frac{d^3\mathbf{p^\prime}}{(2\pi)^3\sqrt{2E_\mathbf{p^\prime}}}e^{-ip\cdot x+ip^\prime\cdot y}\comm{\annhil{a}{p}}{\crea{a}{p^\prime}}\\
    =&\int\frac{d^3\mathbf{p}}{(2\pi)^3 2E_\mathbf{p}}e^{-ip\cdot(x-y)}\\
    =&D(x-y)
    \end{aligned}
$$

Therefore, $\phi_-(x)\phi_+(y)=\phi_+(y)\phi_-(x)+D(x-y)$. We now,consider a time ordered product of field operators $\{\phi(x_n)\}$, by requiring $x^0_i>x^0_j$ for $i<j$. For the case $n=2$, the result is trivial

$$
\begin{aligned}
        \phi(x_1)\phi(x_2)&=\left(\phi_+(x_1)+\phi_-(x_1)\right)\left(\phi_+(x_2)+\phi_-(x_2)\right)\\
        &=\phi_+(x_1)\phi_+(x_2)+\phi_+(x_1)\phi_-(x_2)+\phi_-(x_1)\phi_+(x_2)+\phi_-(x_1)\phi_-(x_2)\\
        &=\phi_+(x_1)\phi_+(x_2)+\phi_+(x_1)\phi_-(x_2)+\phi_+(x_2)\phi_-(x_1)+\phi_-(x_1)\phi_-(x_2)+D(x_1-x_2)\\
        &=\nomo{\phi(x_1)\phi(x_2)}+D(x_1-x_2)
    \end{aligned}
$$

For $n=3$

$$
\begin{aligned}
        \phi(x_1)\phi(x_2)\phi(x_3)&=\left(\phi_+(x_1)+\phi_-(x_1)\right)\left(\phi_+(x_2)+\phi_-(x_2)\right)\left(\phi_+(x_3)+\phi_-(x_3)\right)\\
        &=\left[\nomo{\phi(x_1)\phi(x_2)}+D(x_1-x_2)\right]\nomo{\phi(x_3)}\\
        &=\nomo{\phi(x_1)\phi(x_2)}\phi_+(x_3)+\nomo{\phi(x_1)\phi(x_2)}\phi_-(x_3)+D(x_1-x_2)\nomo{\phi(x_3)}\\
        &=\nomo{\phi(x_1)\phi(x_2)\phi(x_3)}\\
        &\qquad+D(x_2-x_3)\nomo{\phi(x_1)}+D(x_1-x_3)\nomo{\phi(x_2)}+D(x_1-x_2)\nomo{\phi(x_3)}
    \end{aligned}
$$

From below, we demand ascending $x_i$ within $\phi_\pm$, respectively, to avoid overcounting in normal ordered products. When we succeedingly append new field operators to the product, by provoking the ordered pattern for shorter products, we only need to flip terms of the form
$$
    \nomo{\phi(x_1)\phi(x_2)\cdots\phi(x_n)}\phi_+(x_{n+1})
$$
because$\nomo{\phi(x_1)\phi(x_2)\cdots\phi(x_n)}\phi_-(x_{n+1})$ is already properly ordered. In doing so, we only need to consider different sequences of $\prod_{0<\sigma_1<\sigma_2<\cdots<\sigma_k\leq n}\phi_-(x_{\sigma_i})$ present in each terms, where $k$ can range from $1$ to $n$. For each of such sequences

$$
\begin{aligned}
    &\quad\phi_-(x_{\sigma_1})\phi_-(x_{\sigma_2})\cdots\phi_-(x_{\sigma_k})\phi_+(x_{n+1})\\
    &=\phi_-(x_{\sigma_1})\cdots\phi_-(x_{\sigma_{k-1}})\phi_+(x_{n+1})\phi_-(x_{\sigma_k})+\phi_-(x_{\sigma_1})\cdots\phi_-(x_{\sigma_{k-1}})D(x_{\sigma_k}-x_{n+1})\\
    &=\phi_-(x_{\sigma_1})\cdots\phi_-(x_{\sigma_{k-2}})\phi_+(x_{n+1})\phi_-(x_{\sigma_{k-1}})\phi_-(x_{\sigma_k})\\
    &\qquad+\phi_-(x_{\sigma_1})\cdots\phi_-(x_{\sigma_{k-2}})\phi_-(x_{\sigma_k})D(x_{\sigma_{k-1}}-x_{n+1})+\phi_-(x_{\sigma_1})\cdots\phi_-(x_{\sigma_{k-1}})D(x_{\sigma_k}-x_{n+1})\\
    &=\phi_+(x_{n+1})\phi_-(x_{\sigma_1})\phi_-(x_{\sigma_2})\cdots\phi_-(x_{\sigma_k})\\
    &\qquad+\sum_{i=1}^k\phi_-(x_{\sigma_1})\cdots\phi_-(x_{\sigma_{i-1}})\phi_-(x_{\sigma_{i+1}})\cdots\phi_-(x_{\sigma_k})D(x_{\sigma_i}-x_{n+1})
\end{aligned}
$$

By applying this to all terms, all are now again properly ordered, but with some extra $D(x_i-x_{n+1})$ produced by removing $\phi_-(x_i)$ from the products. Note, however, if we collect all operator products for a single $D(x_i-x_{n+1})$, we will realize that they uniquely iterate over all possible ascending operator products without $\phi_-(x_i)$. Therefore, what one actually obtain is

$$
\begin{aligned}
\nomo{\phi(x_1)\phi(x_2)\cdots\phi(x_n)}\phi_+(x_{n+1})=\phi_+(x_{n+1})\nomo{\phi(x_1)\phi(x_2)\cdots\phi(x_n)}\\+\sum_{i=1}^nD(x_i-x_{n+1})\nomo{\phi(x_1)\cdots\phi(x_{i-1})\phi(x_{i+1})\cdots\phi(x_n)}
\end{aligned}
$$

This applies to extending the conversion of time ordering immediately. Since, from the $n=2$ case, we know the commutation results in some normal ordered products multiplied by some propagators $D(x_i-x_j)$. Therefore, if we append a new field, the tuning of $\phi_+(x_{n+1})$ to the proper position yields more similar terms by removing one of the existing field and multiplying by a new propagator. Another technical issue is that we have fixed the time in order of $x_i$ in the derivation, but we generally work with time ordering surrounding field products with unknown time order. This can be easily mended, because we know if we consider $T\left[\phi(x_i)\phi(x_j)\right]$, we get $D(x_i-x_j)$ for $x^0_i>x^0_j$, and $D(x_j-x_i)$ for $x^0_i<x^0_j$, by the definition of time ordering and the virtue of our derivation. But this is simply the definition of the Feynman propagator the referenced equation! So, even with time ordering, everything still work by replacing $D$ using $D_F$. Hence, we can now officially state the celebrated **Wick Theorem**

:::info[Definition: Wick Contraction]
$$
\wick{\nomo{\phi(x_1)\cdots\c1\phi(x_i)\cdots\c1\phi(x_j)\cdots\phi(x_n)}}=\nomo{\phi(x_1)\cdots\cancel{\phi(x_i)}\cdots\cancel{\phi(x_j)}\cdots\phi(x_n)}D_F(x_i-x_j)
$$
:::

:::tip[Theorem: Wick Theorem]
The time ordering of field operators is equal to the sum of **all** possible Wick contractions multiplied by the normal ordering of the leftover field operators.
:::

:::note[Proof]
Repeat the process on $n=2$ to get arbitrary $n$.
:::

We explicitly write down the Wick theorem for four operators, as a showcase.

$$
\begin{aligned}
        T\left[\phi(x_1)\phi(x_2)\phi(x_3)\phi(x_4)\right]=&\nomo{\phi(x_1)\phi(x_2)\phi(x_3)\phi(x_4)}+\nomo{\wick{\c1\phi(x_1)\c1\phi(x_2)\phi(x_3)\phi(x_4)}}\\
        &+\nomo{\wick{\c1\phi(x_1)\phi(x_2)\c1\phi(x_3)\phi(x_4)}}+\nomo{\wick{\c1\phi(x_1)\phi(x_2)\phi(x_3)\c1\phi(x_4)}}\\
        &+\nomo{\wick{\phi(x_1)\c1\phi(x_2)\c1\phi(x_3)\phi(x_4)}}+\nomo{\wick{\phi(x_1)\c1\phi(x_2)\phi(x_3)\c1\phi(x_4)}}\\
        &+\nomo{\wick{\phi(x_1)\phi(x_2)\c1\phi(x_3)\c1\phi(x_4)}}+\nomo{\wick{\c1\phi(x_1)\c1\phi(x_2)\c1\phi(x_3)\c1\phi(x_4)}}\\
        &+\nomo{\wick{\c2\phi(x_1)\c1\phi(x_2)\c2\phi(x_3)\c1\phi(x_4)}}+\nomo{\wick{\c2\phi(x_1)\c1\phi(x_2)\c1\phi(x_3)\c2\phi(x_4)}}
    \end{aligned}
$$

The benefit of Wick theorem is huge. Thanks to the normal order, we can immediately identify what actually contributes to the correlation functions: those contractions that leave no fields behind.

For example, working up to first-order $\lambda$ in Dyson series for the numerator of the referenced equation

$$
\begin{aligned}
    \bra{0}T\left[\phi(x)\phi(y)\left\{1+i\int_{-T}^T\mathbf{H}_\text{int}(\tau)d\tau\right\}\right]\ket{0}&=\bra{0}T\left[\phi(x)\phi(y)\right]\ket{0}\\+\frac{i\lambda}{4!}\int_{-T}^T\int d\tau d^3\mathbf{z}\bra{0}&T\left[\phi(x)\phi(y)\phi(\tau,\mathbf{z})\phi(\tau,\mathbf{z})\phi(\tau,\mathbf{z})\phi(\tau,\mathbf{z})\right]\ket{0}\\
    =D_F(x-y)+\frac{i\lambda}{4!}\int d^4z&\cancel{\bra{0}}\left\{\nomo{\wick{\c1\phi(x)\c1\phi(y)\c1\phi(z)\c1\phi(z)\c1\phi(z)\c1\phi(z)}}+\cdots\right\}\cancel{\ket{0}}\\
\end{aligned}
$$

Where we omitted other full contractions of $6$ operators in the ellipsis. You can write them all down if you are diligent, or if you wish to practice Wick theorem. But we lazy students in physics find it too tiresome and stupid to always do so, especially when contractions with and within the interaction term give many identical $D_F$ because they are evaluated at the same spacetime point. Is there any easy way to keep track of all classes of non-trivial contractions?

Yes, there is! And it is our first encounter with the most iconic object of QFT, the ingenious **Feynman diagram**. Although, the one we will be using for the correlation functions is slightly different from the most orthodox Feynman diagram, which is for scattering amplitude, that we will introduce later. Following Coleman, we will call this version of diagram as the **Wick diagram**.

## Wick Diagram

The key idea of the Wick diagram is simple: lines are contractions. To be specific, we will depict the same spacetime point as dots, or vertices. Then, whenever a contraction happens between two operators, we add lines, or edges, that connect the two vertices. In this way, the identical contractions due to operators at the same point is manifestly accounted for because such operators are represented by a single point by construction, so that we can focus on how distinct contractions occur. Let's see some examples.

<figure className="qft-figure">
  <img src="/img/qft/feynman/propagator.svg" alt="A scalar propagator joining the spacetime points x and y" />
  <figcaption>Propagator Diagram</figcaption>
</figure>

This is the most trivial example, only inserting the fields in the correlation function, and contracting them. In other words, it represents

$$
\bra{0}T\left[\phi(x)\phi(y)\right]\ket{0}=D_F(x-y)
$$

But this is too simple. Let's consider some terms that is included in the first-order $\lambda$ expansion

<figure className="qft-figure">
  <img src="/img/qft/feynman/two-point-one-loop.svg" alt="A two-point correlation diagram with a loop attached to the central interaction vertex" />
  <figcaption>Two Point Correlation with 1-Loop</figcaption>
</figure>

This diagram collectively represents $\wick{\c2\phi(x)\c1\phi(y)\c2\phi(z)\c1\phi(z)\c1\phi(z)\c1\phi(z)}$, $\wick{\c2\phi(x)\c1\phi(y)\c2\phi(z)\c2\phi(z)\c1\phi(z)\c2\phi(z)}$, $\wick{\c1\phi(x)\c2\phi(y)\c1\phi(z)\c1\phi(z)\c1\phi(z)\c2\phi(z)}$, $\wick{\c2\phi(x)\c1\phi(y)\c1\phi(z)\c2\phi(z)\c1\phi(z)\c1\phi(z)}$, $\wick{\c3\phi(x)\c1\phi(y)\c2\phi(z)\c3\phi(z)\c1\phi(z)\c2\phi(z)}$, etc., in total $12$ terms, because one chooses $\phi(x)$ to contract with one of the four $\phi(z)$, and then chooses $\phi(y)$ to contract with one of the three $\phi(z)$ left, and the other two $\phi(z)$ must contract with each other. All of them evaluate to the same value $D_F(x-z)D_F(y-z)D_F(0)$. As you can see, with the Wick diagram, we will never need to explicitly write down all the $12$ contractions, yet still aware of what we are doing. You might feel some burden because of the $D_F(0)$, which should evaluate to $D(0)$, which is divergent. Sadly, at this point we can do nothing about it, and such divergences caused by loops are to be removed systematically by renormalization. If you investigate a little bit, you will notice that all two-point Wick diagrams for $\phi^4$ theory beyond $\lambda^0$ order (i.e., the figure below, the free propagator) necessarily contain at least one loop, so unfortunately we cannot evaluate them yet. However, there exists tree-level diagrams (i.e. without loop) for the four-point correlation function, so you can try it out.

Although we lack enough power to fight all of the loops, we can get rid of a special class of them. You might have noticed that there exists diagrams (even in the first order) such as

<figure className="qft-figure">
  <img src="/img/qft/feynman/first-order-bubble.svg" alt="A disconnected first-order vacuum bubble with two loops" />
  <figcaption>First Order Bubble</figcaption>
</figure>

These diagrams are characterized by the lacking of any external fields. Therefore, we can freely append any numbers of such diagrams to an existing $n$-pt diagram, and form a different $n$-pt diagram. Well, but isn't that stupid, because appending an disjoint diagram merely results in multiplying the corresponding contribution, and thus we can factor out those bubbles out of more meaningful $n$-pt diagrams? In other words, they merely provides an equal overall factor to all diagrams without bubbles. Actually, we have already taken account for that factor. Remember the ugly vacuum normalization factor? They appear as denominators in our definition of $n$-pt correlators. Of course, the vacuum normalization can be regarded as the $0$-pt correlator, and it, of course, contains only bubbles, and all of them, because it can be thought of as costructed by appending bubbles to nothing, in the same manner as to other $n$-pt diagrams. Therefore, we only need to evaluate those diagrams without bubbles, because of the normalization. Intuitively, the bubble diagrams represents how the free vacuum is lifted to the physical vacuum, and therefore should not enter the result because we are entirely working with physical vacuum now.

[^1]: If you are confused, think about adding extra terms to the quantum hamonic oscillator.
[^2]: Subtlety already arises here, because switching the vacuum somehow destroys the interpretation of particle numbers and the action of creation annihilation operators. For example: is the vacuum really free of particles? But this does not matter because we are not dealing with scattering in this section. We can only address this fact when we think about renormalization.
