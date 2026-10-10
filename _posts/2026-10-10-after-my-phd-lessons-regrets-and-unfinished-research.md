---
title: "After My PhD: Lessons, Regrets, and Unfinished Research"
description: "Four years and four months after arriving in Canada, I defended my PhD. A report to my future self: what I learned, what I got wrong, and what I left unfinished."
date: 2026-10-10
kind: essay
tags: [career, reinforcement-learning, operations-research]
toc: false
math: false
# updated: 2026-10-10          # set when you revise a published post
# series: some-series-key   # must exist in _data/series.yml
# series_part: 1
# image: /assets/posts/after-my-phd-lessons-regrets-and-unfinished-research/hero.png
# image_alt: "What the image shows, for screen readers and when it fails to load."
# youtube_id: dQw4w9WgXcQ   # bare ID, not a URL
# youtube_title: "Title of the companion video"
# canonical_url:            # only if this appeared somewhere else first
# featured: true            # pin to the curated list
---

On June 27, 2022, I arrived in Canada. I had been accepted to begin my PhD at the University of Calgary, and now I was finally there. I had left behind my family, my job, and basically everything I had fought for, to start again. This time, in a new country. I remember being full of passion and full of energy to start over, and to do what I loved to do.

I was so happy to have the chance to work on reinforcement learning (RL). It had been my passion during my last years in Iran.

In the early months, I worked madly, from seven in the morning until ten at night. I read some of the best books on RL along with many papers, and I finished the first draft of my first paper within six months. I was taking courses and doing research, motivated to do my best and produce something I could be proud of. It was a kind of personal project: I intended to go deep into RL and become an expert in it.

Now four years and four months have passed, and today I defended my PhD. Two papers in peer-reviewed, high-impact journals, two conference papers, and a few workshop papers were all the tangible outcomes. But what about the intangible ones?

<figure class="photo">
  <picture>
    <source srcset="{{ '/assets/posts/after-my-phd-lessons-regrets-and-unfinished-research/phd-defense.webp' | relative_url }}" type="image/webp">
    <img src="{{ '/assets/posts/after-my-phd-lessons-regrets-and-unfinished-research/phd-defense.jpg' | relative_url }}"
         alt="Two photos from my PhD defence. On the left, I stand with three members of my examining committee while others join by video call on the screen behind us. On the right, I hold a bouquet of flowers beside a guest, in front of my thesis title slide.">
  </picture>
  <figcaption>Defending <em>Learning Operational, Hierarchical, and Generalisable Structure for Adaptive Vehicle Routing</em>, October 2026.</figcaption>
</figure>

If all I had done was write papers, I would be a sheer loser. Four years of precious life for a few papers? No, definitely not. I tried my best to learn, to become a better researcher for the sake of research itself, and to stay an avid lifelong learner.

Now that I am standing at the edge of the exit door from academia, I feel hesitant. My main interest has always been solving real problems, and that naturally brought me to industry. But, my goodness, I love this damn research. I love discovering, building, and doing science.

What I do not love is the game people play for citations: standing in the middle of the road and begging you to add not just one, but three of their papers once they have agreed to review yours. That is exactly what happened to me with one of the reviewers of my papers. Why should the ceiling of a person's dreams and thinking be so low that they make themselves a prisoner of such small desires!

Luckily for me, I had, and still have, the opportunity to include research in my work. So I am almost certain that I will not return to academia in its current, classical form. But I want to, and I will, write more AI research papers, whether through submission, as preprints on arXiv, or here on my blog.

So I look back once more at the path I took, at where I failed and where I succeeded, and I am ready to recap. This is a report to myself and to my future self: this is what I did, not what I wanted to do.

And here is my report.

## My biggest lesson

I think the biggest thing I learned was how to do research.

It may sound silly, or even self-defeating, to claim that my biggest achievement was learning something I was supposed to know from the start. But those who have done serious research know that leading a project from the question, through formulation and scoping, through thousands of failed experiments, to publication, is like a maze with a thousand doors.

