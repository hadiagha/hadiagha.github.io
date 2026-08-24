COMPOSE := docker compose

.DEFAULT_GOAL := help
.PHONY: help preview build check lock shell clean rebuild

help: ## Show this help
	@grep -hE '^[a-z-]+:.*?## ' $(MAKEFILE_LIST) \
	  | awk 'BEGIN{FS=":.*?## "}{printf "  \033[1m%-10s\033[0m %s\n", $$1, $$2}'

preview: ## Serve at http://localhost:4000 with live reload and drafts
	$(COMPOSE) up

build: ## Production build into _site/
	$(COMPOSE) run --rm -e JEKYLL_ENV=production site \
	  bundle exec jekyll build --trace

check: build ## Build, then validate links, images and alt text
	$(COMPOSE) run --rm site bundle exec htmlproofer _site \
	  --disable-external \
	  --allow-hash-href \
	  --ignore-urls "/^\/assets\/images\/(favicon|apple-touch-icon)/,/^mailto:\?/"

lock: ## Re-resolve Gemfile.lock after editing the Gemfile
	$(COMPOSE) run --rm --no-deps site bundle lock

rebuild: ## Rebuild the image (needed after a Gemfile change)
	$(COMPOSE) build --no-cache

shell: ## Open a shell inside the build container
	$(COMPOSE) run --rm site bash

clean: ## Remove build output and caches
	rm -rf _site .jekyll-cache .jekyll-metadata .sass-cache
