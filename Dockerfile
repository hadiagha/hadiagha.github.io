# Local preview environment. Deliberately the same Ruby as .ruby-version and
# the deploy workflow, so what you see locally is what Actions publishes.
FROM ruby:3.3.6-slim-bookworm

# build-essential/git: native extensions and gemspecs that shell out to git.
# libcurl4: html-proofer reaches libcurl through ffi and fails to load without it.
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      build-essential \
      git \
      ca-certificates \
      libcurl4 \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /site

# Gems land in /usr/local/bundle (set by the base image), which is outside the
# bind mount — so mounting the repo over /site cannot clobber them.
COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 4 --retry 3

EXPOSE 4000 35729

# --force_polling: the repo lives in iCloud Drive, where filesystem events are
# unreliable and live reload silently stops firing without it.
CMD ["bundle", "exec", "jekyll", "serve", \
     "--host", "0.0.0.0", \
     "--livereload", \
     "--drafts", \
     "--force_polling"]
