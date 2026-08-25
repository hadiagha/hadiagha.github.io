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
      curl \
      libcurl4 \
 && rm -rf /var/lib/apt/lists/*

# Pagefind builds the search index over the generated site. Installed as the
# upstream static binary rather than through npm, because this image has no
# Node and adding it to run one command would cost about 50 MB.
#
# The musl build is deliberate: it is statically linked, so the same file runs
# here on Debian and on the CI runner without caring about the glibc version.
# Pinned, because the index format and the client script are versioned
# together — a mismatch between the two is a silently empty search box.
ARG PAGEFIND_VERSION=1.5.2
RUN set -eux; \
    case "$(dpkg --print-architecture)" in \
      amd64) target='x86_64-unknown-linux-musl' ;; \
      arm64) target='aarch64-unknown-linux-musl' ;; \
      *) echo "unsupported architecture: $(dpkg --print-architecture)" >&2; exit 1 ;; \
    esac; \
    curl -fsSL "https://github.com/CloudCannon/pagefind/releases/download/v${PAGEFIND_VERSION}/pagefind-v${PAGEFIND_VERSION}-${target}.tar.gz" \
      | tar -xz -C /usr/local/bin pagefind; \
    chmod +x /usr/local/bin/pagefind; \
    pagefind --version

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
