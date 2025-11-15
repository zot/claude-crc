# Developer Guide

<!-- Spec: main.md, coding-standards.md -->
<!-- CRC Cards: crc-Contact.md, crc-ContactValidator.md, crc-ContactStorage.md, crc-ContactService.md, crc-ContactListView.md, crc-ContactDetailView.md -->
<!-- Design: design/traceability.md -->

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Development Workflow](#development-workflow)
- [Adding Features](#adding-features)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing](#testing)
- [Build and Deployment](#build-and-deployment)

## Getting Started

### Prerequisites

<!-- Spec: main.md -->

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Text editor or IDE (VS Code recommended)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd claude-crc

# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server (opens browser automatically)
npm run dev

# Server runs at http://localhost:3000
```

The application uses Vite's hot module replacement, so changes are reflected immediately.

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests once (CI mode)
npm test -- --run
```

### Building for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

<!-- CRC: crc-Contact.md, crc-ContactService.md, crc-ContactStorage.md, crc-ContactValidator.md, crc-ContactListView.md, crc-ContactDetailView.md -->

```
claude-crc/
├── .claude/                # CRC modeling toolkit
│   ├── agents/            # AI agents (designer, documenter, etc.)
│   ├── doc/               # CRC methodology documentation
│   ├── skills/            # Reusable skills (PlantUML, etc.)
│   ├── scripts/           # Helper scripts
│   └── commands/          # Slash commands
│
├── specs/                 # Level 1: Human specifications
│   ├── main.md           # Main feature specifications
│   └── coding-standards.md  # Code organization and style
│
├── design/                # Level 2: Design models
│   ├── crc-*.md          # CRC cards (one per class)
│   ├── seq-*.md          # Sequence diagrams
│   ├── ui-*.md           # UI specifications
│   ├── test-*.md         # Test designs
│   ├── manifest-ui.md    # Global UI patterns
│   ├── traceability.md   # Spec → Design → Code map
│   ├── traceability-tests.md  # Test traceability
│   └── gaps.md           # Gap analysis
│
├── src/                   # Level 3: Implementation
│   ├── models/           # Data models
│   │   └── Contact.ts    # Contact data model (crc-Contact.md)
│   ├── utils/            # Utility functions
│   │   └── ContactValidator.ts  # Validation logic (crc-ContactValidator.md)
│   ├── services/         # Business logic
│   │   ├── ContactStorage.ts    # Storage abstraction (crc-ContactStorage.md)
│   │   └── ContactService.ts    # Business logic facade (crc-ContactService.md)
│   ├── ui/               # View components
│   │   ├── ContactListView.ts   # List view (crc-ContactListView.md)
│   │   └── ContactDetailView.ts # Detail/edit view (crc-ContactDetailView.md)
│   └── main.ts           # Application entry point
│
├── tests/                 # Test files (mirror src/ structure)
│   ├── models/
│   │   └── Contact.test.ts
│   ├── utils/
│   │   └── ContactValidator.test.ts
│   ├── services/
│   │   ├── ContactStorage.test.ts
│   │   └── ContactService.test.ts
│   └── ui/
│       ├── ContactListView.test.ts
│       └── ContactDetailView.test.ts
│
├── public/                # Static assets
│   ├── index.html        # Main HTML file
│   └── templates/        # HTML templates (if used)
│
├── docs/                  # Level 4: Documentation
│   ├── requirements.md   # Requirements documentation
│   ├── design.md         # Design overview
│   ├── developer-guide.md   # This file
│   └── user-manual.md    # User manual
│
├── templates/             # Empty templates for new CRC projects
│
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
├── vitest.config.ts       # Vitest test configuration
├── CLAUDE.md              # Project-specific instructions for Claude
└── README.md              # Project overview
```

**Key Directories**:

- **`.claude/`** - CRC modeling toolkit (reusable across projects)
- **`specs/`** - Level 1 human-written requirements and specifications
- **`design/`** - Level 2 AI-generated CRC cards, sequences, UI specs, test designs
- **`src/`** - Level 3 implementation code following design specs
- **`tests/`** - Test files following test designs in design/test-*.md
- **`docs/`** - Level 4 generated documentation

## Architecture

<!-- CRC: crc-ContactService.md, crc-ContactStorage.md -->

### Layers

The application follows a three-layer architecture:

```
┌─────────────────────────────────────────┐
│         UI Layer (Views)                │
│  ContactListView  ContactDetailView     │  - User interface
│                                         │  - Event handling
│                                         │  - Rendering
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│      Business Logic (Service)           │  - CRUD operations
│         ContactService                  │  - Workflow coordination
│                                         │  - ID generation
│                                         │  - Timestamp management
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│    Utilities & Data Access              │  - Validation rules
│  ContactValidator   ContactStorage      │  - Storage abstraction
│                                         │  - Error handling
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Data Model                      │  - Data structures
│           Contact                       │  - Type definitions
└─────────────────────────────────────────┘
```

**Data Flow**: User actions → Views → Service → Validator/Storage → Data Model

**Dependency Rules**:
- Dependencies flow downward only (no circular dependencies)
- UI depends on Service, NOT on Storage or Validator directly
- Service coordinates between layers
- Each layer has single responsibility

### Design Patterns

<!-- CRC: crc-ContactService.md, crc-ContactStorage.md, crc-ContactValidator.md -->

**Patterns Used**:

1. **Facade Pattern** - ContactService (see `crc-ContactService.md`)
   - Simplifies complex interactions for UI
   - Single interface for all CRUD operations
   - Coordinates validation, storage, and ID generation

2. **Repository Pattern** - ContactStorage (see `crc-ContactStorage.md`)
   - Abstracts storage mechanism
   - Easy to swap LocalStorage for API or IndexedDB
   - Centralizes error handling

3. **Value Object Pattern** - Contact (see `crc-Contact.md`)
   - Immutable data structure
   - Self-validating
   - Type-safe with TypeScript

4. **Strategy Pattern** - ContactValidator (see `crc-ContactValidator.md`)
   - Independent validation rules
   - Composable validators
   - Reusable across contexts

5. **MVC Pattern** - Views (see `crc-ContactListView.md`, `crc-ContactDetailView.md`)
   - Model: Contact
   - View: ContactListView, ContactDetailView
   - Controller: ContactService

6. **Singleton Pattern** - ContactStorage (see `crc-ContactStorage.md`)
   - Single instance manages storage
   - Consistent in-memory cache
   - No synchronization conflicts

### SOLID Principles

<!-- Source: coding-standards.md -->

**How SOLID principles are applied:**

**Single Responsibility**:
- `Contact` only knows about contact data
- `ContactValidator` only validates
- `ContactStorage` only handles persistence
- `ContactService` only coordinates business logic

**Open/Closed**:
- `ContactValidator` extensible (add new rules without modifying existing)
- Storage mechanism swappable (Repository pattern)
- Easy to add new views without changing service

**Liskov Substitution**:
- Any Contact instance is substitutable
- Storage implementations follow same interface

**Interface Segregation**:
- Focused interfaces (ContactService methods specific to needs)
- Validator methods separated by field

**Dependency Inversion**:
- Views depend on ContactService abstraction
- Service depends on ContactStorage abstraction
- High-level modules don't depend on low-level details

## Development Workflow

### CRC Methodology

<!-- Source: CLAUDE.md, .claude/doc/crc.md -->

This project follows the CRC three-tier methodology:

**Level 1: Specs** - Human-written requirements in `specs/`
- What the system should do
- Why features are needed
- Business requirements and constraints

**Level 2: Design** - AI-generated CRC cards, sequences in `design/`
- CRC cards define classes, responsibilities, collaborators
- Sequence diagrams show object interactions
- UI specs define layout and behavior
- Test designs specify testing approach

**Level 3: Code** - Implementation in `src/`
- Follows CRC cards exactly
- One CRC card = One class/module
- Traceability comments link code to design

**Level 4: Documentation** - Generated docs in `docs/`
- Requirements documentation from specs
- Design documentation from CRC cards
- Developer and user guides

**All code has traceability comments**:

```typescript
/**
 * CRC: crc-ContactService.md
 * Spec: main.md (FR2: Create Contact, FR4: Edit Contact, FR5: Delete Contact)
 * Sequence: seq-create-contact.md, seq-edit-contact.md
 */
export class ContactService {
  // Implementation follows CRC card responsibilities
}
```

### Adding Features

**Process:**

**1. Update/Create Level 1 Spec**

Add or modify requirement in `specs/`:

```markdown
### FR7: Search Contacts

Users shall be able to search contacts by name, email, or phone.

**Behavior:**
- Search input filters list in real-time
- Case-insensitive matching
- Shows matching contacts only
```

**2. Generate Level 2 Design**

Use designer agent to create CRC cards, sequences, UI specs, and test designs:

```
Task(subagent_type="designer",
     description="Generate Level 2 specs for search feature",
     prompt="Generate CRC cards, sequences, and UI specs for FR7: Search Contacts in specs/main.md")
```

This creates:
- `design/crc-SearchFilter.md` (new component)
- `design/seq-search-contacts.md` (search interaction)
- Updates to `design/ui-contact-list-view.md` (add search input)
- `design/test-SearchFilter.md` (test design)
- Updates to `design/traceability.md`

**3. Review Generated Design**

- Verify CRC cards match your intent
- Check sequence diagrams show correct flow
- Validate UI specs match desired layout
- Review test designs for completeness

**4. Implement Level 3 Code**

Implement following CRC cards:

```typescript
/**
 * CRC: crc-SearchFilter.md
 * Spec: main.md (FR7: Search Contacts)
 */
export class SearchFilter {
  // Implement responsibilities from CRC card

  filter(contacts: Contact[], query: string): Contact[] {
    // Implementation
  }
}
```

Add traceability comments to all files.

**5. Implement Tests**

Follow test designs in `design/test-*.md`:

```typescript
/**
 * Test Design: test-SearchFilter.md
 * CRC: crc-SearchFilter.md
 * Spec: main.md (FR7)
 */
describe('SearchFilter', () => {
  // Follow test cases from test design
});
```

**6. Verify Traceability**

Ensure:
- All code references design docs (CRC, Spec, Sequence)
- All design docs reference specs
- Traceability map updated (`design/traceability.md`)
- No gaps in coverage

**7. Update Documentation**

Regenerate or update project documentation:
- `docs/requirements.md` - Add new requirement
- `docs/design.md` - Add new component and flow
- `docs/developer-guide.md` - Update architecture if needed
- `docs/user-manual.md` - Add how-to guide for search

## Code Style Guidelines

<!-- Source: coding-standards.md -->

### Naming Conventions

**Classes/Interfaces**:
```typescript
ContactService       // PascalCase
ContactValidator     // Nouns describing what class represents
IContactRepository   // Interfaces prefixed with I (optional)
```

**Functions/Methods**:
```typescript
createContact()       // camelCase
validateEmail()       // Verbs describing what function does
formatPhoneNumber()   // Clear, descriptive names
isValid()            // Boolean functions: is, has, can, should
```

**Variables**:
```typescript
contactList          // camelCase
currentContact       // Descriptive names
isValid              // Boolean: is, has, can, should prefix
```

**Constants**:
```typescript
MAX_NAME_LENGTH      // UPPER_SNAKE_CASE
DEFAULT_PAGE_SIZE    // Clearly indicate immutable values
```

### Type Safety

<!-- Source: coding-standards.md -->

**All function parameters and return values must have explicit types:**

```typescript
// ✅ Good
function createContact(name: string, email?: string): Contact {
  // Implementation
}

// ❌ Bad (implicit any)
function createContact(name, email) {
  // Implementation
}
```

**No use of `any` type:**

```typescript
// ✅ Good
interface Contact {
  id: string;
  name: string;
  email?: string;
}

// ❌ Bad
let contact: any = { /* ... */ };
```

### Functions and Methods

<!-- Source: coding-standards.md -->

**Single Responsibility**:
```typescript
// ✅ Good - each function does one thing
function saveContact(contact: Contact): void { /* ... */ }
function notifyUser(message: string): void { /* ... */ }

// ❌ Bad - function does multiple things
function saveAndNotifyUser(contact: Contact): void { /* ... */ }
```

**Function Length**:
- Keep functions short (ideally < 50 lines)
- Extract complex logic into helper functions
- If function is too long, it probably violates SRP

**Parameters**:
- Limit to 3-4 parameters maximum
- Use objects for multiple related parameters
- Provide sensible defaults where appropriate

### Comments and Documentation

<!-- Source: coding-standards.md -->

**Function Documentation**:
```typescript
/**
 * Creates a new contact with validation.
 *
 * CRC: crc-ContactService.md
 * Spec: main.md (FR2: Create Contact)
 * Sequence: seq-create-contact.md
 *
 * @param name - Contact name (required, 1-100 characters)
 * @param email - Optional email (validated format)
 * @param phone - Optional phone (10-20 characters)
 * @param notes - Optional notes (max 500 characters)
 * @returns Created contact with generated ID and timestamps
 * @throws {ValidationError} If validation fails
 */
async createContact(
  name: string,
  email?: string,
  phone?: string,
  notes?: string
): Promise<Contact> {
  // Implementation
}
```

**Code Comments**:
```typescript
// BAD: Increment i
i++;

// GOOD: Skip header row
i++;

// GOOD: Use binary search for O(log n) performance on large datasets
const index = binarySearch(sortedArray, target);
```

**When to Comment**:
- DO comment: Complex algorithms, business rules, "why" decisions
- DON'T comment: Obvious code, what code does (code should be self-documenting)

### Error Handling

<!-- Source: coding-standards.md -->

**Fail Fast**:
```typescript
function createContact(name: string): Contact {
  // Validate inputs at function boundaries
  if (!name || name.length < 1 || name.length > 100) {
    throw new Error("Contact name is required (1-100 characters)");
  }

  // Implementation
}
```

**Clear Error Messages**:
```typescript
// ❌ Bad
throw new Error("Invalid");

// ✅ Good
throw new Error("Contact name is required (1-100 characters)");
```

## Testing

<!-- Test Design: test-Contact.md, test-ContactValidator.md, test-ContactStorage.md, test-ContactService.md, test-ContactListView.md, test-ContactDetailView.md -->

### Test Strategy

**Test Levels**:
- **Unit tests** - Test individual components in isolation
- **Integration tests** - Test workflows across components
- **Component tests** - Test UI components with DOM

**Test Location**: All tests in `tests/` directory (mirrors `src/` structure)

**Test Design**: All tests follow test designs in `design/test-*.md`

**Coverage Target**: 80%+ code coverage

### Test Organization

```typescript
/**
 * Test Design: test-ContactService.md
 * CRC: crc-ContactService.md
 * Spec: main.md
 */
describe('ContactService', () => {
  describe('createContact', () => {
    it('should create contact with valid data', () => {
      // Test implementation following test design
    });

    it('should throw error for missing name', () => {
      // Test error case
    });

    it('should auto-generate ID and timestamps', () => {
      // Test auto-generation
    });
  });

  describe('updateContact', () => {
    // Update tests
  });
});
```

**Test Naming**:
- Use descriptive test names
- Follow "should [expected behavior] when [condition]" pattern
- Group related tests with `describe` blocks

### Writing Tests

**Each test should:**

1. Reference test design document
2. Reference CRC card
3. Reference spec
4. Follow AAA pattern (Arrange, Act, Assert)
5. Be independent (no dependencies on other tests)

**Example**:

```typescript
/**
 * Test Design: test-ContactValidator.md
 * CRC: crc-ContactValidator.md
 * Spec: main.md (FR2: Create Contact - Validation)
 */
describe('ContactValidator', () => {
  describe('validateEmail', () => {
    it('should pass for valid email format', () => {
      // Arrange
      const validator = new ContactValidator();
      const validEmail = 'test@example.com';

      // Act
      const result = validator.validateEmail(validEmail);

      // Assert
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should fail for invalid email format', () => {
      // Arrange
      const validator = new ContactValidator();
      const invalidEmail = 'not-an-email';

      // Act
      const result = validator.validateEmail(invalidEmail);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid email format');
    });
  });
});
```

### Running Tests

```bash
# Watch mode (recommended for development)
npm test

# Run once
npm test -- --run

# With coverage
npm test -- --coverage

# UI mode (interactive)
npm run test:ui
```

### Test Independence

<!-- Source: coding-standards.md -->

- Tests must not depend on each other
- Use setup/teardown for test data
- Clean up after tests (reset state, clear storage)

```typescript
describe('ContactStorage', () => {
  let storage: ContactStorage;

  beforeEach(() => {
    // Setup: Create fresh storage instance
    storage = new ContactStorage();
    localStorage.clear();
  });

  afterEach(() => {
    // Teardown: Clean up
    localStorage.clear();
  });

  it('should save contact to localStorage', () => {
    // Test is independent
  });
});
```

## Build and Deployment

### Development Build

```bash
# Start dev server with hot reload
npm run dev

# Server runs at http://localhost:3000
# Changes reflect immediately
```

**Vite Configuration** (`vite.config.ts`):
- Root: `public/` directory
- Port: 3000
- Auto-open browser
- Hot module replacement (HMR)
- Path alias: `@` → `src/`

### Production Build

```bash
# Build optimized bundle
npm run build

# Output directory: dist/
# - Minified JavaScript
# - Optimized CSS
# - Compressed assets
```

**Build Output**:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── (other assets)
```

### Preview Production Build

```bash
# Preview production build locally
npm run preview

# Serves dist/ folder
# Tests production build before deployment
```

### Deployment

**Static Hosting** (Netlify, Vercel, GitHub Pages):

1. Build production bundle: `npm run build`
2. Deploy `dist/` directory
3. Configure SPA routing (redirect all routes to index.html)

**Example Netlify config** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Environment Variables**:
- Currently none required (LocalStorage only)
- Future: Add API_URL for server backend

### Browser Support

<!-- Spec: main.md (NFR4) -->

**Target Browsers**:
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)

**Required APIs**:
- LocalStorage
- History API (for routing)
- ES2020+ features (via build transpilation)

### Performance Monitoring

<!-- Spec: main.md (NFR1) -->

**Performance Targets**:
- List view render: < 100ms (up to 1000 contacts)
- Save operations: < 200ms
- Field validation: < 50ms

**Monitoring**:
```typescript
// Add performance markers
performance.mark('list-render-start');
// ... render logic
performance.mark('list-render-end');
performance.measure('list-render', 'list-render-start', 'list-render-end');

const measure = performance.getEntriesByName('list-render')[0];
console.log(`List render took ${measure.duration}ms`);
```

---

*Last updated: 2025-11-15*
*Complete developer documentation for Contact Manager CRC project*
