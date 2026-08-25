---
layout: page
title: Contact
description: Get in touch with me
permalink: /contact/
---

<div class="contact-page">
  <div class="contact-intro">
    <p>I'm always happy to connect with practitioners, researchers, and students interested in machine learning, reinforcement learning for business, and applied ML systems.</p>
  </div>

  <div class="contact-methods">
    <div class="contact-card">
      <div class="contact-icon">
        {% include icon.html name="envelope" %}
      </div>
      <h3>Email</h3>
      <p>For collaboration, speaking, consulting, or academic inquiries</p>
      <a href="mailto:hadi@hadiaghazadeh.com" class="contact-link">hadi@hadiaghazadeh.com</a>
    </div>
  
    <div class="contact-card">
      <div class="contact-icon">
        {% include icon.html name="university" %}
      </div>
      <h3>Office</h3>
      <p>Department of Geomatics Engineering<br>
      University of Calgary<br>
      Calgary, Alberta, Canada</p>
    </div>
  </div>

  <div class="social-section">
    <h2>Connect on Social Media</h2>
  {% comment %}
    The ORCID and ResearchGate cards that used to sit here pointed at those
    sites' homepages rather than at any profile, and the Google Scholar card did
    the same. Only links that actually resolve to Hadi are listed now.
  {% endcomment %}
    <div class="social-grid">
      <a href="https://scholar.google.ca/citations?user={{ site.author.social.google_scholar }}" class="social-card" rel="noopener me">
        {% include icon.html name="graduation-cap" %}
        <span>Google Scholar</span>
      </a>
      <a href="https://github.com/{{ site.author.social.github }}" class="social-card" rel="noopener me">
        {% include icon.html name="github" %}
        <span>GitHub</span>
      </a>
      <a href="https://www.linkedin.com/in/{{ site.author.social.linkedin }}" class="social-card" rel="noopener me">
        {% include icon.html name="linkedin" %}
        <span>LinkedIn</span>
      </a>
      <a href="https://www.youtube.com/@{{ site.author.social.youtube }}" class="social-card" rel="noopener me">
        {% include icon.html name="youtube" %}
        <span>YouTube</span>
      </a>
      <a href="https://x.com/{{ site.author.social.twitter }}" class="social-card" rel="noopener me">
        {% include icon.html name="x-twitter" %}
        <span>X</span>
      </a>
      <a href="{{ '/feed.xml' | relative_url }}" class="social-card">
        {% include icon.html name="rss" %}
        <span>RSS</span>
      </a>
    </div>
  </div>

  {% comment %}
    A contact form used to sit here posting to formspree.io/f/your-form-id — a
    placeholder endpoint. Messages were accepted by the browser and silently
    discarded, and the setup instructions meant for a developer were rendered
    to every visitor. Email is the honest option until a real form is wired up.
  {% endcomment %}

  <div class="office-hours">
    <h2>Office Hours</h2>
    <p>Meetings are generally by appointment. Please email me with a brief description of your topic and a few time options.</p>
  </div>
</div>

<style>
.contact-page {
  max-width: 800px;
  margin: 0 auto;
}

.contact-intro {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 1.125rem;
  color: var(--color-text-light);
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.contact-card {
  text-align: center;
  padding: 2rem;
  background-color: var(--color-bg-secondary);
  border-radius: 0.75rem;
  transition: transform var(--transition-base);
  
  &:hover {
    transform: translateY(-4px);
  }
  
  .contact-icon {
    font-size: 3rem;
    color: var(--color-primary);
    margin-bottom: 1rem;
  }
  
  h3 {
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--color-text-light);
    margin-bottom: 1rem;
  }
  
  .contact-link {
    font-weight: 500;
  }
}

.social-section {
  margin-bottom: 3rem;
  
  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.social-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--color-bg-secondary);
  border-radius: 0.5rem;
  text-decoration: none;
  color: var(--color-text);
  transition: all var(--transition-base);
  
  &:hover {
    background-color: var(--color-primary);
    color: white;
    transform: translateY(-2px);
  }
  
  .icon {
    /* was `i`, when the icon was a font glyph */
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  span {
    font-weight: 500;
  }
}

.contact-form-section {
  background-color: var(--color-bg-secondary);
  padding: 2rem;
  border-radius: 0.75rem;
  margin-bottom: 3rem;
  
  h2 {
    margin-bottom: 1rem;
  }
  
  > p {
    margin-bottom: 2rem;
    color: var(--color-text-light);
  }
}

.contact-form {
  .form-group {
    margin-bottom: 1.5rem;
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    input, textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--color-border);
      border-radius: 0.375rem;
      font-family: inherit;
      font-size: 1rem;
      transition: border-color var(--transition-fast);
      background-color: var(--color-bg);
      color: var(--color-text);
      
      &:focus {
        outline: none;
        border-color: var(--color-primary);
      }
    }
    
    textarea {
      resize: vertical;
    }
  }
  
  button[type="submit"] {
    width: 100%;
    padding: 1rem;
    font-size: 1.125rem;
  }
}

.form-note {
  margin-top: 1rem;
  padding: 1rem;
  background-color: var(--color-bg);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: var(--color-text-light);
  
  code {
    background-color: var(--color-bg-tertiary);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
  }
}

.office-hours {
  background-color: var(--color-bg-secondary);
  padding: 2rem;
  border-radius: 0.75rem;
  
  h2 {
    margin-bottom: 1rem;
  }
  
  ul {
    margin: 1rem 0;
    padding-left: 2rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
}

@media (max-width: 768px) {
  .contact-methods {
    /* minmax(0, …) so a long email address cannot widen the page */
    grid-template-columns: minmax(0, 1fr);
  }

  .contact-card {
    padding: var(--space-lg) var(--space-md);
  }

  .contact-card .contact-icon {
    font-size: 2.25rem;
  }

  .social-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
