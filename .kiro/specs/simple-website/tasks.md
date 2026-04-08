# Implementation Plan

## Tasks

- [x] 1. Set up project file structure
  - Create `index.html` with HTML5 boilerplate, linking `style.css` and `main.js` (defer)
  - Create empty `style.css` and `main.js` files
  - Verify no external dependencies are referenced
  - **Requirements: 5.2, 5.3, 6.1**

- [x] 2. Build the HTML structure in index.html
  - [x] 2.1 Add Navbar with logo, NavLinks (About, Services, Contact), and MenuToggle button with `aria-label`
    - **Requirements: 1.1, 5.4**
  - [x] 2.2 Add Hero section with `<h1>`, subtitle `<p>`, and CTA anchor link
    - **Requirements: 2.1**
  - [x] 2.3 Add About and Services ContentSection elements with headings and placeholder text
    - **Requirements: 3.1**
  - [x] 2.4 Add ContactForm with `name`, `email`, `message` fields (all `required`) and a submit button
    - **Requirements: 4.1**
  - [x] 2.5 Add Footer element
  - Verify page renders all content with JS disabled
    - **Requirements: 5.1**

- [x] 3. Style the site in style.css
  - [x] 3.1 Define CSS custom properties for colors and typography
    - **Requirements: 6.3**
  - [x] 3.2 Style Navbar — horizontal layout, logo, nav links, and hidden mobile menu state
    - **Requirements: 1.1**
  - [x] 3.3 Style Hero section to occupy full viewport height (`min-height: 100vh`)
    - **Requirements: 2.2**
  - [x] 3.4 Style ContentSection elements with consistent spacing and typography
    - **Requirements: 3.2**
  - [x] 3.5 Style ContactForm fields, labels, error message placeholders, and success message
    - **Requirements: 4.6, 4.7**
  - [x] 3.6 Add responsive breakpoint — show MenuToggle and stack NavLinks on small viewports
    - **Requirements: 1.2**

- [x] 4. Implement validateForm in main.js
  - Write `validateForm(data)` that checks `name` non-empty, `email` matches regex, `message` non-empty
  - Return `ValidationResult` with `valid` boolean and per-field `errors` (null or string)
  - Ensure input `data` object is never mutated
  - **Requirements: 4.2, 4.3, 4.4, 4.5, 4.8**

- [x] 5. Implement initPage and event listeners in main.js
  - [x] 5.1 Implement `toggleMenu(navLinks)` — add/remove `open` class on NavLinks element
    - **Requirements: 1.2, 1.3**
  - [x] 5.2 Implement `highlightActiveNav()` — on scroll, set `active` class on at most one NavLink matching the in-viewport section
    - **Requirements: 1.4, 1.5**
  - [x] 5.3 Implement `handleFormSubmit(event)` — prevent default, call `validateForm`, show success message and reset form on valid, show inline errors on invalid
    - **Requirements: 4.6, 4.7**
  - [x] 5.4 Implement `initPage()` — guard with null checks before attaching all event listeners; call on `DOMContentLoaded`
    - **Requirements: 5.5**

- [~] 6. Write unit and property-based tests
  - [x] 6.1 Unit tests for `validateForm`: all valid → `valid:true`; empty name → error; bad email → error; empty message → error; all empty → all three errors
    - **Requirements: 4.2, 4.3, 4.4, 4.5**
  - [x] 6.2 Property test (fast-check) — Property 1: for any valid FormData, `validateForm` returns `valid:true`
    - **Requirements: 4.2**
  - [x] 6.3 Property test (fast-check) — Property 2: for any FormData with at least one invalid field, `validateForm` returns `valid:false` with the correct error fields set
    - **Requirements: 4.3, 4.4, 4.5**
  - [x] 6.4 Property test (fast-check) — Property 3: `validateForm` never mutates its input object
    - **Requirements: 4.8**
  - [-] 6.5 Property test (fast-check) — Property 5: calling `toggleMenu` twice returns NavLinks to its original `open` class state
    - **Requirements: 1.2, 1.3**
  - [~] 6.6 Integration test: load page in jsdom, submit valid form → success message visible, form reset
    - **Requirements: 4.6**
  - [~] 6.7 Integration test: load page in jsdom, submit invalid form → inline errors visible, form not reset
    - **Requirements: 4.7**
