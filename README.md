# hadiagha.github.io

Source for my personal site — writing on reinforcement learning, optimization,
forecasting and applied machine learning, plus my book, research and CV.

Built with [Jekyll 4](https://jekyllrb.com) and deployed to GitHub Pages by
GitHub Actions.

## Requirements

[Docker](https://docs.docker.com/get-docker/) and `make`. That is all — Ruby
runs inside the container, so nothing is installed on your machine and the
preview you see is the same build Actions publishes.

## Everyday commands

```bash
make new title="..."   # start a draft, with its image folder
make preview           # http://localhost:4000, live reload, drafts visible
make check             # front matter, links, images, alt text
make publish slug=...  # move a draft into _posts/
make help              # list every target
```

The first `make preview` builds the image and takes a few minutes. After that
it starts in seconds.

## Writing

**[WRITING.md](WRITING.md) is the full guide** — every front-matter field, image
and maths conventions, series, and what each `doctor` error means. What follows
is the summary.

### 1. Start

```bash
make new title="Why cutting-plane selection is a bandit problem"
make new title="Notes on the GRPO paper" kind=note
```

Creates `_drafts/<slug>.md` with valid front matter and `assets/posts/<slug>/`
for its images. `kind` is one of `article` (default), `note`, `review`, `essay`.

Drafts live in `_drafts/`, not in `_posts/` behind a flag. A flag only hides a
post from listings — the page still builds at its real URL and anyone with the
link can read it. `_drafts/` is never built in production.

### 2. Write

Images go in the folder `make new` created. Reference them relatively and give
every one real alt text; `make check` fails the build without it.

### 3. Check and publish

```bash
make preview               # read it in the real layout
make check                 # must pass
make publish slug=<slug>   # moves it to _posts/YYYY-MM-DD-<slug>.md
git add -A && git commit -m "..." && git push
```

`make publish` names the file from the front-matter `date`, which is what keeps
the filename and the URL in agreement.

### Front-matter schema

Required: `title`, `description`, `date`, `kind`.

```yaml
---
title: "Post title"
description: "One or two sentences. Feeds search results, link previews and cards."
date: 2026-09-14
kind: article              # article | note | review | essay
tags: [reinforcement-learning, optimization]   # must exist in _data/tags.yml
toc: true
math: true                 # loads MathJax (1.2 MB) only when true
updated: 2026-10-02        # set when revising a published post
series: rl-for-or          # must exist in _data/series.yml
series_part: 2
image: /assets/posts/<slug>/hero.png
image_alt: "What the image shows."
youtube_id: dQw4w9WgXcQ    # bare ID, never a URL
youtube_title: "Companion video title"
canonical_url:             # only if published elsewhere first
featured: true             # pin to the curated list
---
```

### Revising a published post

Change the body, set `updated:`, and **leave `date:` and the filename slug
alone**. The URL is built from those two, so changing either breaks every
existing link. `make doctor` fails the build if they drift apart.

### Health check

```bash
make doctor   # runs as part of make check
```

Reports front matter that misses required fields, filenames that disagree with
their dates, tags outside `_data/tags.yml`, series that point at nothing,
`youtube_id` values that are URLs, images without alt text, and media files no
post references. Errors fail; warnings are advisory. Schema problems in
`_drafts/` are warnings — they become errors when the post is published.

```bash
make images   # resize to 1600px and generate WebP under assets/posts/
```

Runs on the host and needs Pillow. Optional; the site builds without it.

## Deploying

Push to `main`. `.github/workflows/deploy.yml` builds and publishes; it takes
about two minutes. Pull requests run `.github/workflows/ci.yml`, which builds
the site, checks links and images, and rejects files over 2 MB.

Neither workflow can write to the repository — Pages is published through OIDC,
so there are no deploy secrets to manage.

## What must never be committed

Video files, datasets, model checkpoints, analytics exports, subscriber lists
and API keys. `.gitignore` covers the common cases and CI enforces the size
limit, but the rule matters more than the tooling. Video belongs on YouTube and
is embedded by ID; large data belongs in a release asset or its own repository.

## Changing dependencies

```bash
# edit Gemfile, then
make lock       # re-resolve Gemfile.lock
make rebuild    # rebuild the image with the new gems
```

Commit both `Gemfile` and `Gemfile.lock`.

## Layout

```
_posts/       published writing
_layouts/     page templates
_includes/    shared fragments
assets/       css, js, images, cv
_config.yml   site configuration
```

The site is at <https://hadiaghazadeh.com>. The old `hadiagha.github.io`
address redirects there automatically, preserving paths.

`CNAME` at the repo root holds the custom domain. Jekyll copies it into `_site`,
so the Actions deploy carries it through; deleting it would drop the domain on
the next publish.
