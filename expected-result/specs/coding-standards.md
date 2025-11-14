# Coding Standards

**Project:** Contact Manager
**Purpose:** Code organization, style, and quality guidelines

---

## Core Principles

### SOLID Principles

All code shall follow SOLID design principles:

1. **Single Responsibility**: Each class/module has one reason to change
2. **Open/Closed**: Open for extension, closed for modification
3. **Liskov Substitution**: Subtypes must be substitutable for base types
4. **Interface Segregation**: Many specific interfaces better than one general
5. **Dependency Inversion**: Depend on abstractions, not concretions

### DRY (Don't Repeat Yourself)

- Extract common logic into reusable functions/classes
- Avoid copy-paste programming
- Use composition and inheritance appropriately

### KISS (Keep It Simple, Stupid)

- Prefer simple solutions over complex ones
- Avoid premature optimization
- Write code that is easy to understand and maintain

---

## Code Organization

### File Structure

```
project/
├── src/               # Source code
│   ├── models/        # Data models
│   ├── services/      # Business logic
│   ├── ui/            # UI components/views
│   └── utils/         # Utility functions
├── tests/             # Test files (mirror src/ structure)
├── public/            # Static assets
│   └── templates/     # HTML templates
└── docs/              # Documentation
```

### Module Organization

- **Models**: Pure data structures with validation logic
- **Services**: Business logic, data access, storage operations
- **UI/Views**: User interface components and view controllers
- **Utils**: Helper functions, formatters, validators

### File Naming

- Use descriptive, meaningful names
- Consistent casing (e.g., PascalCase for classes, camelCase for functions)
- Test files: Same name as source file with `.test` suffix

---

## Naming Conventions

### Classes/Interfaces

```
ContactService
ContactValidator
IContactRepository
```

- PascalCase
- Nouns describing what the class represents
- Interfaces prefixed with `I` (optional, depends on language)

### Functions/Methods

```
createContact()
validateEmail()
formatPhoneNumber()
```

- camelCase
- Verbs describing what the function does
- Boolean functions start with `is`, `has`, `can`, `should`

### Variables

```
contactList
currentContact
isValid
```

- camelCase
- Descriptive names (avoid single letters except in loops)
- Boolean variables: `is`, `has`, `can`, `should` prefix

### Constants

```
MAX_NAME_LENGTH
DEFAULT_PAGE_SIZE
```

- UPPER_SNAKE_CASE
- Clearly indicate immutable values

---

## Type Safety

### Explicit Types

- All function parameters must have explicit types
- All function return values must have explicit types
- No use of `any` type (use proper interfaces/types)
- Object properties must have explicit types

### Example (TypeScript-style)

```typescript
interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
  created: Date;
  modified: Date;
}

function createContact(name: string, email?: string): Contact {
  // Implementation
}
```

---

## Functions and Methods

### Single Responsibility

Each function should do one thing well:

```
❌ Bad: saveAndNotifyUser()
✅ Good: saveContact(), then notifyUser()
```

### Function Length

- Keep functions short (ideally < 50 lines)
- Extract complex logic into helper functions
- If function is too long, it probably violates SRP

### Parameters

- Limit to 3-4 parameters maximum
- Use objects for multiple related parameters
- Provide sensible defaults where appropriate

### Return Values

- Return early for error/edge cases
- Prefer single return type (avoid union types when possible)
- Document return value purpose

---

## Error Handling

### Fail Fast

- Validate inputs at function boundaries
- Throw errors for truly exceptional cases
- Return error objects for expected failures

### Error Messages

- Clear, actionable error messages
- Include context (what failed, why, what to do)
- Log errors appropriately

### Example

```
❌ Bad: throw new Error("Invalid")
✅ Good: throw new Error("Contact name is required (1-100 characters)")
```

---

## Comments and Documentation

### When to Comment

- **Do comment**: Complex algorithms, business rules, "why" decisions
- **Don't comment**: Obvious code, what code does (code should be self-documenting)

