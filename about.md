---
layout: page
title: About
description: Reinforcement learning, optimization and forecasting — mostly in production
permalink: /about/
updated: 2026-08-26
---

I would love to solve practical problems using data-driven approaches. I try my best not to confine myself to certain specific yet limited tools and solutions and rather use the best suitable solution for the problem in hand but through my data science and machine learning career, I mostly worked on **decision-making under uncertainty** type of applications. In practice that means
reinforcement learning, mathematical optimization and forecasting — usually
applied to systems where a wrong decision costs real money, and where the
textbook version of the method turns out to need considerable adjustment before
it survives contact with production.

If you're thinking about working together, **[how I
work]({{ '/user-manual/' | relative_url }})** covers the practical side — what
I'm useful for, what I'm not, and how to get the most out of a conversation.

## What I'm working on

I'm a **Senior Data Scientist at [Enverus](https://www.enverus.com/)**, where I
own the end-to-end development and operation of **locational marginal price
forecasting across thousands of nodes** in US and Canadian
electricity markets — feature engineering, applied research, distributed
training, deployment, APIs, monitoring and the unglamorous maintenance that
keeps a forecast trustworthy.

Alongside the forecasting work I research using graph neural networks for interventional forecasting along with large-scale **mixed-integer linear
programming** for power-flow and security-constrained unit commitment, including
using reinforcement learning to guide cutting-plane selection — teaching a
solver which cuts are worth adding, so branch-and-bound converges faster on
problems that are otherwise intractable at market speed.

Before Enverus I was a machine learning engineer at **Bits in Glass**, in which I contributed building a
hierarchical RAG platform over 20 million oil-and-gas documents and a dynamic
fuel-pricing system that combined integer programming with contextual bandits.
Earlier still I built RL-based **surge pricing at Snapp**, the largest
ride-hailing platform in the Middle East, running across roughly 200,000 orders
a day. My [CV]({{ '/cv/' | relative_url }}) has the full history.

## Research

I have **PhD Geomatics Engineering at the University of Calgary**, and **BSc and MSc in Industrial Engineering** from top universities in Iran (Amirkabir University of Technology and IUST). My research applies hierarchical reinforcement
learning to real-time policy optimization — vehicle routing, disaster-response
logistics and transportation problems where demand is stochastic, the fleet is
heterogeneous, and a decision has to be made now rather than optimally.

Published work appears in *Computers & Operations Research*, *Transportation
Research Part C*, ACM SIGSPATIAL and the KDD supply-chain workshop. The
[research page]({{ '/research/' | relative_url }}) lists everything.

## The book

I'm the author of **[Applied Reinforcement Learning]({{ '/book/' | relative_url }})**
(Manning), currently in early access with full release expected January 2027. It
covers RL for business optimization — warehouse logistics, dynamic pricing,
routing, resource allocation — through to fine-tuning language models with PPO,
GRPO and verifiable rewards.

I wrote it because most RL material stops at games and simulations. The gap
between a working policy in a clean environment and one that holds up against
real constraints, messy data and stakeholders who need to understand the
decision is where the actual difficulty lives, and it deserved a book.

This site is where the shorter-form version of that lives: articles and
tutorials, notes on papers I'm reading, implementations, and occasional writing
about the professional side of doing this work. Some of it is paired with videos
on my YouTube channel, [PhiloAI](https://www.youtube.com/@philo_ai).

## Elsewhere

- **Email** — [hadi@hadiaghazadeh.com](mailto:hadi@hadiaghazadeh.com)
- **Google Scholar** — [publications and citations](https://scholar.google.ca/citations?user=maIEW1AAAAAJ)
- **GitHub** — [hadiagha](https://github.com/hadiagha)
- **LinkedIn** — [hadi-aghazadeh](https://www.linkedin.com/in/hadi-aghazadeh)
- **YouTube** — [@philo_ai](https://www.youtube.com/@philo_ai)
- **X** — [@hadi_aghazadeh](https://x.com/hadi_aghazadeh)

I'm always glad to hear from people working on RL or optimization in production,
and from students trying to get started. If you're writing about something in
this space, send it to me — I'd rather read your work than another press release.

Before a first project, [how I work]({{ '/user-manual/' | relative_url }}) is
worth five minutes.
