COMPOSE := docker compose

.DEFAULT_GOAL := help
.PHONY: help new preview build search check doctor images fonts publish lock shell clean rebuild

help: ## Show this help
	@grep -hE '^[a-z-]+:.*?## ' $(MAKEFILE_LIST) \
	  | awk 'BEGIN{FS=":.*?## "}{printf "  \033[1m%-10s\033[0m %s\n", $$1, $$2}'

new: ## Start a draft: make new title="..." [kind=article|note|review|essay]
	@bash scripts/new-post.sh "$(title)" "$(or $(kind),article)"

preview: ## Serve at http://localhost:4000 with live reload and drafts
	$(COMPOSE) up

build: search ## Production build into _site/, with the search index

# Split out so `build` depends on it: Pagefind reads the generated HTML, so it
# has to run after Jekyll, every time, or the index describes the previous
# build. `jekyll serve` never writes _site, which is why search does not work
# under `make preview` — run `make build` and serve _site if you need to test it.
search:
	$(COMPOSE) run --rm -e JEKYLL_ENV=production site \
	  bundle exec jekyll build --trace
	$(COMPOSE) run --rm site pagefind --site _site

check: doctor build ## Everything: front matter, then links, images and alt text
	$(COMPOSE) run --rm site bundle exec htmlproofer _site \
	  --disable-external \
	  --allow-hash-href \
	  --ignore-urls "/^mailto:\?/"

doctor: ## Validate front matter, dates, tags, series and unused media
	@python3 scripts/doctor.py

images: ## Resize and generate WebP for images under assets/posts/
	@python3 scripts/images.py

fonts: ## Re-download the self-hosted webfonts (rarely needed)
	@python3 scripts/fonts.py

publish: ## Move a draft into _posts/: make publish slug=your-post-slug
	@bash scripts/publish.sh "$(slug)"

lock: ## Re-resolve Gemfile.lock after editing the Gemfile
	$(COMPOSE) run --rm --no-deps site bundle lock

rebuild: ## Rebuild the image (needed after a Gemfile change)
	$(COMPOSE) build --no-cache

shell: ## Open a shell inside the build container
	$(COMPOSE) run --rm site bash

clean: ## Remove build output and caches
	rm -rf _site .jekyll-cache .jekyll-metadata .sass-cache
