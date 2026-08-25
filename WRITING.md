# Writing a post

The whole loop, start to published.

```bash
make new title="Your title here"     # 1. draft + image folder
make preview                          # 2. write, see it live
make check                            # 3. validate
make publish slug=your-title-here     # 4. move into _posts/
git add -A && git commit -m "..." && git push
```

Everything below is detail on those four steps.

---

## 1. Start a draft

```bash
make new title="Why cutting-plane selection is a bandit problem"
```

Creates two things:

```
_drafts/why-cutting-plane-selection-is-a-bandit-problem.md
assets/posts/why-cutting-plane-selection-is-a-bandit-problem/
```

The slug comes from the title — lowercased, punctuation to hyphens, capped at
60 characters. It refuses to run if that slug is already taken by a draft or a
published post.

### Choosing a kind

```bash
make new title="Notes on the GRPO paper" kind=note
make new title="Thinking in Systems" kind=review
make new title="What I got wrong about forecasting" kind=essay
```

| kind | For | Bar |
|---|---|---|
| `article` | Full technical piece or tutorial. **The default.** | Considered, edited, citable |
| `note` | Short — a finding, a paper read, a snag solved | Deliberately low. Rough is the point |
| `review` | A book | Opinionated |
| `essay` | Argued, non-technical or semi-technical | Considered |

`article` renders without a badge; the other three get a small label. A label on
everything is a label on nothing.

**The `note` kind is what makes weekly publishing survivable.** Most weeks you
won't have a finished article in you, and a site that only accepts finished
articles goes quiet.

### Why drafts live in `_drafts/`

Not in `_posts/` behind a `status: draft` flag. A flag only filters *listings* —
the post still builds at its real URL, and anyone with the link can read it.
That's not a draft, it's an unlisted publication.

`_drafts/` is never built in production. Nothing can leak.

---

## 2. Front matter

Four fields are required. Everything else is optional.

```yaml
---
title: "Why cutting-plane selection is a bandit problem"
description: "Choosing which cuts to add to a MILP is a repeated decision under uncertainty. Framing it as a contextual bandit beats the usual heuristics on real unit-commitment instances."
date: 2026-09-14
kind: article
---
```

### Every field

| Field | Required | What it does |
|---|---|---|
| `title` | ✅ | Page title, card title, `<title>` tag |
| `description` | ✅ | Meta description, link previews, cards. **Write this properly** — it's what people see in search results and on LinkedIn |
| `date` | ✅ | Publication date. **Part of the URL** |
| `kind` | ✅ | `article` · `note` · `review` · `essay` |
| `tags` | | From `_data/tags.yml`. `doctor` warns on anything else |
| `toc` | | `true` renders a sticky table of contents on desktop |
| `math` | | `true` loads MathJax. **1.2 MB — only set it if you use maths** |
| `updated` | | Shows "Updated \<date\>" and sets `dateModified`. Set this when you revise |
| `series` | | Key from `_data/series.yml` |
| `series_part` | | Position in the series, counting from 1 |
| `image` | | Social preview image. Becomes `og:image` |
| `image_alt` | | Becomes `og:image:alt`. Required by `doctor` whenever `image` is set |
| `youtube_id` | | Bare 11-character ID. **Player lands in stage 7** — the field validates now |
| `youtube_title` | | Accessible name for the video |
| `canonical_url` | | Only if the piece appeared somewhere else first |
| `featured` | | Reserved for the curated "Start here" list |

### Writing a good `description`

Aim for 100–160 characters. `doctor` warns below 40 and above 200, and errors if
you leave the template placeholder in.

It should say what the reader gets, not what the post is filed under:

```yaml
# Weak — describes the category
description: "A post about reinforcement learning and optimization."

# Better — describes the payoff
description: "Choosing which cuts to add to a MILP is a repeated decision under uncertainty. Framing it as a contextual bandit beats the usual heuristics on real unit-commitment instances."
```

### Available tags

`reinforcement-learning` · `optimization` · `operations-research` ·
`forecasting` · `ml-engineering` · `llm` · `energy-markets` · `mathematics` ·
`paper-notes` · `career` · `books` · `tutorial`

Add new ones to `_data/tags.yml` deliberately. A tag used once is a tag nobody
can browse by — prefer an existing tag over a near-synonym.

---

## 3. Write the body

Standard Markdown, GitHub-flavoured.

### Headings

Start at `##`. The `#` level is the post title, already rendered from
`title`. Don't skip levels — `##` then `###`, never `##` then `####`.

### Maths

Set `math: true`, then:

```markdown
Inline: the discount factor $\gamma$ controls how far ahead the agent looks.

Display:

$$
Q(s,a) \leftarrow Q(s,a) + \alpha\left[r + \gamma \max_{a'} Q(s',a') - Q(s,a)\right]
$$
```

