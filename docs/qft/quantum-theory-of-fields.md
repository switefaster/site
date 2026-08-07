---
sidebar_position: 1
title: "QFT: Quantum Theory of Fields"
---

# QFT: Quantum Theory of Fields

## Why Fields?

It is well known today that all fundamental particles in the world are described by different fields, or more precisely, “excitation” of those fields. Such an idea is already quite curious. How on earth could quantum particles, known as “small packets of energy”, be regarded as fields, which are objects extending throughout the spacetime? It appears more frustrating for those who have learned quantum mechanics, where we already know how to describe a system of quantum particles through wave functions and the Schrödinger equation. It is natural to ask: why bother? The answer is simple: we had to.

Many excellent works tackled that question from different aspects, so I will not go deep into it. I will list some important points.
- **Causality**. The old-fashioned Schrödinger equation failed to incorporate the spacetime structure defined by special relativity. Hence, a new theory is needed to describe physics in the regime where both relativistic and quantum effects are significant.
- **Unconserved Particle Numbers**. The classical quantum mechanics also does not play well with changing particle numbers, which is known to happen in experiments (decaying, colliders, etc.). As we shall see, it is natural to describe those behaviors once a correct interpretation of quantum fields is made.
- **Identicality**. From your quantum mechanics course, you learned that particles of the same type are indistinguishable and further classified into bosons and fermions. That is nicely explained if we convince ourselves that all the same particles are part of the same field.

