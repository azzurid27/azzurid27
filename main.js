// main.js

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates contact form data.
 * @param {{ name: string, email: string, message: string }} data
 * @returns {{ valid: boolean, errors: { name: string|null, email: string|null, message: string|null } }}
 */
function validateForm(data) {
  const errors = { name: null, email: null, message: null };

  if (!data.name || data.name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!data.message || data.message.trim() === '') {
    errors.message = 'Message is required';
  }

  const valid = errors.name === null && errors.email === null && errors.message === null;

  return { valid, errors };
}

/**
 * Toggles the mobile menu open/closed by adding or removing the 'open' class.
 * @param {Element} navLinks - The NavLinks element to toggle
 */
function toggleMenu(navLinks) {
  navLinks.classList.toggle('open');
}

/**
 * Highlights the nav link corresponding to the section currently in the viewport.
 * At most one nav link will have the 'active' class at any time.
 */
function highlightActiveNav() {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navAnchors = Array.from(document.querySelectorAll('.nav-links a'));

  let activeId = null;
  const scrollMid = window.scrollY + window.innerHeight / 2;

  for (const section of sections) {
    if (section.offsetTop <= scrollMid) {
      activeId = section.id;
    }
  }

  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + activeId);
  });
}

/**
 * Handles contact form submission — prevents default, validates, shows success or inline errors.
 * @param {Event} event - The form submit event
 */
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;

  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  const result = validateForm(data);

  // Clear previous errors
  document.getElementById('name-error').textContent = result.errors.name || '';
  document.getElementById('email-error').textContent = result.errors.email || '';
  document.getElementById('message-error').textContent = result.errors.message || '';

  const successMsg = document.getElementById('success-msg');

  if (result.valid) {
    successMsg.hidden = false;
    form.reset();
  } else {
    successMsg.hidden = true;
  }
}

/**
 * Initialises the page by attaching all event listeners with null guards.
 * Safe to call even if navbar or form elements are absent from the DOM.
 */
function initPage() {
  const navToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const form = document.getElementById('contact-form');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => toggleMenu(navLinks));
  }

  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  window.addEventListener('scroll', highlightActiveNav);
  highlightActiveNav(); // run once on load
}

document.addEventListener('DOMContentLoaded', initPage);

// Export for testing (Node.js/CommonJS environments)
if (typeof module !== 'undefined') {
  module.exports = { validateForm, toggleMenu };
}
