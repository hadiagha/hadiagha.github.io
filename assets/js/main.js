// Theme toggle.
// data-theme is already on <html> before first paint, set by the inline script
// in the head. This only handles toggling from here on.
(function () {
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  var root = document.documentElement;

  // The two icons are drawn once and swapped, rather than rewriting innerHTML
  // on every click.
  var MOON = 'M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1Z';
  var SUN =
    'M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6ZM12 1.8v2.4M12 19.8v2.4' +
    'M4.8 12H2.4M21.6 12h-2.4M6.9 6.9 5.2 5.2M18.8 18.8l-1.7-1.7' +
    'M6.9 17.1l-1.7 1.7M18.8 5.2l-1.7 1.7';

  var path = toggle.querySelector('path');

  function paint(theme) {
    var dark = theme === 'dark';
    toggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    if (path) path.setAttribute('d', dark ? SUN : MOON);
  }

  paint(root.getAttribute('data-theme') || 'light');

  toggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
    paint(next);
  });
})();


// Mobile navigation.
(function () {
  var navToggle = document.getElementById('nav-toggle');
  var navMenu = document.getElementById('nav-menu');
  if (!navToggle || !navMenu) return;

  function setOpen(open) {
    navMenu.classList.toggle('active', open);
    navToggle.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  setOpen(false);

  navToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!navMenu.classList.contains('active'));
  });

  document.addEventListener('click', function (e) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) setOpen(false);
  });

  // Escape closes the menu and returns focus to the button that opened it.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      setOpen(false);
      navToggle.focus();
    }
  });
})();


// Copy-to-clipboard for citations.
(function () {
  var buttons = document.querySelectorAll('.copy-btn');
  if (!buttons.length) return;

  Array.prototype.forEach.call(buttons, function (button) {
    // Only the label changes; rewriting innerHTML would throw away the icon
    // and, with it, anything a screen reader had already announced.
    var label = button.querySelector('span');
    if (!label) return;
    var original = label.textContent;
    var timer;

    button.addEventListener('click', function () {
      var text = button.getAttribute('data-clipboard-text');

      function done(message, ok) {
        label.textContent = message;
        button.classList.toggle('copied', ok);
        clearTimeout(timer);
        timer = setTimeout(function () {
          label.textContent = original;
          button.classList.remove('copied');
        }, 2000);
      }

      if (!navigator.clipboard) {
        done('Press ⌘C', false);
        return;
      }

      navigator.clipboard.writeText(text).then(
        function () { done('Copied', true); },
        function () { done('Press ⌘C', false); }
      );
    });
  });
})();


// Headings: ids, anchor links and the table of contents.
//
// kramdown already gives every Markdown heading a slug id, so ids are only
// generated here for headings written as raw HTML in a page. That matters:
// the previous version numbered them `heading-0`, `heading-1`, ... from the
// top of the document, so inserting a section silently repointed every anchor
// below it and a link someone had saved landed in the wrong place.
(function () {
  var prose = document.querySelector('.prose');
  if (!prose) return;

  var headings = prose.querySelectorAll('h2, h3, h4');
  if (!headings.length) {
    // The layout committed to the two-column grid from `toc: true`. A post
    // with no headings is the one case the front matter could not know about,
    // so undo it rather than leaving an empty rail.
    Array.prototype.forEach.call(document.querySelectorAll('.has-toc'), function (el) {
      el.classList.remove('has-toc');
    });
    return;
  }

  var seen = Object.create(null);

  function slugify(text) {
    var base = text
      .toLowerCase()
      .trim()
      .replace(/[\u2018\u2019\u201c\u201d']/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    if (!base) base = 'section';
    // Two sections legitimately called "Results" must not share an id.
    if (seen[base] === undefined) {
      seen[base] = 0;
      return base;
    }
    seen[base] += 1;
    return base + '-' + seen[base];
  }

  Array.prototype.forEach.call(headings, function (heading) {
    if (heading.id) seen[heading.id] = 0;
  });

  // Every prose page gets anchor links, not just posts with a contents rail.
  Array.prototype.forEach.call(headings, function (heading) {
    if (!heading.id) heading.id = slugify(heading.textContent);

    var a = document.createElement('a');
    a.className = 'heading-anchor';
    a.href = '#' + heading.id;
    a.textContent = '#';
    a.setAttribute('aria-label', 'Link to this section');
    heading.appendChild(a);
  });

  var container = document.getElementById('toc');
  if (!container) return;

  var list = document.createElement('ul');
  var stack = [list];
  var current = list;
  var level = 2;

  Array.prototype.forEach.call(headings, function (heading) {
    var thisLevel = parseInt(heading.tagName.charAt(1), 10);

    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + heading.id;
    // Not heading.textContent: the anchor link has already been appended, so
    // that would put a stray "#" on the end of every entry.
    a.textContent = headingText(heading);
    li.appendChild(a);

    if (thisLevel > level) {
      var nested = document.createElement('ul');
      var last = current.lastElementChild;
      if (last) last.appendChild(nested);
      else current.appendChild(nested);
      stack.push(nested);
      current = nested;
    } else if (thisLevel < level) {
      for (var i = 0; i < level - thisLevel; i++) {
        if (stack.length > 1) stack.pop();
      }
      current = stack[stack.length - 1];
    }

    current.appendChild(li);
    level = thisLevel;
  });

  function headingText(heading) {
    var clone = heading.cloneNode(true);
    var anchor = clone.querySelector('.heading-anchor');
    if (anchor) anchor.remove();
    return clone.textContent.trim();
  }

  container.appendChild(list);

  if (!('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      Array.prototype.forEach.call(container.querySelectorAll('a'), function (link) {
        link.classList.remove('active');
      });
      var active = container.querySelector('a[href="#' + entry.target.id + '"]');
      if (active) active.classList.add('active');
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  Array.prototype.forEach.call(headings, function (h) { observer.observe(h); });
})();


// In-page anchors.
// The original called preventDefault() on every '#' link without updating the
// hash or moving focus, which broke deep linking, the back button and — once a
// skip link existed — keyboard navigation entirely.
document.addEventListener('click', function (e) {
  var anchor = e.target.closest ? e.target.closest('a[href^="#"]') : null;
  if (!anchor) return;

  var hash = anchor.getAttribute('href');
  if (hash === '#' || hash.length < 2) return;

  var target = document.getElementById(hash.slice(1));
  if (!target) return;

  e.preventDefault();

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });

  // Keep the URL copyable and the back button working.
  history.pushState(null, '', hash);

  // Move keyboard focus, not just the viewport. Headings are not focusable by
  // default, so give the target a temporary tabindex.
  if (!target.hasAttribute('tabindex')) {
    target.setAttribute('tabindex', '-1');
    target.addEventListener('blur', function () {
      target.removeAttribute('tabindex');
    }, { once: true });
  }
  target.focus({ preventScroll: true });
});


