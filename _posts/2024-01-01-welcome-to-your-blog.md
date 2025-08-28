---
layout: post
title: "Welcome to Your Scientific Blog"
date: 2024-01-01
tags: [introduction, blogging, guide]
author: Your Name
excerpt: "Learn how to create beautiful, SEO-optimized scientific posts with math equations, code examples, citations, and more."
toc: true
---

Welcome to your new scientific blog! This post will guide you through all the features available for creating professional, citation-worthy content.

## Writing Basics

Your blog uses **Markdown** for formatting, which makes writing clean and simple. Here are the basics:

### Text Formatting

- **Bold text**: Use `**text**` or `__text__`
- *Italic text*: Use `*text*` or `_text_`
- ***Bold and italic***: Use `***text***`
- ~~Strikethrough~~: Use `~~text~~`
- `Inline code`: Use backticks \`code\`

### Headers

```markdown
# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header
```

## Mathematical Equations

One of the most powerful features is LaTeX math support via MathJax. You can write both inline and display equations.

### Inline Math

Write inline equations using single dollar signs: `$E = mc^2$` renders as $E = mc^2$.

### Display Math

For centered equations, use double dollar signs:

```latex
$$
\frac{\partial^2 u}{\partial t^2} = c^2 \nabla^2 u
$$
```

This renders as:

$$
\frac{\partial^2 u}{\partial t^2} = c^2 \nabla^2 u
$$

### Complex Equations

Here's a more complex example - the Schrödinger equation:

$$
i\hbar\frac{\partial}{\partial t}\Psi(r,t) = \hat{H}\Psi(r,t)
$$

And Maxwell's equations in differential form:

$$
\begin{align}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\epsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \epsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{align}
$$

## Code Examples

Your blog supports syntax highlighting for various programming languages using Prism.js.

### Python Example

```python
import numpy as np
import matplotlib.pyplot as plt

def mandelbrot(h, w, max_iter=100):
    """Generate Mandelbrot set"""
    y, x = np.ogrid[-1.4:1.4:h*1j, -2:0.6:w*1j]
    c = x + y*1j
    z = c
    divtime = max_iter + np.zeros(z.shape, dtype=int)
    
    for i in range(max_iter):
        z = z**2 + c
        diverge = z*np.conj(z) > 2**2
        div_now = diverge & (divtime == max_iter)
        divtime[div_now] = i
        z[diverge] = 2
        
    return divtime
```

### JavaScript Example

```javascript
// Fibonacci sequence generator
function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

// Get first 10 Fibonacci numbers
const fib = fibonacci();
const first10 = Array.from({ length: 10 }, () => fib.next().value);
console.log(first10); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

### Supported Languages

Your blog automatically detects and highlights code in many languages including:
- Python, JavaScript, TypeScript, Java, C++, C#, Go, Rust
- HTML, CSS, SCSS, SQL, Bash, PowerShell
- R, MATLAB, Julia, LaTeX
- And many more!

## Quotes and Citations

### Blockquotes

Use `>` for quotes:

> "The important thing is not to stop questioning. Curiosity has its own reason for existence."
> 
> — Albert Einstein

### Nested Quotes

> This is a quote
> > This is a nested quote
> > > This can go multiple levels deep

## Lists

### Unordered Lists

- First item
- Second item
  - Nested item
  - Another nested item
    - Even deeper
- Third item

### Ordered Lists

1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

### Task Lists

- [x] Create blog
- [x] Write first post
- [ ] Share with colleagues
- [ ] Get feedback

## Tables

Tables are great for presenting data:

| Method | Time Complexity | Space Complexity | Stable |
|--------|----------------|------------------|--------|
| Bubble Sort | O(n²) | O(1) | Yes |
| Quick Sort | O(n log n) | O(log n) | No |
| Merge Sort | O(n log n) | O(n) | Yes |
| Heap Sort | O(n log n) | O(1) | No |

## Images and Figures

Include images with captions:

```markdown
![Alt text](/path/to/image.jpg)
*Figure 1: Caption for the image*
```

## Links

- External links: `[Link text](https://example.com)`
- Internal links: `[Link text](/blog/post-url)`
- Reference links: `[Link text][ref]` then define `[ref]: https://example.com`

## Special Features

### Table of Contents

Add `toc: true` to your post's front matter to automatically generate a table of contents from your headers.

### Tags

Use tags in your front matter to categorize posts:

```yaml
tags: [machine-learning, python, tutorial]
```

### Citations

Every post automatically includes citation information in multiple formats (APA, MLA, BibTeX). Readers can easily cite your work in their research.

## SEO Optimization

Your blog is automatically optimized for search engines:

- **Meta tags**: Generated from your post title and excerpt
- **Sitemap**: Automatically created and updated
- **Structured data**: Schema.org markup for better search results
- **RSS feed**: Available at `/feed.xml`
- **Social media tags**: Open Graph and Twitter Card support

## Best Practices

1. **Use descriptive titles**: Help readers and search engines understand your content
2. **Write meaningful excerpts**: The excerpt appears in search results and social shares
3. **Tag appropriately**: Use relevant tags to help readers find related content
4. **Include images**: Visual content increases engagement
5. **Update regularly**: Fresh content improves SEO and keeps readers coming back

## Adding New Posts

To create a new post:

1. Create a new file in the `_posts` directory
2. Name it `YYYY-MM-DD-your-post-title.md`
3. Add the front matter:

```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS
tags: [tag1, tag2, tag3]
author: Your Name
excerpt: "A brief description of your post"
---
```

4. Write your content in Markdown
5. Commit and push to GitHub
6. Your post will appear automatically!

## Conclusion

Your scientific blog is now ready for professional, academic content. The combination of LaTeX math support, syntax highlighting, automatic citations, and SEO optimization makes it perfect for sharing research, tutorials, and insights.

Happy blogging! 🚀
