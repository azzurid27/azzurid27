const { validateForm } = require('./main.js');

describe('validateForm', () => {
  test('all valid fields → valid:true, all errors null', () => {
    const result = validateForm({ name: 'Alice', email: 'alice@example.com', message: 'Hello' });
    expect(result.valid).toBe(true);
    expect(result.errors.name).toBeNull();
    expect(result.errors.email).toBeNull();
    expect(result.errors.message).toBeNull();
  });

  test('empty name → valid:false, errors.name set', () => {
    const result = validateForm({ name: '', email: 'alice@example.com', message: 'Hello' });
    expect(result.valid).toBe(false);
    expect(result.errors.name).not.toBeNull();
  });

  test('bad email → valid:false, errors.email set', () => {
    const result = validateForm({ name: 'Alice', email: 'not-an-email', message: 'Hello' });
    expect(result.valid).toBe(false);
    expect(result.errors.email).not.toBeNull();
  });

  test('empty message → valid:false, errors.message set', () => {
    const result = validateForm({ name: 'Alice', email: 'alice@example.com', message: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.message).not.toBeNull();
  });

  test('all empty → valid:false, all three errors set', () => {
    const result = validateForm({ name: '', email: '', message: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.name).not.toBeNull();
    expect(result.errors.email).not.toBeNull();
    expect(result.errors.message).not.toBeNull();
  });
});

// **Validates: Requirements 4.2**
const fc = require('fast-check');

// Arbitrary for valid email addresses matching /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const validEmailArb = fc.tuple(
  fc.stringMatching(/^[^\s@]{1,10}$/),
  fc.stringMatching(/^[^\s@]{1,10}$/),
  fc.stringMatching(/^[^\s@]{1,5}$/)
).map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

describe('Property 1: valid inputs always produce valid:true', () => {
  test('for any valid FormData, validateForm returns valid:true', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
        validEmailArb,
        fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
        (name, email, message) => {
          const result = validateForm({ name, email, message });
          return result.valid === true &&
            result.errors.name === null &&
            result.errors.email === null &&
            result.errors.message === null;
        }
      )
    );
  });
});

// **Validates: Requirements 4.3, 4.4, 4.5**
describe('Property 2: invalid inputs always produce valid:false with correct errors', () => {
  test('empty name always produces errors.name set', () => {
    fc.assert(
      fc.property(
        fc.constant(''),
        validEmailArb,
        fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
        (name, email, message) => {
          const result = validateForm({ name, email, message });
          return result.valid === false && result.errors.name !== null;
        }
      )
    );
  });

  test('malformed email always produces errors.email set', () => {
    // Strings that don't match /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const invalidEmailArb = fc.string().filter(s => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s));
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
        invalidEmailArb,
        fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
        (name, email, message) => {
          const result = validateForm({ name, email, message });
          return result.valid === false && result.errors.email !== null;
        }
      )
    );
  });

  test('empty message always produces errors.message set', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
        validEmailArb,
        fc.constant(''),
        (name, email, message) => {
          const result = validateForm({ name, email, message });
          return result.valid === false && result.errors.message !== null;
        }
      )
    );
  });
});

// **Validates: Requirements 4.8**
describe('Property 3: validateForm never mutates its input', () => {
  test('input object is unchanged after validateForm call', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string(),
          email: fc.string(),
          message: fc.string()
        }),
        (data) => {
          const before = { name: data.name, email: data.email, message: data.message };
          validateForm(data);
          return data.name === before.name &&
            data.email === before.email &&
            data.message === before.message;
        }
      )
    );
  });
});

const { toggleMenu } = require('./main.js');

// **Validates: Requirements 1.2, 1.3**
describe('Property 5: toggleMenu is a strict state flip (round-trip)', () => {
  test('calling toggleMenu twice returns navLinks to original open class state', () => {
    fc.assert(
      fc.property(
        fc.boolean(), // initial state: true = has 'open', false = does not
        (initiallyOpen) => {
          // Create a minimal mock element with classList
          const classes = new Set(initiallyOpen ? ['open'] : []);
          const mockNavLinks = {
            classList: {
              toggle: (cls) => {
                if (classes.has(cls)) classes.delete(cls);
                else classes.add(cls);
              },
              contains: (cls) => classes.has(cls)
            }
          };

          const hadOpen = initiallyOpen;
          toggleMenu(mockNavLinks);
          toggleMenu(mockNavLinks);
          return mockNavLinks.classList.contains('open') === hadOpen;
        }
      )
    );
  });
});
