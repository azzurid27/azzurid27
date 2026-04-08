# Requirements Document

## Introduction

A simple, easy-to-use static website built with HTML5, CSS3, and vanilla JavaScript. The site includes a responsive navigation bar, a hero section, content sections, a contact form with client-side validation, and a footer. No external frameworks or build tools are required. The site must be functional without JavaScript (progressive enhancement) and load quickly from any static host.

## Glossary

- **Page**: The single HTML document (`index.html`) that constitutes the website
- **Navbar**: The site-wide navigation bar rendered at the top of the Page
- **NavLinks**: The `<ul>` element inside the Navbar containing anchor links to page sections
- **MenuToggle**: The hamburger button that shows/hides NavLinks on mobile viewports
- **Hero**: The first full-viewport section containing the primary headline and call-to-action
- **ContentSection**: A reusable `<section>` element used for About, Services, and similar content
- **ContactForm**: The HTML form element with `id="contact-form"` that collects user input
- **Validator**: The `validateForm` JavaScript function responsible for validating ContactForm data
- **FormData**: A plain JavaScript object with `name`, `email`, and `message` string fields
- **ValidationResult**: The object returned by Validator containing `valid` (boolean) and `errors` (object with per-field string or null values)
- **JS**: The `main.js` vanilla JavaScript file loaded with `defer`

---

## Requirements

### Requirement 1: Page Structure and Navigation

**User Story:** As a visitor, I want a clear navigation bar with links to page sections, so that I can quickly jump to the content I need.

#### Acceptance Criteria

1. THE Page SHALL contain a Navbar with anchor links to the About, Services, and Contact sections
2. WHEN the MenuToggle is clicked on a mobile viewport, THE Navbar SHALL toggle the NavLinks visibility by adding or removing the `open` CSS class
3. WHEN the MenuToggle is clicked twice in succession, THE Navbar SHALL return the NavLinks to its original visibility state
4. WHEN the user scrolls the Page, THE Navbar SHALL apply the `active` CSS class to at most one NavLink at any given time
5. WHEN the user scrolls the Page, THE Navbar SHALL apply the `active` CSS class to the NavLink whose corresponding section is currently in the viewport

---

### Requirement 2: Hero Section

**User Story:** As a visitor, I want a prominent hero section with a headline and a call-to-action button, so that I immediately understand the site's purpose and know what to do next.

#### Acceptance Criteria

1. THE Page SHALL contain a Hero section with an `<h1>` headline, a subtitle paragraph, and a call-to-action anchor link
2. THE Hero section SHALL occupy the full viewport height on initial page load

---

### Requirement 3: Content Sections

**User Story:** As a visitor, I want clearly structured content sections, so that I can read about the site's offerings in an organized way.

#### Acceptance Criteria

1. THE Page SHALL contain at least two ContentSection elements (About and Services) with headings and descriptive text
2. THE Page SHALL apply consistent spacing and typography across all ContentSection elements

---

### Requirement 4: Contact Form and Validation

**User Story:** As a visitor, I want to send a message through a contact form, so that I can get in touch with the site owner.

#### Acceptance Criteria

1. THE ContactForm SHALL contain input fields for `name` (text), `email` (email), and `message` (textarea), each marked as required
2. WHEN a user submits the ContactForm with a non-empty `name`, a valid `email` address, and a non-empty `message`, THE Validator SHALL return a ValidationResult with `valid` equal to `true` and all `errors` fields equal to `null`
3. WHEN a user submits the ContactForm with an empty `name` field, THE Validator SHALL return a ValidationResult with `valid` equal to `false` and `errors.name` set to a non-null error string
4. WHEN a user submits the ContactForm with an `email` field that does not match the pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, THE Validator SHALL return a ValidationResult with `valid` equal to `false` and `errors.email` set to a non-null error string
5. WHEN a user submits the ContactForm with an empty `message` field, THE Validator SHALL return a ValidationResult with `valid` equal to `false` and `errors.message` set to a non-null error string
6. WHEN the ContactForm is submitted with valid data, THE Page SHALL display a success message and reset the ContactForm fields
7. WHEN the ContactForm is submitted with invalid data, THE Page SHALL display inline error messages adjacent to each invalid field without submitting the form
8. THE Validator SHALL return a ValidationResult without modifying the input FormData object

---

### Requirement 5: Progressive Enhancement and Accessibility

**User Story:** As a visitor using any browser or assistive technology, I want the site to be usable even without JavaScript, so that I can access the content regardless of my environment.

#### Acceptance Criteria

1. THE Page SHALL render all navigation links, Hero content, ContentSection text, and ContactForm fields without executing JS
2. THE JS file SHALL be loaded using the `defer` attribute so that HTML parsing is not blocked
3. THE Page SHALL not load any external JavaScript libraries or CSS frameworks
4. THE Navbar MenuToggle SHALL include an `aria-label` attribute describing its purpose
5. IF a required DOM element (Navbar, ContactForm) is not found at runtime, THEN THE JS SHALL skip attaching event listeners for that element without throwing an uncaught error

---

### Requirement 6: Performance and Deployment

**User Story:** As a site owner, I want the website to load fast and be deployable without a build step, so that I can host it on any static server with minimal effort.

#### Acceptance Criteria

1. THE Page SHALL consist of exactly three files: `index.html`, `style.css`, and `main.js`, with no build tools or package manager configuration required
2. WHERE images are included in the Page, THE Page SHALL set the `loading="lazy"` attribute on each `<img>` element
3. THE Page SHALL use CSS custom properties (variables) for color and typography theming to avoid redundant style declarations
