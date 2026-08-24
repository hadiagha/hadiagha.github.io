source "https://rubygems.org"

# Jekyll proper, not the github-pages gem. The legacy GitHub Pages build pinned
# us to Jekyll 3.10 and a whitelist of plugins; we build with Actions instead.
gem "jekyll", "~> 4.3.4"

# Required explicitly under Jekyll 4 because _config.yml sets `input: GFM`.
gem "kramdown-parser-gfm", "~> 1.1"

# Ruby 3.x no longer bundles a web server.
gem "webrick", "~> 1.8"

# Leaving the default gems in Ruby 3.4; declared now so the build is quiet and
# stays working when we move Ruby versions.
gem "base64", "~> 0.2"
gem "csv",    "~> 3.3"

group :jekyll_plugins do
  gem "jekyll-feed",    "~> 0.17"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
  # Configured but currently inert (index.html uses layout: home, which loops
  # site.posts directly). Retained so this stage changes no behaviour; it goes
  # when the homepage is rebuilt.
  gem "jekyll-paginate", "~> 1.1"
end

group :development, :test do
  gem "html-proofer", "~> 5.0"
end
