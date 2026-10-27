---
title: "Reinforcement Learning Fundamentals: The Complete Guide From Scratch"
description: "My first PhiloAI video: every RL fundamental in one place, from MDPs and the Bellman equation to Q-learning, DQN, PPO and GRPO, each worked out by hand."
date: 2026-10-26
kind: article
tags: [reinforcement-learning, tutorial]
toc: false
math: false
image: /assets/posts/reinforcement-learning-fundamentals/rl-fundamentals-thumbnail.jpg
image_alt: "Video thumbnail reading All of RL, One Story: a dog with a bone at the start of a glowing grid path that avoids a -10 square and reaches a +10 square, with Hadi smiling beside it."
youtube_id: sETXPzXYzog
youtube_title: "Reinforcement Learning Fundamentals: The Complete Guide From Scratch"
youtube_date: 2026-10-25T20:22:17-07:00
youtube_poster: /assets/posts/reinforcement-learning-fundamentals/rl-fundamentals-thumbnail.webp
---

This is the first video on my YouTube channel, [PhiloAI](https://www.youtube.com/@philo_ai), and it covers all the fundamentals of reinforcement learning (RL) in one place, built from scratch.

When I wrote about [what I would write about on this blog]({{ '/blog/2026/09/02/why-i-write-and-what-i-will-write-about-on-this-blog/' | relative_url }}), one item on my list was teaching concepts in AI, RL, and optimization for which I had not found good teaching material. This video is my first real step in that direction, and it starts where everything else in RL starts.

Every advanced RL method you will meet later, such as DQN, PPO, AlphaZero, RLHF, and GRPO, is built on the same few ideas. Learn them once, properly, and the papers stop looking like a wall of jargon. So in this video, each idea starts from an everyday example, gets its official name second, and grows from a limitation of the idea before it. Every number on the screen is worked out by hand, then checked in a few lines of plain Python.

If you watch one video before anything else in RL, I would love it to be this one. By the end, you will have the whole map of reinforcement learning in your head, and you will know where each new method fits.

## What is inside

The fundamentals, in order:

- The agent–environment loop, and why RL is different from supervised learning
- Markov decision processes (MDPs), explained as a recipe card
- Return and the discount factor γ, explained as a melting receipt
- Policies, value functions, and the Bellman equation ("just ask the neighbors")
- Value iteration, policy iteration and generalized policy iteration (GPI)
- Exploration vs. exploitation: your favorite restaurant, or the new place?
- Monte Carlo vs. temporal difference (TD) learning: the GPS that doesn't wait
- SARSA vs. Q-learning, on-policy vs. off-policy, worked out by hand
- Deep Q-Networks (DQN), policy gradients (REINFORCE) and AlphaGo
- RLHF with PPO, and GRPO with verifiable rewards (DeepSeek-R1)
- A short history, from Thorndike's cats in 1898 to the 2024 Turing Award

## Chapters

Each link opens the video at that point on YouTube.

- [0:00](https://www.youtube.com/watch?v=sETXPzXYzog&t=0s) Intro
- [2:30](https://www.youtube.com/watch?v=sETXPzXYzog&t=150s) Learning without answers
- [6:36](https://www.youtube.com/watch?v=sETXPzXYzog&t=396s) Turning life into a game board
- [13:22](https://www.youtube.com/watch?v=sETXPzXYzog&t=802s) Keeping score
- [19:16](https://www.youtube.com/watch?v=sETXPzXYzog&t=1156s) Rulebooks & hunches
- [29:26](https://www.youtube.com/watch?v=sETXPzXYzog&t=1766s) No map? Learn by trying
- [39:46](https://www.youtube.com/watch?v=sETXPzXYzog&t=2386s) SARSA & Q-learning
- [49:27](https://www.youtube.com/watch?v=sETXPzXYzog&t=2967s) Bigger worlds: deep RL & LLMs
- [57:02](https://www.youtube.com/watch?v=sETXPzXYzog&t=3422s) A short history
- [1:01:45](https://www.youtube.com/watch?v=sETXPzXYzog&t=3705s) Recap
- [1:03:31](https://www.youtube.com/watch?v=sETXPzXYzog&t=3811s) Where to go from here

## The code, and the full versions

The Python behind every number on the screen is [on GitHub](https://github.com/hadiagha/philoai_codes/tree/main/rl-basics), and no libraries are needed: value iteration, policy iteration, TD control, a bandit, a policy-gradient step, and the GRPO advantage, each in its own short file.

If you want the full, real-world versions, every algorithm here is built end to end on real industry problems (ads, scheduling, routing, pricing, cooling, and LLM fine-tuning) in my book, [*Applied Reinforcement Learning: Business optimization and LLM fine-tuning*]({{ site.book.manning }}).

If something is unclear, or you think I got something wrong, I would love to hear it, either in the YouTube comments or [by email](mailto:{{ site.author.email }}). And subscribe if you want the next idea built from scratch too.

## Papers and books mentioned

- Thorndike (1898). Animal Intelligence. Psychological Review Monograph Supplements.
- Bellman (1957). Dynamic Programming. Princeton University Press.
- Samuel (1959). Some studies in machine learning using the game of checkers. IBM Journal of R&D.
- Howard (1960). Dynamic Programming and Markov Processes. MIT Press.
- Sutton (1988). Learning to predict by the methods of temporal differences. Machine Learning.
- Watkins (1989). Learning from Delayed Rewards. PhD thesis, University of Cambridge.
- Williams (1992). Simple statistical gradient-following algorithms for connectionist RL (REINFORCE). Machine Learning.
- Tesauro (1992). Practical issues in temporal difference learning (TD-Gammon). Machine Learning.
- Rummery & Niranjan (1994). On-line Q-learning using connectionist systems (SARSA). Cambridge tech. report CUED/F-INFENG/TR 166.
- Schultz, Dayan & Montague (1997). A neural substrate of prediction and reward. Science.
- Sutton & Barto (1998, 2nd ed. 2018). Reinforcement Learning: An Introduction. MIT Press.
- Mnih et al. (2015). Human-level control through deep reinforcement learning (DQN). Nature.
- Silver et al. (2016). Mastering the game of Go with deep neural networks and tree search. Nature.
- Schulman et al. (2017). Proximal Policy Optimization Algorithms. arXiv.
- Christiano et al. (2017). Deep reinforcement learning from human preferences. NeurIPS.
- Ouyang et al. (2022). Training language models to follow instructions with human feedback (InstructGPT). NeurIPS.
- Shao et al. (2024). DeepSeekMath (GRPO). arXiv.
- DeepSeek-AI (2025). DeepSeek-R1. Nature.
