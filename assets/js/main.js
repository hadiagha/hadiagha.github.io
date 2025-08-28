// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
  const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcon(theme);
});

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
}

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// Copy to clipboard functionality for citations
document.addEventListener('DOMContentLoaded', () => {
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const text = button.getAttribute('data-clipboard-text');
      
      try {
        await navigator.clipboard.writeText(text);
        button.classList.add('copied');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        
        setTimeout(() => {
          button.classList.remove('copied');
          button.innerHTML = originalText;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    });
  });
});

// Table of Contents generation for posts
if (document.querySelector('.post-content')) {
  const content = document.querySelector('.post-content .content');
  const tocContainer = document.getElementById('toc');
  
  if (tocContainer) {
    const headings = content.querySelectorAll('h2, h3, h4');
    const toc = document.createElement('ul');
    let currentLevel = 2;
    let currentList = toc;
    const listStack = [toc];
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const id = `heading-${index}`;
      heading.id = id;
      
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${id}`;
      a.textContent = heading.textContent;
      li.appendChild(a);
      
      // Handle nesting
      if (level > currentLevel) {
        const newList = document.createElement('ul');
        const lastLi = currentList.lastElementChild;
        if (lastLi) {
          lastLi.appendChild(newList);
        }
        listStack.push(newList);
        currentList = newList;
      } else if (level < currentLevel) {
        const levelDiff = currentLevel - level;
        for (let i = 0; i < levelDiff; i++) {
          if (listStack.length > 1) {
            listStack.pop();
          }
        }
        currentList = listStack[listStack.length - 1];
      }
      
      currentList.appendChild(li);
      currentLevel = level;
    });
    
    if (toc.children.length > 0) {
      tocContainer.appendChild(toc);
      document.querySelector('.post-content').classList.add('has-toc');
      
      // Highlight active section in TOC
      const observerOptions = {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const id = entry.target.id;
          const tocLink = tocContainer.querySelector(`a[href="#${id}"]`);
          
          if (entry.isIntersecting) {
            // Remove active class from all links
            tocContainer.querySelectorAll('a').forEach(link => {
              link.classList.remove('active');
            });
            // Add active class to current link
            if (tocLink) {
              tocLink.classList.add('active');
            }
          }
        });
      }, observerOptions);
      
      headings.forEach(heading => {
        observer.observe(heading);
      });
    }
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add loading state for images
document.querySelectorAll('.post-content img').forEach(img => {
  img.addEventListener('load', function() {
    this.classList.add('loaded');
  });
});

// MathJax configuration
window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
  }
};
