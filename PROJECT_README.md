# Contact Manager - Level 3 Implementation

A simple contact management application built following the **CRC (Class-Responsibility-Collaborator) design methodology** with complete bidirectional traceability from specifications through design to implementation.

## Three-Tier Development Process

This project demonstrates the CRC three-tier development process:

```
Level 1: Human Specs (specs/*.md)
   ↓
Level 2: Design Models (design/*.md)
   ↓
Level 3: Implementation (src/**/*.ts) ← YOU ARE HERE
```

## Project Structure

```
.
├── specs/                      # Level 1: Human-written specifications
│   ├── main.md                 # Feature requirements and constraints
│   └── coding-standards.md     # Coding guidelines
│
├── design/                     # Level 2: Formal design models
│   ├── crc-*.md                # CRC cards (6 classes)
│   ├── seq-*.md                # Sequence diagrams (4 scenarios)
│   ├── ui-*.md                 # UI specifications (2 views + manifest)
│   ├── test-*.md               # Test designs (6 test suites)
│   ├── traceability.md         # Level 1↔2↔3 mapping
│   ├── traceability-tests.md   # Test traceability
│   └── gaps.md                 # Gap analysis
│
├── src/                        # Level 3: Implementation
│   ├── models/
│   │   └── Contact.ts          # Contact data model
│   ├── utils/
│   │   └── ContactValidator.ts # Validation logic
│   ├── services/
│   │   ├── ContactStorage.ts   # LocalStorage persistence
│   │   └── ContactService.ts   # Business logic facade
│   ├── ui/
│   │   ├── ContactListView.ts  # List view component
│   │   └── ContactDetailView.ts # Detail/edit view component
│   └── main.ts                 # Application entry point
│
├── tests/                      # Unit tests following test designs
│   ├── models/
│   │   └── Contact.test.ts
│   └── utils/
│       └── ContactValidator.test.ts
│
└── public/                     # Static assets
    ├── index.html
    └── css/
        └── styles.css
```

## Features Implemented

All features from `specs/main.md`:

- **FR1**: Contact data model (name, email, phone, notes, timestamps)
- **FR2**: Create new contacts with validation
- **FR3**: View contact list (sorted alphabetically)
- **FR4**: View and edit contact details
- **FR5**: Delete contacts with confirmation
- **FR6**: Persist data using LocalStorage

## Traceability

Every source file contains **traceability comments** linking back to design and specs:

```typescript
/**
 * CRC: crc-ContactService.md
 * Spec: main.md (FR2: Create, FR3: List, FR4: Edit, FR5: Delete)
 * Sequences: seq-create-contact.md, seq-edit-contact.md, seq-delete-contact.md
 */
export class ContactService {
  /**
   * CRC: crc-ContactService.md - "Does: createContact()"
   * Sequence: seq-create-contact.md
   * Creates new contact with validation
   */
  async createContact(name: string, email?: string, ...): Promise<Contact> {
    // Implementation
  }
}
```

Note: All traceability comments use **simple filenames** (e.g., `crc-Contact.md`) not qualified paths (e.g., `design/crc-Contact.md`), as specified in `CLAUDE.md`.

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start development server (http://localhost:3000)
npm run dev
```

## Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing

```bash
# Run unit tests
npm test

# Run tests with UI
npm run test:ui
```

## Testing Coverage

Sample tests are provided for:

- **Contact model** (`tests/models/Contact.test.ts`)
  - Follows test design: `design/test-Contact.md`
  - 7 test cases covering serialization, validation, and error handling

- **ContactValidator** (`tests/utils/ContactValidator.test.ts`)
  - Follows test design: `design/test-ContactValidator.md`
  - 14 test cases covering all validation rules

Each test case references its corresponding test design document, maintaining full traceability.

## Design Patterns Used

- **Repository Pattern** - ContactStorage abstracts persistence
- **Facade Pattern** - ContactService simplifies UI-to-storage interaction
- **MVC Pattern** - Clear separation of models, views, and services
- **Strategy Pattern** - Independent, composable validation rules
- **Singleton** - Single ContactStorage instance

## SOLID Principles Applied

- **Single Responsibility** - Each class has one focused purpose
- **Open/Closed** - Service layer allows extension without modification
- **Liskov Substitution** - Interfaces enable substitutability
- **Interface Segregation** - Specific, focused interfaces
- **Dependency Inversion** - Views depend on service abstractions

## Architecture

Four-layer architecture with clear dependency flow:

```
UI Layer (ContactListView, ContactDetailView)
    ↓
Service Layer (ContactService)
    ↓
Data Layer (ContactStorage)
    ↓
Model Layer (Contact, ContactValidator)
```

No circular dependencies - all dependencies flow downward.

## Key Design Decisions

1. **LocalStorage** - Simple persistence for small datasets
2. **In-memory caching** - Reduces LocalStorage reads for performance
3. **Inline validation** - Immediate feedback on field changes
4. **Unsaved change detection** - Tracks dirty state to prevent data loss
5. **Confirmation dialogs** - Protects against accidental delete/cancel
6. **Alphabetical sorting** - Always sorted by name for predictability
7. **UUID for IDs** - Ensures uniqueness without database coordination

## Browser Compatibility

- Modern browsers with ES2020 support
- LocalStorage API required
- No framework dependencies (vanilla TypeScript)

## CRC Methodology

This project was built using the CRC (Class-Responsibility-Collaborator) methodology:

1. **Level 1 Specs** - Human-written requirements and use cases
2. **Level 2 Design** - CRC cards, sequence diagrams, UI specs, test designs
3. **Level 3 Implementation** - Code with full traceability comments

For more information about the CRC methodology, see:
- `.claude/doc/crc.md` - Complete CRC documentation
- `.claude/doc/traceability-guide.md` - Traceability guidelines
- `design/traceability.md` - This project's traceability map

## Next Steps

To implement remaining test suites:

1. Implement `tests/services/ContactStorage.test.ts` following `design/test-ContactStorage.md`
2. Implement `tests/services/ContactService.test.ts` following `design/test-ContactService.md`
3. Implement `tests/ui/ContactListView.test.ts` following `design/test-ContactListView.md`
4. Implement `tests/ui/ContactDetailView.test.ts` following `design/test-ContactDetailView.md`

All test designs are complete and ready to be implemented.

## License

MIT

## Contributing

This project demonstrates CRC methodology. When making changes:

1. Update Level 1 specs if requirements change
2. Update Level 2 design docs if architecture changes
3. Update Level 3 code and maintain traceability comments
4. Keep all three levels in sync

See `CLAUDE.md` for bidirectional traceability principles.
