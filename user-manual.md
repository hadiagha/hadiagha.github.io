---
layout: page
title: Working with me
description: How I work, what I'm useful for, and how to get the most out of a conversation
permalink: /user-manual/
updated: 2026-08-25
---

<div class="manual-note">
  <p>
    A short, honest account of how I work — written so that colleagues,
    collaborators and students don't have to spend three months working it out.
    It describes tendencies, not rules. If something here doesn't match how a
    particular project needs to run, say so and we'll do it differently.
  </p>
</div>

## What I actually do

I build systems that make decisions under uncertainty and have to keep making
them after the launch demo. Right now that means **locational marginal price
forecasting across more than 10,000 nodes** in North American electricity
markets — end to end, from feature engineering through distributed training and
deployment to the monitoring and maintenance that keep a forecast trustworthy.

Alongside that I research large-scale **mixed-integer programming** for
power-flow and security-constrained unit commitment, and I'm finishing a PhD on
**hierarchical reinforcement learning** for routing under uncertainty.

Before this: a hierarchical RAG platform over 20 million oil-and-gas documents
and a dynamic fuel-pricing system at Bits in Glass, and RL-based surge pricing
at Snapp, running across roughly 200,000 orders a day.

The through-line is the gap between a method that works in a paper and one that
works on Tuesday morning with real data and a stakeholder who needs to
understand the decision.

## How to reach me

**Email — [hadi@hadiaghazadeh.com](mailto:hadi@hadiaghazadeh.com).** It's the
channel I actually read. I'm in Calgary, so Mountain Time.

For a meeting, email first with a short description of the topic and a few
times that work. I'd rather read two paragraphs beforehand and arrive with
something useful than spend the first twenty minutes establishing what we're
talking about.

A note on the next while: I'm **defending my PhD on 9 October 2026** and
finishing a book. I'm slower than I'd like to be until then. If something is
time-sensitive, say so in the subject line.

## How I work

**I think in writing.** If an idea can't survive being written down, it usually
wasn't ready. A written problem statement — even a rough one — gets a better
answer out of me than a meeting invitation with no agenda.

**I want the problem before the solution.** Tell me what's actually going wrong
and what it costs. If you lead with the method you've picked, I'll probably ask
you to back up, not because the method is wrong but because I can't tell yet
whether it is.

**I'm sceptical of results I can't reproduce**, including my own. Expect
questions about the baseline, the split, and what happens on the days the model
gets it wrong. This isn't distrust; it's the fastest way I know to find out
whether something is real.

**I'd rather ship something simple that holds.** A linear model someone
understands and maintains beats a clever one nobody can debug at 2am. I'll
argue for the boring option more often than you might expect from someone who
works on reinforcement learning.

## What I'm useful for

- Framing a messy business problem as a sequential decision problem — or
  telling you it isn't one, which happens at least as often
- Forecasting systems that have to run unattended and stay trustworthy
- Optimization and operations research: where exact methods still win, and
  where learned ones can guide them
- Reviewing a modelling approach before it becomes six months of work
- Explaining any of the above to people who don't do it for a living

## What I'm less useful for

- Front-end work, design and infrastructure outside the ML path
- Anything that needs a decision this hour — I'm better with a day to think
- Being the person who says a project is fine when I don't think it is

## Feedback

I'll be direct about the work and careful about the person. If I think an
approach is wrong I'll say so plainly and explain why, and I'll change my mind
in public when the evidence goes the other way.

Please be equally direct with me. Vague approval isn't useful, and I'd much
rather find out that something is broken from you than from production.

## If you're a student

Write to me. I've been a teaching assistant for Engineering Design, Programming
with Data and Spatial Data Mining, I've built courses on contextual bandits and
reinforcement learning for operations research, and I review for machine
learning, transportation, optimization and spatial-computing journals. Teaching
keeps me honest — it's hard to hand-wave through an explanation when someone is
about to run the code.

You don't need a polished question. "I tried this and it didn't work and I
don't know why" is a perfectly good email.

## Things I believe that shape the work

- Most reinforcement learning material stops exactly where the difficulty
  starts, which is why I wrote a book about the rest of it
- A model that nobody trusts is not deployed, whatever the dashboard says
- Backtests that can't reproduce a bad week are decoration
- The constraint you forgot is more expensive than the objective you optimized

<div class="manual-note manual-note--footer">
  <p>
    Written {{ page.updated | date: "%B %Y" }}. It'll be wrong eventually — if
    we've worked together and it doesn't match your experience,
    <a href="mailto:{{ site.author.email }}">tell me</a> and I'll fix it.
  </p>
</div>

<style>
.manual-note {
  padding: var(--space-lg) var(--space-xl);
  background-color: var(--color-bg-secondary);
  border-left: 4px solid var(--color-primary);
  border-radius: 0 0.5rem 0.5rem 0;
  margin-bottom: var(--space-2xl);
}

.manual-note p {
  margin: 0;
  color: var(--color-text-light);
}

.manual-note--footer {
  margin-top: var(--space-3xl);
  margin-bottom: 0;
}
</style>