// Filters on /writing/.
//
// Two independent axes — kind and topic — combined with AND. The list is
// already in the page; this only hides rows. The controls are hidden by CSS
// unless <html> carries the `js` class, so a reader without JavaScript sees
// the full archive and no dead buttons.
(function () {
  var list = document.getElementById('entries');
  if (!list) return;

  var bars = document.querySelectorAll('.filters');
  if (!bars.length) return;

  var empty = document.getElementById('entries-empty');
  var entries = list.querySelectorAll('.entry');

  // The state is readable from and writable to the URL, so a filtered view can
  // be linked to: /writing/?tag=optimization&kind=note. That is what topic
  // links elsewhere on the site point at, rather than an anchor on /tags/ —
  // an anchor only exists once a topic has a post, so those links broke for
  // every subject not yet written about.
  function fromUrl() {
    var params = new URLSearchParams(location.search);
    return {
      kind: params.get('kind') || 'all',
      tag: params.get('tag') || 'all'
    };
  }

  var state = fromUrl();

  function toUrl() {
    var params = new URLSearchParams();
    if (state.kind !== 'all') params.set('kind', state.kind);
    if (state.tag !== 'all') params.set('tag', state.tag);
    var query = params.toString();
    // replaceState, not pushState: filtering is not navigation, and every
    // click would otherwise be one more press of the back button to escape.
    history.replaceState(null, '', location.pathname + (query ? '?' + query : ''));
  }

  function paintButtons() {
    Array.prototype.forEach.call(bars, function (bar) {
      Array.prototype.forEach.call(bar.querySelectorAll('.filter'), function (button) {
        var axis = button.getAttribute('data-filter');
        var on = button.getAttribute('data-value') === state[axis];
        button.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    });
  }

  function apply() {
    var visible = 0;

    Array.prototype.forEach.call(entries, function (entry) {
      var kindOk = state.kind === 'all' || entry.getAttribute('data-kind') === state.kind;
      var tags = (entry.getAttribute('data-tags') || '').split(' ');
      var tagOk = state.tag === 'all' || tags.indexOf(state.tag) !== -1;
      var show = kindOk && tagOk;
      entry.hidden = !show;
      if (show) visible++;
    });

    if (empty) empty.hidden = visible > 0;

    // The first visible row draws no top border, which is a :first-child rule —
    // and :first-child does not care that the rows above it are hidden. Mark it
    // so the list still starts with a clean edge after filtering.
    var first = true;
    Array.prototype.forEach.call(entries, function (entry) {
      entry.classList.toggle('is-first', !entry.hidden && first);
      if (!entry.hidden) first = false;
    });
  }

  Array.prototype.forEach.call(bars, function (bar) {
    bar.addEventListener('click', function (e) {
      var button = e.target.closest('.filter');
      if (!button || !bar.contains(button)) return;

      state[button.getAttribute('data-filter')] = button.getAttribute('data-value');
      paintButtons();
      apply();
      toUrl();
    });
  });

  // A filter named in the URL may not have a button — a topic with no posts
  // yet. Keep the state anyway: the list correctly shows nothing, which is the
  // honest answer, rather than silently widening to everything.
  paintButtons();
  apply();
})();