### Function Documentation

Document all public functions with:
- Purpose/description
- Parameters (name, type, description)
- Return value (type, description)
- Exceptions/errors thrown
- Usage examples (for complex functions)

### Code Comments

```typescript
// BAD: Increment i
i++;

// GOOD: Skip header row
i++;

// GOOD: Use binary search for O(log n) performance on large datasets
const index = binarySearch(sortedArray, target);
```

---

## Testing

### Test Coverage

- Aim for 80%+ code coverage
- Test all public APIs
- Test edge cases and error conditions
- Test integration points between modules

### Test Organization

```
describe('ContactService', () => {
  describe('createContact', () => {
    it('should create contact with valid data', () => { });
    it('should throw error for missing name', () => { });
    it('should auto-generate ID and timestamps', () => { });
  });
});
```

### Test Naming

- Use descriptive test names
- Follow "should [expected behavior] when [condition]" pattern
- Group related tests with `describe` blocks

### Test Independence

- Tests must not depend on each other
- Use setup/teardown for test data
- Clean up after tests (reset state, clear storage)

---

## Version Control

### Commit Messages

```
✅ Good:
Add contact validation for email and phone fields
Fix bug where contacts weren't persisting to storage
Refactor ContactService to use dependency injection

❌ Bad:
fixed stuff
updates
wip
```

- Start with verb in present tense
- Be specific about what changed
- Reference issue numbers when applicable

### Commit Frequency

- Commit logical units of work
- Commit working code (tests passing)
- Commit before large refactorings

---

## Code Review Checklist

Before submitting code for review, verify:

- [ ] Code follows SOLID principles
- [ ] Functions are focused and single-purpose
- [ ] All types are explicit
- [ ] Error handling is appropriate
- [ ] Tests are written and passing
- [ ] Code is self-documenting (clear names)
- [ ] Comments explain "why", not "what"
- [ ] No dead code or commented-out code
- [ ] Performance is acceptable
- [ ] No security vulnerabilities

---

## Performance Guidelines

### Premature Optimization

- Don't optimize until you measure
- Profile before optimizing
- Readability > performance (unless measured bottleneck)

### Common Optimizations

- Cache expensive calculations
- Avoid unnecessary array copies
- Use efficient data structures
- Lazy load when appropriate
- Debounce/throttle expensive operations (UI updates, API calls)

---

## Security Considerations

### Input Validation

- Validate all user input
- Sanitize input before storage/display
- Use whitelist validation (allow known good, not deny known bad)

### Data Storage

- Never store sensitive data unencrypted
- Clear sensitive data from memory after use
- Validate data integrity on load

### XSS Prevention

- Escape all user-generated content before display
- Use framework's built-in XSS protection
- Avoid innerHTML with user data

---

## Accessibility

### WCAG 2.1 Level AA

- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Sufficient color contrast
- Focus indicators
- Screen reader compatibility

### Best Practices

- Use `<button>` for buttons (not `<div>` with click handlers)
- Provide alt text for images
- Use labels for form inputs
- Test with keyboard-only navigation
- Test with screen reader

---

## Dependencies

### Adding Dependencies

- Evaluate necessity (do we really need this?)
- Check license compatibility
- Check maintenance status (last update, open issues)
- Check bundle size impact
- Prefer smaller, focused libraries over large frameworks

### Dependency Updates

- Keep dependencies up to date
- Review changelogs before updating
- Test thoroughly after updates
- Use semantic versioning appropriately

---

## Documentation

### README

- Project overview and purpose
- Setup/installation instructions
- Usage examples
- Development workflow
- Testing instructions

### API Documentation

- Document all public APIs
- Include usage examples
- Document parameters and return values
- Document error conditions

### Inline Documentation

- Document complex algorithms
- Document non-obvious design decisions
- Document external integrations
- Document workarounds and their reasons
