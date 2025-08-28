---
layout: page
title: Contact
description: Get in touch with me
permalink: /contact/
---

<div class="contact-page">
  <div class="contact-intro">
    <p>I'm always happy to connect with fellow researchers, students, and anyone interested in my work. Feel free to reach out through any of the channels below.</p>
  </div>

  <div class="contact-methods">
    <div class="contact-card">
      <div class="contact-icon">
        <i class="fas fa-envelope"></i>
      </div>
      <h3>Email</h3>
      <p>For academic inquiries, collaboration proposals, or general questions</p>
      <a href="mailto:your-email@example.com" class="contact-link">your-email@example.com</a>
    </div>

    <div class="contact-card">
      <div class="contact-icon">
        <i class="fas fa-university"></i>
      </div>
      <h3>Office</h3>
      <p>Department of [Your Department]<br>
      University Name<br>
      Building Name, Room XXX<br>
      City, State ZIP</p>
    </div>

    <div class="contact-card">
      <div class="contact-icon">
        <i class="fas fa-phone"></i>
      </div>
      <h3>Phone</h3>
      <p>Office hours: Monday-Friday, 9 AM - 5 PM</p>
      <a href="tel:+1234567890" class="contact-link">+1 (234) 567-890</a>
    </div>
  </div>

  <div class="social-section">
    <h2>Connect on Social Media</h2>
    <div class="social-grid">
      <a href="https://twitter.com/yourhandle" class="social-card" target="_blank" rel="noopener">
        <i class="fab fa-twitter"></i>
        <span>Twitter</span>
      </a>
      <a href="https://linkedin.com/in/yourprofile" class="social-card" target="_blank" rel="noopener">
        <i class="fab fa-linkedin"></i>
        <span>LinkedIn</span>
      </a>
      <a href="https://github.com/yourusername" class="social-card" target="_blank" rel="noopener">
        <i class="fab fa-github"></i>
        <span>GitHub</span>
      </a>
      <a href="https://orcid.org/your-orcid" class="social-card" target="_blank" rel="noopener">
        <i class="fab fa-orcid"></i>
        <span>ORCID</span>
      </a>
      <a href="https://scholar.google.com/citations?user=your-id" class="social-card" target="_blank" rel="noopener">
        <i class="fas fa-graduation-cap"></i>
        <span>Google Scholar</span>
      </a>
      <a href="https://www.researchgate.net/profile/Your-Name" class="social-card" target="_blank" rel="noopener">
        <i class="fab fa-researchgate"></i>
        <span>ResearchGate</span>
      </a>
    </div>
  </div>

  <div class="contact-form-section">
    <h2>Send a Message</h2>
    <p>You can also use the form below to send me a message directly:</p>
    
    <form action="https://formspree.io/f/your-form-id" method="POST" class="contact-form">
      <div class="form-group">
        <label for="name">Name *</label>
        <input type="text" id="name" name="name" required>
      </div>
      
      <div class="form-group">
        <label for="email">Email *</label>
        <input type="email" id="email" name="email" required>
      </div>
      
      <div class="form-group">
        <label for="subject">Subject *</label>
        <input type="text" id="subject" name="subject" required>
      </div>
      
      <div class="form-group">
        <label for="message">Message *</label>
        <textarea id="message" name="message" rows="6" required></textarea>
      </div>
      
      <button type="submit" class="btn btn-primary">
        <i class="fas fa-paper-plane"></i> Send Message
      </button>
    </form>
    
    <p class="form-note">
      <strong>Note:</strong> To use this contact form, sign up for a free account at 
      <a href="https://formspree.io" target="_blank" rel="noopener">Formspree.io</a> 
      and replace <code>your-form-id</code> in the form action with your actual form ID.
    </p>
  </div>

  <div class="office-hours">
    <h2>Office Hours</h2>
    <p>I hold regular office hours for students and colleagues:</p>
    <ul>
      <li><strong>Monday:</strong> 2:00 PM - 4:00 PM</li>
      <li><strong>Wednesday:</strong> 10:00 AM - 12:00 PM</li>
      <li><strong>Friday:</strong> By appointment</li>
    </ul>
    <p>Please email me to schedule an appointment outside of these hours.</p>
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
  
  i {
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
    grid-template-columns: 1fr;
  }
  
  .social-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
