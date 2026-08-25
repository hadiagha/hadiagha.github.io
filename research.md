---
layout: page
title: Research
description: Reinforcement learning for routing, logistics and real-time policy optimization
permalink: /research/
updated: 2026-08-24
---

My PhD research applies **hierarchical reinforcement learning to real-time
policy optimization** — routing and logistics problems where demand is
stochastic, the fleet is heterogeneous, and a decision has to be made now rather
than optimally.

The recurring question across this work is what to do when the exact method is
too slow to be useful. Classical operations research gives provably optimal
answers to problems that have usually stopped being the problem by the time the
solver finishes. Learned policies decide in milliseconds but come with no
guarantees. Most of my work lives in the space between: using learning to guide
search, or to produce a policy that respects the structure the exact methods
made explicit.

**PhD candidate, Geomatics Engineering, University of Calgary** — defending
**9 October 2026**, supervised by Xin Wang. GPA 4.0/4.0.

## Publications

### Journal articles

**HELP-RL: Real-Time Policy Optimization with Hierarchical Decoder for
Heterogeneous and Stochastic Disaster Response Logistics** (2026)
Aghazadeh, H., and Wang, X. — *Computers & Operations Research*

**Dray-Q: Demand-Dependent Trailer Repositioning Using Deep Reinforcement
Learning** (2023)
Aghazadeh, H., Wang, Y., Sun, B., and Wang, X. — *Transportation Research Part
C: Emerging Technologies*

### Conference and workshop papers

**Multi-Task Vehicle Routing with Hierarchical Option Learning** (2026)
Aghazadeh, H., and Wang, X. — *34th ACM SIGSPATIAL International Conference on
Advances in Geographic Information Systems*

**GAGE-Q: Reinforced Genetic Algorithm Using Spatial Neighborhood Graph
Embedding for Green Intermodal Transportation** (2025)
Aghazadeh, H., Safarzadeh, R., and Wang, X. — *Advances in Cartography and
GIScience of the ICA*

**Hierarchical Reinforcement Learning for Real-Time Policy Optimization in
Complex Logistics Networks** (2025)
Aghazadeh, H., and Wang, X. — *ACM KDD 2025, Supply Chain workshop, Toronto*

**Reinforcement Learning for Intermodal Transportation Planning with Time
Windows and Limited Cargo Capacity** (2023)
Aghazadeh, H., and Wang, X. — *ACM SIGSPATIAL International Workshop on
Computational Transportation*

### Book

**Applied Reinforcement Learning: Business optimization and LLM fine-tuning**
(2026)
Aghazadeh, H. — Manning Publications.
[Details]({{ '/book/' | relative_url }}) ·
[Publisher]({{ site.book.manning }})

For citations and the current list, see
[Google Scholar](https://scholar.google.ca/citations?user={{ site.author.social.google_scholar }}).

## Applied research

Some of the research happens at work rather than in a journal. At Enverus I
prototype large-scale **mixed-integer linear programming** for power-flow and
security-constrained unit commitment, and investigate **reinforcement-learning-guided
cutting-plane selection** — using a learned policy to decide which cuts are worth
adding, so branch-and-bound converges fast enough to be useful at market speed.

It's the same question as the routing work in a different domain: exact methods
know the structure, learned methods are fast, and the interesting result is
usually a combination rather than a winner.

## Service

Peer reviewer for machine learning, transportation, optimization and
spatial-computing journals. Vice President and Student Representative of the
Graduate Geomatics Group at the University of Calgary (2023–2024).

<style>
.page-content h3 {
  margin-top: var(--space-2xl);
  font-size: 1.25rem;
  color: var(--color-text-light);
  font-family: var(--font-sans);
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.page-content h3 + p {
  margin-top: var(--space-lg);
}

.page-content h3 ~ p strong {
  display: block;
  font-size: 1.0625rem;
  line-height: 1.45;
  margin-bottom: 0.15rem;
}
</style>