Both `$...$` and `$$...$$` work. Wide equations scroll inside their own box
rather than stretching the page.

### Code

````markdown
```python
def choose_action(self, state):
    if np.random.random() < self.epsilon:
        return np.random.randint(self.n_actions)
    return np.argmax(self.q_table[state])
```
````

Always tag the language.

### Links

```markdown
[Another post here]({{ '/blog/2024/01/02/intro-rl/' | relative_url }})
[Everything tagged optimization]({{ '/writing/' | relative_url }}?tag=optimization)
[Somewhere else](https://example.com/)
```

Use `relative_url` for internal links so they survive a domain change.
`make check` fails on any internal link that doesn't resolve.

Three internal destinations are worth knowing:

| Link | Goes to |
|---|---|
| `/writing/` | The archive, filterable by kind and topic |
| `/writing/?tag=<slug>` | The archive, pre-filtered to that topic |
| `/tags/#<slug>` | That topic's section on the Topics page |

Prefer `/writing/?tag=…` when linking to a subject. The `/tags/` anchor only
exists once that topic has at least one post, so it breaks for anything not yet
written about — `make check` will catch it, but the query form never breaks in
the first place.

### Linking to a section

Every heading gets an id from its own text, so `## Why cutting planes` is
reachable at `#why-cutting-planes`. Hover a heading on the published page and a
`#` appears; that is the link.

Those ids come from the heading text, which means **renaming a heading breaks
any link saved to it**. If you need to rename one and keep the old anchor,
write the id explicitly:

```markdown
## Choosing the cut
{: #why-cutting-planes }
```

### Tables and quotes

```markdown
| Method | Solve time | Optimality gap |
|---|---:|---:|
| Branch-and-bound | 340 s | 0.0% |
| Learned policy | 0.4 s | 2.1% |

> A policy that decides in 400 ms and lands 2% off is worth more than one that
> is exact and arrives after the market clears.
```

Wide tables scroll inside their own container.

---

## 4. Images

Put them in the folder `make new` created:

```
assets/posts/why-cutting-plane-selection-is-a-bandit-problem/
├── bnb-tree.svg
└── gap-over-time.png
```

Reference them:

```markdown
![Branch-and-bound tree with selected cuts highlighted]({{ '/assets/posts/why-cutting-plane-selection-is-a-bandit-problem/bnb-tree.svg' | relative_url }})
```

**Alt text is mandatory.** `make check` fails the build on any image without it.
Describe what the image *shows*, not that it is an image:

```markdown
![](tree.svg)                                   ❌ fails the build
![Diagram](tree.svg)                            ❌ says nothing
![Branch-and-bound tree with selected cuts]     ✅
```

### Conventions

- Lowercase, hyphenated, descriptive filenames. `bnb-tree.svg`, never
  `Screenshot 2026-09-14 at 10.23.11.png`
- **Diagrams as SVG** — sharp at any size, small, and diffable in git
- Photos and screenshots: PNG or JPEG, then run `make images`

```bash
make images
```

Resizes anything wider than 1600px and generates a WebP alongside it. Idempotent
— safe to run repeatedly. Needs Pillow on your Mac; optional, the site builds
without it.

### Social preview

```yaml
image: /assets/posts/why-cutting-plane-selection-is-a-bandit-problem/hero.png
image_alt: "Branch-and-bound search tree with three cutting planes highlighted"
```

1200×630 works best. Without it, links to the post share the site default.

### Never commit

Video, datasets, model checkpoints, notebook outputs. CI rejects anything over
2 MB. Video goes on YouTube and is embedded by ID; large data belongs in a
release asset or its own repo.

---

## 5. Series

For a multi-part run. First define it once in `_data/series.yml`:

```yaml
rl-for-operations-research:
  title: Reinforcement learning for operations research
  description: >-
    Working through classical OR problems with RL, from formulation to a policy
    you could actually deploy.
```

Then in each post:

```yaml
series: rl-for-operations-research
series_part: 2
```

The post renders "Part 2 of 5" with links to its siblings. Members are gathered
by scanning posts, so adding a part needs no index file — just the two fields.

`doctor` errors if the key isn't defined or `series_part` is missing, and warns
if numbering isn't contiguous from 1.

---

## 6. Preview

```bash
make preview
```

<http://localhost:4000>. Live reload; drafts visible. `Ctrl-C` to stop.

Read the whole thing in the real layout before checking. Things that only show
up here: equations that don't typeset, images that don't load, headings that
don't flow, a description that reads badly on the card.

Check it narrow too — drag the window to phone width, or use your browser's
device toolbar.

---

## 7. Check

