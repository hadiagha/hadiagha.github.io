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
    <p class="book-status">
      {% include icon.html name="circle-notch" %}
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
        {% include icon.html name="book-open" %} Read it on Manning
      </a>
      <a href="{{ site.book.github }}" class="btn btn-outline" rel="noopener">
        {% include icon.html name="github" %} Code on GitHub
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
.book-hero {
  display: grid;
  grid-template-columns: minmax(0, 260px) minmax(0, 1fr);
  gap: var(--space-2xl);
  align-items: start;
  margin-bottom: var(--space-2xl);
}

.book-hero-cover img {
  width: 100%;
  height: auto;
  border-radius: 0.75rem;
  box-shadow: var(--shadow-lg);
  display: block;
}

.book-status {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-light);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  padding: var(--space-xs) var(--space-md);
  border-radius: 999px;
  margin-bottom: var(--space-md);
}

.book-lede {
  font-size: 1.125rem;
  line-height: 1.7;
}

.book-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-top: var(--space-lg);
}

.page-content table {
  width: 100%;
  border-collapse: collapse;
  margin: var(--space-md) 0 var(--space-xl);
}

.page-content table td {
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--color-border);
  vertical-align: top;
}

.page-content table td:first-child {
  width: 3rem;
  color: var(--color-text-light);
  font-variant-numeric: tabular-nums;
}

@media (max-width: 768px) {
  .book-hero {
    grid-template-columns: minmax(0, 1fr);
    justify-items: center;
    text-align: center;
  }

  .book-hero-cover {
    max-width: 220px;
  }

  .book-actions {
    justify-content: center;
  }
}
</style>
