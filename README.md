# Your Scientific Blog

A professional Jekyll-based blog optimized for scientific writing, featuring LaTeX math support, syntax highlighting, automatic citations, and SEO optimization.

## 🚀 Quick Start

### Prerequisites

1. Ruby (version 2.5.0 or higher)
2. RubyGems
3. Git

### Local Development

1. Install Jekyll and dependencies:
   ```bash
   gem install bundler jekyll
   bundle install
   ```

2. Run the local server:
   ```bash
   bundle exec jekyll serve
   ```

3. Visit `http://localhost:4000` to see your blog

### Publishing to GitHub Pages

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Update blog"
   git push origin main
   ```

2. Your blog will be automatically built and available at `https://hadiagha.github.io`

## 📝 Writing Posts

### Creating a New Post

1. Create a new file in the `_posts` directory
2. Name it using the format: `YYYY-MM-DD-your-post-title.md`
3. Add the front matter:

```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS
tags: [tag1, tag2, tag3]
author: Your Name
excerpt: "A brief description that appears in search results"
toc: true  # Optional: adds table of contents
---
```

### Writing Content

#### Text Formatting
- **Bold**: `**text**`
- *Italic*: `*text*`
- `Code`: `` `code` ``
- [Links](url): `[text](url)`

#### Math Equations
- Inline: `$E = mc^2$`
- Display: `$$\frac{\partial f}{\partial x}$$`

#### Code Blocks
\`\`\`python
def hello():
    print("Hello, World!")
\`\`\`

#### Images
```markdown
![Alt text](/assets/images/image.jpg)
*Figure 1: Caption*
```

## 📂 Directory Structure

```
.
├── _posts/          # Blog posts
├── _layouts/        # Page templates
├── _includes/       # Reusable components
├── _sass/           # Sass stylesheets
├── assets/          # Images, CSS, JS
├── pages/           # Static pages
├── _config.yml      # Site configuration
└── index.html       # Homepage
```

## ⚙️ Configuration

Edit `_config.yml` to customize:
- Site title and description
- Author information
- Social media links
- SEO settings
- Analytics

## 🎨 Customization

### Adding Menu Items

Edit `_includes/header.html` to add new navigation items:

```html
<li class="nav-item">
  <a href="{{ '/new-page' | relative_url }}" class="nav-link">
    <i class="fas fa-icon"></i> New Page
  </a>
</li>
```

### Creating New Pages

1. Create a new markdown file (e.g., `new-page.md`)
2. Add front matter:

```yaml
---
layout: page
title: Page Title
permalink: /new-page/
---
```

### Modifying Styles

Edit `assets/css/main.scss` to customize colors, fonts, and layout.

## 🔍 SEO Features

- Automatic sitemap generation
- RSS feed at `/feed.xml`
- Open Graph and Twitter Card meta tags
- Schema.org structured data
- Mobile-responsive design

## 📚 Features

- **LaTeX Math**: Full MathJax support
- **Code Highlighting**: Syntax highlighting with Prism.js
- **Citations**: Automatic citation generation (APA, MLA, BibTeX)
- **Tags**: Organize posts by topics
- **Dark Mode**: Theme toggle for comfortable reading
- **Comments**: Disqus integration (optional)
- **Analytics**: Google Analytics support

## 🤝 Support

For issues or questions:
1. Check the [Jekyll documentation](https://jekyllrb.com/docs/)
2. View the [GitHub Pages documentation](https://docs.github.com/en/pages)
3. Open an issue on GitHub

## 📄 License

This blog theme is open source. Feel free to customize and use for your own purposes.

---

Happy blogging! 🎉