But I should mention that the hardest part is finding the right question to work on, given all the obligations that come with your source of funding and everything else.

Another lesson: as a researcher working at the edge of RL and optimization, the narrower the problem we solve, the less attention our work gets. A researcher needs to work on solutions that can solve many problems with one approach, not the opposite.

This comes back to the problem we choose to work on. It may seem obvious, but choosing the right problem, with all the constraints we have, is the most important and one of the hardest skills a researcher has to acquire.

Learning how to read papers is another skill a researcher like me has to learn: how to keep your head above water at this crazy speed, and amid the growing addiction to letting AI agents run the whole research process, while still keeping a sense of control.

## My biggest mistake

I wasted about a year working on problems that weren't that important, particularly wildfire disaster-response logistics.

That is not because the problem itself is unimportant. On the contrary, it is very important for humanity, and I should confess that I chose it because it mattered to Canada and to people. But when it came to submission, I had a hard time finding the right journals for research that proposed new strategies for disaster logistics. A few journals desk-rejected it because it did not fit their scope, and AI journals were reluctant to accept an application area they had so few publications on. In general, the community was not ready for new approaches.

Truth be told, there was also a weakness on my side. For the drayage problem behind my Dray-Q paper, I had a direct connection to reality: how a real-world carrier company does the work and what it needs. For the disaster-response project, I kind of engineered the situation. I had no firsthand experience of how disaster-response logistics operates in reality, so I read papers and tried to build a situation that resembled it. I also had no realistic data to compare against, so I used the closest thing possible, movement data from the Kelowna wildfire, and tried to convert it into a disaster-response logistics setting.

In short, if I could go back, I would work on multi-task vehicle routing problem (VRP) solvers from the start. I could have done better, and published at the conferences I love, such as ICLR and NeurIPS, rather than working on something the community was not ready for.

As a rule, then, a researcher should work on problems that have all three sides of this triangle: data (and benchmarks), need, and community acceptance.

I faced this reality when I attended KDD in Toronto. I saw two kinds of wrong research there.

The first, which I belonged to, tried to solve very specific problems with fancy models. As Elon Musk put it, the biggest mistake an engineer (and, in our case, a researcher) can make is to optimize something that should not exist in the first place.

The second tried to use one hammer, LLMs, to solve every problem, even combinatorial optimization. If you read those LLM-based papers now, you will see how ridiculous they look. A lot has advanced since then. They tried to solve the problem with the power of the LLMs of that moment, without considering that these models would get better and the challenge would resolve itself.

In volatile research areas like LLMs, researchers like us, who have neither the resources nor the data, would be better off working on problems that generalize, or on other important problems, rather than trying to solve everything with LLMs.

## My biggest regret

During my PhD, I couldn't attend many conferences, mostly because of a lack of budget and sometimes because of visa issues. I just wrote papers, and this was the main source of demotivation in the last two years of my program.

KDD, the only conference I attended, was the main reason I changed my research direction to multi-task VRP solvers, a direction I chose late. The more we engage with other researchers, the more feedback we get, and we tend to correct our path implicitly.

But probably my biggest regret is that I applied for a three-month research visit with a well-known industrial engineering group in Germany. They accepted me, but, again, for reasons that were unreasonable (at least from my point of view), I was not allowed to go. They were working on exactly the kinds of problems and solutions I loved most, and every time I remember it, I feel regret.

My main advice to new PhD students: from the beginning, communicate clearly with your supervisor and research group about funding edge cases, the opportunities you will have, the resources you will have access to, and so on.

## Unfinished business

I think I could have done better on multi-task VRP solvers. I hope I get the chance to expand this research, at least independently, toward a generalizable solver for all combinatorial optimization problems.

Neglecting the beautiful, elegant, and structured theory we have in classical optimization, such as column generation, Benders decomposition, branch-and-cut solvers for mixed-integer linear programming (MILP), and constraint programming, was another methodological mistake I made.

I think we should try to bring RL and other neural learning models into the realm of classical approaches, where we have very clean mathematical theories.[^optimization]

