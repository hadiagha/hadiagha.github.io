---
layout: page
title: Applied Reinforcement Learning
description: Business optimization and LLM fine-tuning — Manning Publications
permalink: /book/
updated: 2026-08-24
---

<div class="book-hero">
  <div class="book-hero-cover">
    <a href="{{ site.book.manning }}" rel="noopener">
      <picture>
        <source srcset="{{ '/assets/rl_book/ARL_Book_Cover.webp' | relative_url }}" type="image/webp">
        <img src="{{ site.book.cover | relative_url }}"
             width="640" height="640" loading="eager"
             alt="Cover of Applied Reinforcement Learning by Hadi Aghazadeh, published by Manning" />
      </picture>
    </a>
  </div>
  <div class="book-hero-text">
    <p class="eyebrow book-status">
      In {{ site.book.status }} — full release expected {{ site.book.release }}
    </p>
    <p class="book-lede">
      Most reinforcement learning material stops at games and simulations. This
      book is about the other part: framing a real business problem as a
      sequential decision problem, building an environment that respects its
      constraints, and getting a policy into production that people will
      actually trust.
    </p>
    <div class="book-actions">
      <a href="{{ site.book.manning }}" class="btn btn-primary" rel="noopener">
        Read it on Manning
      </a>
      <a href="{{ site.book.github }}" class="btn btn-outline" rel="noopener">
        {% include icon.html name="github" size=15 %} Code on GitHub
      </a>
    </div>
  </div>
</div>

## What it covers

The book works through reinforcement learning as a practical tool for
optimization problems — warehouse order picking, dynamic pricing, bin packing,
resource allocation, ad optimization, fuel scheduling, vehicle routing,
treatment optimization, data-centre cooling — and then extends the same
machinery to fine-tuning large language models.

You'll learn how to:

- Frame real business problems as Markov decision processes
- Design custom environments with domain constraints and reward engineering
- Apply classical and tabular methods — dynamic programming, bandits,
  Q-learning, SARSA and Monte Carlo tree search
- Move to deep RL with DQN and policy gradient methods for high-dimensional
  problems
- Fine-tune language models with PPO, GRPO and reinforcement learning from
  verifiable rewards

It assumes you know your business domain and can program at an intermediate
level. It does not assume graduate mathematics.

## Contents

### Part 1 — Fundamentals: building a reinforcement learning toolkit

| | Chapter |
|---|---|
| 1 | Real-world decision making with reinforcement learning |
| 2 | Markov decision process: turning problems into solvable models |
| 3 | Design custom environments for reinforcement learning algorithms |

### Part 2 — Reinforcement learning for business optimization

| | Chapter |
|---|---|
| 4 | Perfect knowledge, optimal policy: dynamic programming |
| 5 | Contextual bandit: optimizing stochastic one-step decisions |
| 6 | Tabular reinforcement learning |
| 7 | Monte Carlo tree search: searching with RL principles |

### Part 3 — Deep reinforcement learning for business optimization

| | Chapter |
|---|---|
| 8 | Deep Q-networks for high-dimensional data |
| 9 | The calculus of decisions: policy gradient methods |

### Part 4 — Reinforcement learning for LLM fine-tuning

| | Chapter |
|---|---|
| 10 | Fine-tuning large language models with PPO |
| 11 | Reinforcement learning with verifiable feedback using GRPO |
| 12 | Building RL systems: an LLM-guided agent for portfolio management |

## Code

Every chapter from 2 onwards has runnable code in the
[companion repository]({{ site.book.github }}), organized by chapter, along with
a notebook covering the Python you need for the business applications in the
book.

## Details

| | |
|---|---|
| **Publisher** | {{ site.book.publisher }} |
| **ISBN** | {{ site.book.isbn }} |
| **Status** | {{ site.book.status }}, full release expected {{ site.book.release }} |
| **Author** | Hadi Aghazadeh |

Chapters are released as they're finished through Manning's early access
program, so buying now gets you the current draft plus everything added between
now and release.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "{{ site.book.title }}",
  "alternateName": "{{ site.book.title }}: {{ site.book.subtitle }}",
  "author": { "@type": "Person", "name": "{{ site.author.name }}", "url": "{{ '/about/' | absolute_url }}" },
  "publisher": { "@type": "Organization", "name": "{{ site.book.publisher }}" },
  "isbn": "{{ site.book.isbn }}",
  "bookFormat": "https://schema.org/Paperback",
  "inLanguage": "en",
  "url": "{{ page.url | absolute_url }}",
  "image": "{{ site.book.cover | absolute_url }}",
  "sameAs": ["{{ site.book.manning }}", "{{ site.book.github }}"],
  "about": ["Reinforcement learning", "Operations research", "Mathematical optimization", "Large language models"]
}
</script>

<style>
/* Page-specific layout only. Everything typographic — the buttons, the eyebrow,
   the table rules — now comes from the stylesheet, so what used to live here
   has been deleted rather than restyled. */
.book-hero {
  display: grid;
  grid-template-columns: minmax(0, 13rem) minmax(0, 1fr);
  gap: var(--space-2xl);
  align-items: start;
  margin-bottom: var(--space-2xl);
  max-width: none;
}

.book-hero-cover img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md);
}

.book-hero-text { min-width: 0; }

.book-status { color: var(--sage); }

.book-lede {
  font-size: var(--step-1);
  line-height: 1.5;
  color: var(--ink-soft);
}

.book-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
}

/* The chapter list is a two-column table of numbers and titles: it wants the
   full measure and a narrow first column, not the max-content sizing that
   suits a data table. */
.prose table {
  display: table;
  width: 100%;
  max-width: var(--measure);
}

.prose td:first-child {
  width: 2.5rem;
  color: var(--ink-soft);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

@media (max-width: 48rem) {
  .book-hero {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-lg);
  }

  /* The cover centres; the prose does not. Centred body text is measurably
     harder to read, because every line starts in a different place. */
  .book-hero-cover {
    max-width: 12rem;
    justify-self: center;
  }
}
</style>
