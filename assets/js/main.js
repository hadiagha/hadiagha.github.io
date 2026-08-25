// Theme toggle.
// The data-theme attribute is already set by the inline script in <head>, which
// runs before first paint. This only handles user toggling from here on.
(function () {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const root = document.documentElement;

  // The icons used to be swapped by toggling .fa-sun / .fa-moon on an <i>.
  // Now that they are inline SVG there is no class to flip, so the path is
  // rewritten in place — which also avoids rebuilding the element and losing
  // anything a screen reader had already read from it.
  const GLYPH = {
    'moon': { box: '0 0 384 512', d: 'M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z' },
    'sun': { box: '0 0 512 512', d: 'M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z' }
  };

  const svg = toggle.querySelector('svg');
  const path = toggle.querySelector('path');

  function paint(theme) {
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    toggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
    const glyph = GLYPH[theme === 'dark' ? 'sun' : 'moon'];
    if (!svg || !path || !glyph) return;
    // viewBox as well as the path: Font Awesome's icons are not all the same
    // width, and sun is 512 wide where moon is 384.
    svg.setAttribute('viewBox', glyph.box);
    path.setAttribute('d', glyph.d);
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
        button.innerHTML = '<svg class="icon" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" focusable="false"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg> Copied!';
      } catch (err) {
        button.innerHTML = '<svg class="icon" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true" focusable="false"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg> Press ⌘C';
      }
      setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = original;
      }, 2000);
    });
  });
});

// Table of contents for posts that opt in with `toc: true`.
// Slugify a heading the way kramdown does, for the rare heading written as raw
// HTML rather than Markdown. `seen` keeps two sections both called "Results"
// from claiming the same id.
function slugify(text, seen) {
  let base = text
    .toLowerCase()
    .trim()
    .replace(/[\u2018\u2019\u201c\u201d']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';
  if (seen[base] === undefined) {
    seen[base] = 0;
    return base;
  }
  seen[base] += 1;
  return `${base}-${seen[base]}`;
}

(function () {
  const content = document.querySelector('.post-content .content');
  const tocContainer = document.getElementById('toc');
  if (!content || !tocContainer) return;

  const seen = Object.create(null);
  content.querySelectorAll('[id]').forEach((el) => { seen[el.id] = 0; });

  const headings = content.querySelectorAll('h2, h3, h4');
  const toc = document.createElement('ul');
  const listStack = [toc];
  let currentList = toc;
  let currentLevel = 2;

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1), 10);
    // kramdown already gives every Markdown heading a slug id, so use it.
    // This used to overwrite them with `heading-0`, `heading-1`, ... numbered
    // from the top of the document, which meant inserting one section silently
    // repointed every anchor below it: a link someone had saved to a section
    // quietly started landing somewhere else. Only headings written as raw
    // HTML, which kramdown never sees, need an id generated here.
    if (!heading.id) heading.id = slugify(heading.textContent, seen);
    const id = heading.id;

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


// Video facade.
// The placeholder rendered by _includes/youtube.html swaps itself for the real
// player on click, so a reader who never presses play never makes a request to
// YouTube. See that file for why the poster is never fetched from ytimg.
document.querySelectorAll('.video-embed-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const id = trigger.getAttribute('data-youtube-id');
    const title = trigger.getAttribute('data-youtube-title') || 'YouTube video';
    if (!id) return;

    const frame = document.createElement('iframe');
    // nocookie, and autoplay because the click WAS the request to play.
    frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
    frame.title = title;
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allowFullscreen = true;

    trigger.replaceWith(frame);
    // Focus was on the button that just vanished; move it to the player so
    // keyboard users are not dropped back at the top of the document.
    frame.focus();
  });
});