For VRP, then, these are the two paths I see for researchers: solvers that generalize across tasks, and learning brought into classical optimization.

## The RL research directions I foresee

In the first year of my program, I had the chance to talk with Richard Sutton, often called the father of RL, for about an hour. He gave me a few valuable suggestions, along with a few criticisms of deep RL, suggesting I move away from it. At the time, I was still learning RL, but as I read more and more, I realized why he didn't like deep RL. His lifelong mission has been to design learning algorithms that resemble how the mind learns: fully online, continuous, and sample-efficient. And now we have larger and larger DQN and policy-based methods that train like regression algorithms, in a very inefficient way.

The successful use of these models to fine-tune LLMs has only reinforced this path. As Sutton himself conceded in *The Bitter Lesson*, the biggest advances in AI have come from scaling computation (GPUs, in our case), not from elegant theoretical frameworks.[^bitter] Meanwhile, our own brains still learn far more sample-efficiently than these deep models.

I think I now understand his point of view. I partially agree with him, but I would also like to consider the view of other pioneers like Andrej Karpathy, who says that building a brain is different from building a neural network: our brains start from many biological and evolutionary foundations, which I call heuristics. We may be born a blank slate, in the sense that we must feed new data into our brains from birth until death, but our neural architecture has already been chosen by millions of years of evolution and fine-tuned biologically. To speak in the language of neural networks, we do not start from random weights and an arbitrary architecture. Rather, we are born with a pretrained model, and all we need is a small fine-tuning head with a few extra parameters on top of it.

But even on this path, we still need to work on the sample efficiency of RL models. Distillation is one path I think all researchers can work on, even if they don't have fancy resources like H100 GPUs.[^distillation]

In fact, I think we need to pay extra attention to model-based RL, or, as Yann LeCun might call it, model predictive control.[^world-models] Learning the system dynamics, or the transition function of a Markov decision process, is underestimated in the literature, and I think it is the key to sample efficiency.

The most important intuition for me is this: the more closely we align our temporal-difference loss with the Bellman equations, which have a nice theory and optimality proofs, the more sample-efficient and interpretable our agents can become.

Even when it comes to clipping tricks on the probability ratio, like the one in Proximal Policy Optimization (PPO), I prefer the trust-region way of handling it. Trust Region Policy Optimization (TRPO) has more structure and more theoretical support, so we can work iteratively on making it tractable on GPU-friendly hardware,[^trpo][^ppo] rather than stacking ever more complex tricks on top of each other, as we see in much of the new RLHF research these days.

That said, I will try my best to elaborate on each of these dimensions I learned during my PhD, so that they can be one path among many. After all, truth, if it exists, is not in any single one of them, but in the resultant force of all the efforts we make to build something bigger than ourselves.

## References

[^optimization]: Bengio, Y., Lodi, A., & Prouvost, A. (2021). [Machine learning for combinatorial optimization: A methodological tour d'horizon](https://arxiv.org/abs/1811.06128). *European Journal of Operational Research, 290*(2), 405–421.

[^bitter]: Sutton, R. (2019, March 13). [The bitter lesson](https://web.archive.org/web/2019/http://www.incompleteideas.net/IncIdeas/BitterLesson.html).

[^distillation]: Rusu, A. A., et al. (2015). [Policy distillation](https://arxiv.org/abs/1511.06295). *arXiv*.

[^world-models]: Dawid, A., & LeCun, Y. (2023). [Introduction to latent variable energy-based models: A path towards autonomous machine intelligence](https://arxiv.org/abs/2306.02572). *arXiv*.

[^trpo]: Schulman, J., Levine, S., Moritz, P., Jordan, M. I., & Abbeel, P. (2015). [Trust region policy optimization](https://proceedings.mlr.press/v37/schulman15.html). *Proceedings of the 32nd International Conference on Machine Learning, 37*, 1889–1897.

[^ppo]: Schulman, J., Wolski, F., Dhariwal, P., Radford, A., & Klimov, O. (2017). [Proximal policy optimization algorithms](https://arxiv.org/abs/1707.06347). *arXiv*.
