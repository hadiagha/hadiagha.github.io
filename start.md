---
layout: page
title: Start here
description: A map of this site, for anyone arriving at it for the first time.
permalink: /start/
updated: 2026-08-24
---

This site is about **decision-making under uncertainty** — reinforcement
learning, mathematical optimization and forecasting, applied to systems where a
wrong decision costs real money.

It is not a survey of the field. It is what I have learned building these
systems and what I am working through now, written up while the details are
still fresh enough to be useful.

## If you have five minutes

Read the most recent post, then decide whether the rest is for you.

{% assign latest = site.posts.first %}
{% if latest %}
- **[{{ latest.title }}]({{ latest.url | relative_url }})** — {{ latest.description | default: latest.excerpt | strip_html | truncate: 160 }}
{% else %}
- Nothing published yet. The [RSS feed]({{ '/feed.xml' | relative_url }}) will tell you when there is.
{% endif %}

## If you came for reinforcement learning

I am writing a book about applying it: **[Applied Reinforcement
Learning]({{ '/book/' | relative_url }})** (Manning), in early access with full
release expected {{ site.book.release }}. It covers RL for business
optimization — warehouse logistics, dynamic pricing, routing, resource
allocation — through to fine-tuning language models with PPO, GRPO and
verifiable rewards.

The short version of why it exists: most RL material stops at games and
simulations, and the hard part is everything after that.

Posts on the subject are collected under
[reinforcement learning]({{ '/writing/' | relative_url }}?tag=reinforcement-learning).

## If you came for the research

I am a PhD candidate in Geomatics Engineering at the University of Calgary,
defending on **9 October 2026**, on hierarchical reinforcement learning for
real-time policy optimization — vehicle routing and disaster-response logistics
where demand is stochastic and a decision has to be made now rather than
optimally.

The [research page]({{ '/research/' | relative_url }}) lists every publication,
grouped by venue.

## If you came for the production side

The day job is forecasting locational marginal prices across more than 10,000
nodes in North American electricity markets, and researching large-scale
mixed-integer programming for security-constrained unit commitment. What that
teaches — about backtesting, about models that have to stay trustworthy for
years, about where learned methods actually beat exact ones — is most of what I
have to say that is not in a paper.

Start with [ML engineering]({{ '/writing/' | relative_url }}?tag=ml-engineering),
[forecasting]({{ '/writing/' | relative_url }}?tag=forecasting) and
[optimization]({{ '/writing/' | relative_url }}?tag=optimization).

Some of those are still empty — this site is being rebuilt, and the writing is
the part that comes next.

## How the writing is organised

Posts come in four kinds, and the label appears next to anything that is not a
plain article:

| Kind | What it is |
|---|---|
| Article | The default. A worked explanation, usually with code or mathematics. |
| Note | Shorter. Something I read, tried, or want to record before I forget it. |
| Review | A book, and whether it was worth the time. |
| Essay | About the work rather than the technique. |

[All writing]({{ '/writing/' | relative_url }}) can be filtered by kind and
topic. [Topics]({{ '/tags/' | relative_url }}) groups everything by subject.

## Keeping up

There is an [RSS feed]({{ '/feed.xml' | relative_url }}) and no newsletter,
no tracking pixel and no popup asking for your email. If you want to know when
something new appears, the feed is the whole mechanism.

## Getting in touch

I am glad to hear from people working on RL or optimization in production, and
from students trying to get started — [hadi@hadiaghazadeh.com](mailto:hadi@hadiaghazadeh.com),
or the links on the [contact page]({{ '/contact/' | relative_url }}). If you are
writing about something in this space, send it to me.
