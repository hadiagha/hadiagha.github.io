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
make preview   # http://localhost:4000, live reload, drafts visible
make check     # build, then validate links, images and alt text
make build     # production build into _site/
make clean     # remove build output and caches
make help      # list every target
```

The first `make preview` builds the image and takes a few minutes. After that
it starts in seconds.

## Writing

Posts live in `_posts/` as `YYYY-MM-DD-slug.md`.

```yaml
---
layout: post
title: "Post title"
date: 2026-09-14
tags: [reinforcement-learning, optimization]
excerpt: "One or two sentences, used for cards and search results."
toc: true
---
```

The URL is derived from the front-matter `date` and the filename slug — **not**
from the filename's date prefix. When revising a published post, change the body
and leave both the `date` and the slug alone, or the URL moves and existing
links break.

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

The site is at <https://hadiagha.github.io>.