Of course, the reasons for studying the quantum theory of fields go far beyond the listed points. See the first chapter of Weinberg's book [Weinberg 2005](./overview.md#references) for a thorough historical review, and refer to the first few chapters of Coleman's lecture [Coleman 2018](./overview.md#references) for a pedagogical perspective.

Nevertheless, we can grasp the clue of a field description of quantum physics from the old relativistic quantum mechanics. Let's introduce the *Dirac equation*, which is a milestone in the development of QFT.[^1]

The so-called “covariant form” of the Dirac equation reads

$$
(i\gamma^\mu\partial_\mu-m)\psi=0
$$

where $\gamma^\mu$ are the Dirac matrices.

Originally, Dirac interpreted $\psi$ in the equation as a wave function of an electron. However, this equation suspiciously resembles a field equation, rather than a Schrödinger-ich equation. The same thing also happened when pursuing quantum mechanics for relativistic spinless particles, which is kind of an implication of covariance. Today, we know that the quantized Dirac equation is indeed the correct description of spin-$\frac{1}{2}$ particles[^2]. As we move on, we will see how one recovers this equation of the “wave function” from the field theory approach. Another important implication of the Dirac equation is the existence of antiparticles, which historically first appeared as the *hole theory* and the *Dirac sea*. We will come back to them later.

## How Particles are Fields?

 Hopefully, you are convinced of the necessity of describing particles in terms of fields. However, it is still unknown how to understand a field as particles. We can receive some intuition by working on the simplest field[^3].

$$
(\square^2+m^2)\phi=0
$$

This is the famous Klein-Gordon equation. If I tell you that this equation will describe some particles, what property would that particle enjoy? You may first try solving it through a Fourier transformation

$$
\phi(\mathbf{x},t)=\int d^3\mathbf{p}\,\Phi(\mathbf{p},t)e^{-i\mathbf{p}\cdot x}
$$

which reduces the equation to

$$
\partial_t^2\Phi(\mathbf{p},t)+(\mathbf{p}^2+m^2)\Phi(\mathbf{p},t)=0
$$

This shows that the solutions of the Klein-Gordon equation are a superposition of a family of harmonic oscillators labeled by $\mathbf{p}$. Indeed, this is why we call the field that satisfies the Klein-Gordon equation a “free field”. It is a jargon that means that the frequency modes of the field are decoupled, which is later recognized as the described particles are free of interaction. Things will be even clearer when we further inspect its decoupled frequency modes

$$
\phi(x^\mu)=\int d^4p\,\Phi(p^\mu)e^{ip\cdot x}
$$

That reduces the equation to an algebraic one

$$
p^\mu p_\mu=m^2
$$

This equation, in its core, is the dispersion relation of the equation. But it also takes the form of the energy-momentum relation of an on-shell relativistic particle with mass $m$. The identification of the component of $p^\mu$ is also natural: $p^0$ is the Fourier conjugate of $t$, and $p^i$ are the Fourier conjugate of $\mathbf{x}$. Those are directly related to the energy and momentum in the quantum sense. This hints to us that we are on the right track, so let us push on.

Following the general idea of quantum mechanics, we should now quantize this theory by leveraging the $c$-number field $\phi(x^\mu)$ to a Hermitian operator $\hat{\phi}(x^\mu)$. More precisely, what we are working with is a family of Hermitian operators $\hat{\phi}$ labeled by spacetime coordinates $x^\mu$. A measurement at some point $x^\mu$ will collapse the state into one with a definite eigenvalue of $\hat{\phi}(x^\mu)$, as usual. The hat on the operator is dropped unless there are ambiguities.

We can think about the consequences of the quantization. We know that classically, the Klein-Gordon equation describes a family of harmonic oscillators. When we quantize an uncoupled set of harmonic oscillators, we know every degree of freedom, best known as normal modes, is provided with a ground state $\ket{0}_i$ with nonzero energy $\frac12\omega_i$. Energy is added to the system as quanta and must be a multiple of $\omega_i$. The Klein-Gordon equation is not an exception, but the integer index $i$ is replaced by the continuous $\mathbf{p}$. The Hilbert space of the field configuration is a monstrous tensor product of all the Hilbert spaces of individual modes. We then guess, naturally, that the Hamiltonian of the quantized Klein-Gordon field should look like

$$
\mathbf{H}=\int d^3\mathbf{p}\,\omega_\mathbf{p} a^\dagger_\mathbf{p}a_\mathbf{p}=\int d^3\mathbf{p}\,\sqrt{\mathbf{p}^2+m^2} a^\dagger_\mathbf{p}a_\mathbf{p}
$$

where we introduced the creation-annihilation operator $a^\dagger_\mathbf{p}$ and $a_\mathbf{p}$ for each modes. The ground-state energy is discarded because it will be infinitely large after integration, and we only care about the difference in energy anyway. The Hamiltonian counts how many times each mode is excited by $N_\mathbf{p}=a^\dagger_\mathbf{p}a_\mathbf{p}$ and adds them.

We will later concretely derive this Hamiltonian, and it is right. Now we shall focus on its interpretation. The quantization of the Klein-Gordon field forces us to add energy to the system in quanta, to modes labeled $\mathbf{p}$, which insert an energy of $\sqrt{\mathbf{p}^2+m^2}$ into the system. Naturally, we can think of them as states with a different number of particles, and those particles have definite momentum $\mathbf{p}$, providing an energy of $\sqrt{\mathbf{p}^2+m^2}$. The system is free in the sense that the excited modes do not interact with each other; they just stay in place. Physically, one imagines a group of particles with definite momenta flying straight in space and doing nothing else. Later, when we add interactions to the system, the harmony is destroyed, and $\mathbf{p}$ is no longer a good quantum number.

We can try to recover the familiar wave function description. What we can now create in the vacuum, with precisely one creation operator, is a state of definite momentum. One can build the one-particle wave packet by a superposition of such states.

One last question before we move on. What does the field operator $\phi$ mean in this context? This is more subtle than you would have expected. The quantization provided a discretized excitation of the field, but they are represented in terms of the normal modes. Thinking from the wave packet aspect, which is closer to our classical intuition, the amplitude of the field roughly represents the number of particles (i.e., how strongly the field is excited), and the speed of the wave packet represents the momentum.

[^1]: We employ the unit system $c=\hbar=1$
[^2]: This “quantization of wave function” caused physicists before the establishment of QFT to think about “second quantization”, which is inaccurate from the modern perspective and few are using it now
[^3]: The sign convention is $(+---)$
