// Theme toggle.
// The data-theme attribute is already set by the inline script in <head>, which
// runs before first paint. This only handles user toggling from here on.
(function () {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const root = document.documentElement;
  const icon = toggle.querySelector('i');

  function paint(theme) {
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    toggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
    if (!icon) return;
    icon.classList.toggle('fa-sun', theme === 'dark');
    icon.classList.toggle('fa-moon', theme !== 'dark');
  }

  paint(root.getAttribute('data-theme') || 'light');

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
    paint(next);
  });
})();

// Mobile navigation.
(function () {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!navToggle || !navMenu) return;

  function setOpen(open) {
    navMenu.classList.toggle('active', open);
    navToggle.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  setOpen(false);

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!navMenu.classList.contains('active'));
  });

  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) setOpen(false);
  });

  // Escape closes the menu and returns focus to the button that opened it.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      setOpen(false);
      navToggle.focus();
    }
  });
})();

// Copy-to-clipboard for citations.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.copy-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const text = button.getAttribute('data-clipboard-text');
      const original = button.innerHTML;
      try {
        await navigator.clipboard.writeText(text);
        button.classList.add('copied');
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
      } catch (err) {
        button.innerHTML = '<i class="fas fa-times"></i> Press ⌘C';
      }
      setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = original;
      }, 2000);
    });
  });
});

// Table of contents for posts that opt in with `toc: true`.
(function () {
  const content = document.querySelector('.post-content .content');
  const tocContainer = document.getElementById('toc');
  if (!content || !tocContainer) return;

  const headings = content.querySelectorAll('h2, h3, h4');
  const toc = document.createElement('ul');
  const listStack = [toc];
  let currentList = toc;
  let currentLevel = 2;

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1), 10);
    const id = `heading-${index}`;
    heading.id = id;

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${id}`;
    a.textContent = heading.textContent;
    li.appendChild(a);

    if (level > currentLevel) {
      const newList = document.createElement('ul');
      const lastLi = currentList.lastElementChild;
      if (lastLi) lastLi.appendChild(newList);
      listStack.push(newList);
      currentList = newList;
    } else if (level < currentLevel) {
      for (let i = 0; i < currentLevel - level; i++) {
        if (listStack.length > 1) listStack.pop();
      }
      currentList = listStack[listStack.length - 1];
    }

    currentList.appendChild(li);
    currentLevel = level;
  });

  if (!toc.children.length) return;

  tocContainer.appendChild(toc);
  document.querySelector('.post-content').classList.add('has-toc');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      tocContainer.querySelectorAll('a').forEach((link) => link.classList.remove('active'));
      const active = tocContainer.querySelector(`a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  headings.forEach((heading) => observer.observe(heading));
})();

// In-page anchors.
// The previous version called preventDefault() on every '#' link without
// updating the hash or moving focus, which broke deep linking, the back button
// and — once a skip link existed — keyboard navigation entirely.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const hash = this.getAttribute('href');
    if (hash === '#' || hash.length < 2) return;

    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });

    // Keep the URL copyable and the back button working.
    history.pushState(null, '', hash);

    // Move keyboard focus, not just the viewport. Headings are not focusable by
    // default, so give the target a temporary tabindex.
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
    target.focus({ preventScroll: true });
  });
});

// Fade images in once decoded.
document.querySelectorAll('.post-content img').forEach((img) => {
  if (img.complete) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => img.classList.add('loaded'));
  }
});
