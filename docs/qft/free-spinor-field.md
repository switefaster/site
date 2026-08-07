---
sidebar_position: 4
title: "Free Spinor Field"
---

# Free Spinor Field

If you are familiar enough to the relativistic quantum mechanics, or you simply read previous sections carefully, you know about the Dirac field and the Spin-Statistics Theorem. As indicated in the section title, we will not talk about generic fermions but instead only the Dirac field. Following the route of quantizing scalars, some perhaps can't wait to write down the Lagrangian for the Dirac field and canonically quantize it. For those people: another disappointment for you! While that is what we will do later, we will first do some tedious maths and clarify what is the spin of fields we've been constantly talking about.

## Representation Theory

The necessity of studying the spins of particles traces down to the Poincare symmetry respected by all relativistic field theories. Therefore, it is worth studying how to implement the symmetry in quantum systems.

Although motivated by Poincare symmetry, the whole formalism is generic and thus we will be working as general as possible. We will assume some group $G$ is behind the scene to describe the nature of the symmetry, backed by almost all cases in physics. 

We know that a quantum state is uniquely represented by a ray $\mathcal{R}$ in the Hilbert space, and the only observables are the transition probability $P(\mathcal{R}_a\to\mathcal{R}_b)$. Consider conducting a symmetry transformation $g\in G$, and then the two rays are morphed into new ones, denoted by $\mathcal{R}^\prime_a$ and $\mathcal{R}^\prime_b$, respectively. We can formally write

$$
\begin{cases}
        \mathcal{R}^\prime_a=U(g)\mathcal{R}_a\\
        \mathcal{R}^\prime_b=U(g)\mathcal{R}_b
    \end{cases}
$$

Note that we are not assuming anything about $U(g)$ yet, its merely a mapping between rays, labeled by a group element $g$. It is more convenient to work with a selected representative within the rays, namely a vector $\ket{\Psi}$ normalized by $\braket{\Psi}{\Psi}=1$, which is our good ol' state vector, instead of referring to the whole equivalent class $\mathcal{R}=\{\lambda\ket{\Psi};\lambda\in\mathbb{C}\backslash\{0\}\}$. We can then regard $U(g)$ as some mappings between Hilbert space vectors. As proved by Wigner, the condition that $U(g)$ should not alter the transition probability implies that $U(g)$ are either:

1. *Unitary*
$$
    \braket{U(g)\Psi}{U(g)\Phi}=\braket{\Psi}{\Phi}
$$

and *linear* 
$$
    U(g)(a\ket{\Psi}+b\ket{\Phi})=aU(g)\ket{\Psi}+bU(g)\ket{\Phi}
$$
2. Or *anti-unitary*
$$
    \braket{U(g)\Psi}{U(g)\Phi}=\braket{\Phi}{\Psi}=\braket{\Psi}{\Phi}^*
$$
and *anti-linear*
$$
    U(g)(a\ket{\Psi}+b\ket{\Phi})=a^*U(g)\ket{\Psi}+b^*U(g)\ket{\Phi}
$$

The suspicious anti- case occurs because they describe *time-reversal* related symmetries, and we will just omit them[^1]. This means that we can happily treat $U(g)$ as a unitary linear operator between Hilbert spaces, and the amplitudes are preserved so as to preserve the probabilities.

What if we conduct two subsequent symmetry transformations? The action of $U(g^\prime)U(g)$ should be indistinguishable from $U(g^\prime g)$ *as rays*. And the most general probability-preserving form we can write out is
$$
U(g^\prime)U(g)\ket{\Psi}=e^{i\phi(\Psi,g^\prime,g)}U(g^\prime g)\ket{\Psi}
$$

We can instinctly feel that $\phi$ should be independent of the state $\ket{\Psi}$ it is acting on, because the linearity disregard the vector they are acting on, and we expect a pure relation between operators. And yes, that's true, unless some superselection rules forbid us from forming superposition between two classes of vectors. In that case, the $\phi$ is only independent of the state within each classes, but we will ignore this edge case. What we arrive at is
$$
U(g^\prime)U(g)=e^{i\phi(g^\prime,g)}U(g^\prime g)
$$

If $\phi(g^\prime,g)=0$, then the above equation is the familiar defining equation saying $U(g)$ furnishes a unitary representation of the group $G$. With the annoying phase factor, arising precisely because we are considering transformation between *rays*, not vectors, we say $U(g)$ and $\phi(g^\prime,g)$ together furnish a (unitary) projective representation of $G$.

Let me briefly explain where the name projective comes from. Mathematicians love to call the space of rays (i.e., a linear space modulo non-zero multiplication) the projective space. Some famous examples are $\mathbb{CP}^n$ and $\mathbb{RP}^n$. In this regard, quantum theories are not quite described by Hilbert spaces, but by *projective* Hilbert spaces. And although we work with matrices every day, we cannot distinguish the actions between $A\in GL(\mathcal{H})$ and $\lambda A$, because they result in the same ray. This is mostly fine because we can fix the “gauge” by letting $|\lambda|^2=1$, and leftover phases are always removable by arguments similar to how we remove the dependence of $\Psi$ out of $\phi$. But in our case, the phase is related to how to encode the composition of group elements and can thus be nontrivial. Consequently, we are not representing the group onto $GL(\mathcal{H})$, but instead $GL(\mathcal{H})/\{\lambda I\}=PGL(\mathcal{H})$, the projective general linear group. This is why we call them projective representations. Luckily, they are closely related to the regular representation theories.

[^1]: If you are really curious, regard it as taking an extra conjugate after a regular linear transformation.