```bash
make check
```

Runs two passes:

**`doctor`** — content health:

- Missing required fields
- The template placeholder left in `description`
- A filename that disagrees with its front-matter date
- `updated` earlier than `date`
- Tags outside `_data/tags.yml`
- A series that doesn't exist, or a missing `series_part`
- `youtube_id` given as a URL instead of a bare ID
- An `image` with no `image_alt`
- Media files no post references

**HTMLProofer** — the built site:

- Internal links that don't resolve
- Images that don't exist
- Images with no alt attribute

Errors fail. Warnings are advisory. Problems in `_drafts/` are warnings and
become errors on publish — a draft is work in progress by definition.

If `make check` passes, CI will pass.

---

## 8. Publish

```bash
make publish slug=why-cutting-plane-selection-is-a-bandit-problem
```

Moves the draft to `_posts/2026-09-14-why-cutting-plane-selection-is-a-bandit-problem.md`,
taking the date from the front matter. That's what keeps filename and URL in
agreement — doing it by hand is how they drift.

Then:

```bash
make check     # once more, now that it is a real post
git add -A
git commit -m "Add post on cutting-plane selection"
git push
```

Live in about two minutes. Watch it at
[Actions](https://github.com/hadiagha/hadiagha.github.io/actions).

A red build means **the previous version is still serving** — a failed build
never replaces a working site.

Your URL will be:

```
https://hadiaghazadeh.com/blog/2026/09/14/why-cutting-plane-selection-is-a-bandit-problem/
```

Built from the front-matter `date` and the filename slug.

---

## 9. Revising a published post

```yaml
date: 2026-09-14        # ← never change this
updated: 2026-10-02     # ← add or bump this
```

Edit the body, set `updated`, **leave `date` and the slug alone.** The URL is
built from those two — change either and every existing link to the post breaks,
including anything anyone has shared or cited.

The page then shows "Updated 2 October 2026" and emits `dateModified` for search
engines. `doctor` fails the build if the filename and date ever drift apart.

If you genuinely must change a URL, that needs a redirect — ask me rather than
renaming the file.

---

## Common `doctor` errors

**`description is still the template placeholder`**
You didn't fill in `description`. It's the single most visible line of text
outside the title.

**`filename date 2026-09-14 disagrees with front-matter date 2026-09-20`**
Use `make publish` rather than moving files by hand. To fix: rename the file to
match the front-matter date.

**`tag 'rl' is not in _data/tags.yml`**
Either use `reinforcement-learning`, or add `rl` to the vocabulary if it's
genuinely a new topic.

**`has an image but no image_alt`**
Add `image_alt`. Two seconds, and it's what a screen reader announces.

**`youtube_id must be the bare ID, not a URL`**
From `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, take only `dQw4w9WgXcQ`.

**`series 'foo' is not defined in _data/series.yml`**
Define it there first.

---

## A complete example

```markdown
---
title: "Why cutting-plane selection is a bandit problem"
description: "Choosing which cuts to add to a MILP is a repeated decision under uncertainty. Framing it as a contextual bandit beats the usual heuristics on real unit-commitment instances."
date: 2026-09-14
kind: article
tags: [optimization, reinforcement-learning, energy-markets]
toc: true
math: true
image: /assets/posts/cutting-plane-bandit/hero.png
image_alt: "Branch-and-bound tree with three cutting planes highlighted"
---

Security-constrained unit commitment has to solve in minutes, and the exact
formulation does not. Cutting planes are the usual answer — but *which* cuts,
and how many, is a decision made hundreds of times per solve with no feedback
until the end.

That shape should look familiar.

## The problem with cut selection heuristics

...

$$
\text{gap}(t) = \frac{z_{\text{UB}}(t) - z_{\text{LB}}(t)}{|z_{\text{UB}}(t)|}
$$

## Framing it as a contextual bandit

...

```python
class CutSelector:
    def select(self, context):
        ...
```

## Results

| Method | Solve time | Gap |
|---|---:|---:|
| Default cuts | 340 s | 0.0% |
| Learned selection | 92 s | 0.1% |

## What this doesn't solve

...
```

---

## Quick reference

| Command | Does |
|---|---|
| `make new title="..." [kind=...]` | Draft + image folder |
| `make preview` | localhost:4000, live reload, drafts visible |
| `make check` | `doctor` + build + link/image validation |
| `make doctor` | Content health only |
| `make images` | Resize + WebP under `assets/posts/` |
| `make publish slug=...` | Draft → `_posts/`, named from its date |
| `make clean` | Remove build output and caches |
| `make help` | List every target |

**Three rules:**

1. Never change a published post's `date` or slug.
2. Every image needs alt text.
3. `make check` before every push.
