# Design Documentation

<!-- CRC Cards: crc-Contact.md, crc-ContactValidator.md, crc-ContactStorage.md, crc-ContactService.md, crc-ContactListView.md, crc-ContactDetailView.md -->
<!-- Sequences: seq-create-contact.md, seq-edit-contact.md, seq-delete-contact.md, seq-load-contacts.md -->
<!-- UI Specs: manifest-ui.md, ui-contact-list-view.md, ui-contact-detail-view.md -->

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [System Components](#system-components)
- [Design Patterns](#design-patterns)
- [Data Flow](#data-flow)
- [UI Architecture](#ui-architecture)
- [Key Design Decisions](#key-design-decisions)

## Architecture Overview

<!-- CRC: crc-ContactService.md, crc-ContactStorage.md, crc-ContactListView.md, crc-ContactDetailView.md -->

**Architecture Style**: Layered Architecture with MVC pattern for UI components

The system is organized into four primary layers:

```
┌─────────────────────────────────────────┐
│         UI Layer (Views)                │
│  ContactListView  ContactDetailView     │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│      Business Logic (Service)           │
│         ContactService                  │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│    Utilities & Data Access              │
│  ContactValidator   ContactStorage      │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Data Model                      │
│           Contact                       │
└─────────────────────────────────────────┘
```

**Component Diagram**:
```
ContactListView ──────┐
                      ├──> ContactService ──┐
ContactDetailView ────┘                     ├──> ContactStorage ──> LocalStorage
                                            │
                                            └──> ContactValidator
                                                       │
                                                       └──> Contact (validation)
```

**Dependency Flow**:
- UI components depend on service layer
- Service layer depends on storage and validation utilities
- All components depend on data model
- No circular dependencies
- Dependencies flow downward through layers

**Key Architectural Principles**:
- **Separation of Concerns**: Each layer has distinct responsibilities
- **Single Responsibility**: Each component does one thing well
- **Dependency Inversion**: Components depend on abstractions (service interface)
- **Facade Pattern**: ContactService simplifies complex interactions

## System Components

### Contact

<!-- CRC: crc-Contact.md -->

**Purpose**: Represents a single contact with all associated data and validation logic.

**Responsibilities**:
- Store contact data (id, name, email, phone, notes)
- Store audit timestamps (created, modified)
- Validate contact data against business rules
- Serialize/deserialize for storage

**Collaborates With**:
- ContactValidator (validates contact data)

**Key Properties**:
- `id: string` - Unique UUID identifier
- `name: string` - Full name (required, 1-100 chars)
- `email?: string` - Optional email (validated format)
- `phone?: string` - Optional phone (10-20 chars)
- `notes?: string` - Optional notes (max 500 chars)
- `created: Date` - Creation timestamp
- `modified: Date` - Last modification timestamp

**Key Methods**:
- `validate(): ValidationResult` - Validates all fields
- `toJSON(): string` - Serializes for storage
- `fromJSON(json: string): Contact` - Deserializes from storage

**Design Pattern**: Value Object - Immutable data structure with validation

**Design Decisions**:
1. UUID for IDs ensures uniqueness without coordination
2. Only name is required for flexibility
3. System manages timestamps for audit trail

### ContactValidator

<!-- CRC: crc-ContactValidator.md -->

**Purpose**: Centralized validation logic for contact data with clear error messages.

**Responsibilities**:
- Validate name (required, 1-100 characters)
- Validate email format (optional)
- Validate phone format (10-20 characters, optional)
- Validate notes length (max 500 characters)
- Validate complete contact object

**Collaborates With**:
- Contact (provides data to validate)
- ContactService (called during save operations)
- ContactDetailView (inline field validation)

**Key Constants**:
- `MAX_NAME_LENGTH = 100`
- `MIN_NAME_LENGTH = 1`
- `MAX_NOTES_LENGTH = 500`
- `MIN_PHONE_LENGTH = 10`
- `MAX_PHONE_LENGTH = 20`

**Key Methods**:
- `validateName(name: string): ValidationResult`
- `validateEmail(email: string): ValidationResult`
- `validatePhone(phone: string): ValidationResult`
- `validateNotes(notes: string): ValidationResult`
- `validateContact(contact: Contact): ValidationResult`

**Design Pattern**: Strategy Pattern - Independent, composable validation rules

**Design Decisions**:
1. Fail fast - Return errors immediately without partial saves
2. Clear messages - Include field name, constraint, current value
3. Optional field handling - Empty/null optional fields pass validation

### ContactStorage

<!-- CRC: crc-ContactStorage.md -->

**Purpose**: Abstract storage mechanism and provide consistent data access interface.

**Responsibilities**:
- Persist contacts to LocalStorage
- Retrieve contacts from LocalStorage
- Maintain in-memory cache for performance
- Handle storage errors (quota, access denied)
- Validate data integrity on load

**Collaborates With**:
- Contact (stores and retrieves contact objects)
- ContactService (provides storage operations)

**Key Properties**:
- `STORAGE_KEY = "contacts"` - LocalStorage key
- `contacts: Map<string, Contact>` - In-memory cache

**Key Methods**:
- `initialize(): Promise<void>` - Loads from LocalStorage on startup
- `saveContact(contact: Contact): Promise<void>` - Persists contact
- `getContact(id: string): Promise<Contact | null>` - Retrieves single contact
- `getAllContacts(): Promise<Contact[]>` - Retrieves all contacts
- `deleteContact(id: string): Promise<void>` - Removes contact
- `handleStorageError(error: Error): void` - Handles quota/access errors

**Design Patterns**:
- **Repository Pattern** - Abstracts storage from business logic
- **Singleton** - Single instance manages all storage operations

**Design Decisions**:
1. LocalStorage for simplicity and synchronous API
2. In-memory cache reduces reads for better performance
3. Atomic operations prevent data corruption
4. Graceful error handling for quota/access issues

### ContactService

<!-- CRC: crc-ContactService.md -->

**Purpose**: Coordinate business logic and orchestrate interactions between components.

**Responsibilities**:
- Create new contacts with validation
- Update existing contacts with validation
- Delete contacts
- Retrieve single contact by ID
- Retrieve all contacts (sorted)
- Generate unique IDs for new contacts
- Manage created/modified timestamps

**Collaborates With**:
- Contact (creates and manipulates contact objects)
- ContactValidator (validates before operations)
- ContactStorage (persists and retrieves contacts)
- ContactListView (provides data to list)
- ContactDetailView (provides data to detail/edit)

**Key Methods**:
- `createContact(name, email?, phone?, notes?): Promise<Contact>`
- `updateContact(id, updates): Promise<Contact>`
- `deleteContact(id): Promise<void>`
- `getContact(id): Promise<Contact | null>`
- `getAllContacts(): Promise<Contact[]>`
- `generateId(): string` - UUID generation

**Design Patterns**:
- **Facade Pattern** - Simplifies interaction between UI and storage/validation
- **Dependency Injection** - Receives storage and validator dependencies

**Design Decisions**:
1. Service layer centralizes business logic
2. Validation before storage ensures data integrity
3. Auto-timestamp management handled by service
4. Always returns contacts sorted alphabetically by name

### ContactListView

<!-- CRC: crc-ContactListView.md -->

**Purpose**: Display all contacts in a browsable list with navigation to detail view.

**Responsibilities**:
- Render contact list HTML
- Load contacts from service
- Handle contact click (navigate to detail)
- Handle "Add Contact" click (navigate to create)
- Show empty state when no contacts
- Sort contacts alphabetically by name

**Collaborates With**:
- ContactService (retrieves contact list)
- ContactDetailView (navigates to detail view)
- Contact (displays contact data)

**Key Properties**:
- `contacts: Contact[]` - Current list to display
- `service: ContactService` - Reference to service
- `selectedContactId?: string` - Current selection

**Key Methods**:
- `render(): void` - Renders list HTML
- `loadContacts(): Promise<void>` - Loads from service
- `onContactClick(id): void` - Navigates to detail
- `onAddContactClick(): void` - Navigates to create
- `showEmptyState(): void` - Shows "no contacts" message
- `sortContactsByName(contacts): Contact[]` - Alphabetical sort

**Design Patterns**:
- **Observer Pattern** - Updates view when data changes
- **MVC Pattern** - View component in Model-View-Controller

**Design Decisions**:
1. List shows only name, email, phone for scannability
2. Entire row is clickable for better UX
3. Clear empty state message
4. Always sorted by name for predictability

### ContactDetailView

<!-- CRC: crc-ContactDetailView.md -->

**Purpose**: Handle contact creation, editing, and deletion with validation and user confirmations.

**Responsibilities**:
- Render contact form (create or edit mode)
- Load contact for editing
- Save contact with validation
- Delete contact with confirmation
- Cancel with unsaved change detection
- Track field changes and validate inline
- Display validation errors
- Confirm before discarding unsaved changes

**Collaborates With**:
- ContactService (creates, updates, deletes contacts)
- ContactValidator (validates field inputs)
- Contact (displays and edits data)
- ContactListView (navigates back to list)

**Key Properties**:
- `contact?: Contact` - Contact being edited (null for create)
- `service: ContactService` - Reference to service
- `validator: ContactValidator` - Reference to validator
- `isDirty: boolean` - Tracks unsaved changes
- `validationErrors: Map<string, string>` - Current errors by field
- `mode: 'create' | 'edit'` - Current operation mode

**Key Methods**:
- `render(): void` - Renders form HTML
- `loadContact(id): Promise<void>` - Loads for editing
- `onSaveClick(): Promise<void>` - Validates and saves
- `onCancelClick(): void` - Cancels (confirms if dirty)
- `onDeleteClick(): Promise<void>` - Deletes (with confirmation)
- `onFieldChange(field, value): void` - Tracks changes, validates
- `validateField(field, value): void` - Inline field validation
- `showValidationErrors(errors): void` - Displays errors
- `confirmUnsavedChanges(): Promise<boolean>` - Prompts before discard
- `confirmDelete(): Promise<boolean>` - Prompts before delete

**Design Patterns**:
- **State Pattern** - Different behavior for create vs edit modes
- **MVC Pattern** - View component with form handling

**Design Decisions**:
1. Inline validation provides immediate feedback
2. Dirty state tracking prevents accidental data loss
3. Confirmation dialogs protect against mistakes
4. Single form for create and edit reduces code duplication

## Design Patterns

### Repository Pattern

<!-- CRC: crc-ContactStorage.md -->

**Where Used**: ContactStorage

**Why**: Abstracts storage mechanism from business logic, making it easy to swap LocalStorage for another persistence layer (IndexedDB, API, etc.) without changing business logic.

**Implementation**: ContactStorage provides a consistent interface (save, get, delete) regardless of underlying storage mechanism.

**Benefits**:
- Business logic independent of storage details
- Easy to test with mock storage
- Can switch storage mechanisms without code changes
- Centralized error handling for storage operations

### Facade Pattern

<!-- CRC: crc-ContactService.md -->

**Where Used**: ContactService

**Why**: Simplifies complex interactions between UI, storage, and validation. UI components call simple service methods instead of orchestrating multiple components.

**Implementation**: ContactService coordinates Contact, ContactValidator, and ContactStorage, exposing simple create/update/delete methods to UI.

**Benefits**:
- UI code is simpler and cleaner
- Business logic centralized in one place
- Easier to test workflows
- Consistent behavior across UI components

### Value Object Pattern

<!-- CRC: crc-Contact.md -->

**Where Used**: Contact

**Why**: Contact represents a value with validation rules. Data integrity is enforced at the model level.

**Implementation**: Contact validates its own data, ensuring invalid contacts cannot exist.

**Benefits**:
- Validation logic close to data
- Cannot create invalid contacts
- Self-documenting data structure
- Type safety with TypeScript

### Strategy Pattern

<!-- CRC: crc-ContactValidator.md -->

**Where Used**: ContactValidator

**Why**: Each validation rule is independent and composable. Rules can be added or modified without affecting others.

**Implementation**: Separate methods for each field validation, combined in validateContact().

**Benefits**:
- Easy to add new validation rules
- Each rule tested independently
- Clear error messages per rule
- Reusable across different contexts (inline, on save)

### Observer Pattern

<!-- CRC: crc-ContactListView.md -->

**Where Used**: ContactListView

**Why**: View needs to update when contact data changes (after create, edit, delete).

**Implementation**: ListView reloads and re-renders when navigating back from detail view.

**Benefits**:
- UI stays synchronized with data
- Loose coupling between components
- Easy to add more observers if needed

### MVC Pattern

<!-- CRC: crc-ContactListView.md, crc-ContactDetailView.md -->

**Where Used**: ContactListView, ContactDetailView

**Why**: Separates data (Contact), presentation (views), and logic (ContactService).

**Implementation**:
- Model: Contact
- View: ContactListView, ContactDetailView
- Controller: ContactService

**Benefits**:
- Clear separation of concerns
- Business logic independent of UI
- Easy to change UI without affecting logic
- Multiple views can share same model

### Singleton Pattern

<!-- CRC: crc-ContactStorage.md -->

**Where Used**: ContactStorage

**Why**: Only one instance should manage storage to maintain consistent in-memory cache and avoid conflicts.

**Implementation**: Single ContactStorage instance shared across application.

**Benefits**:
- Consistent in-memory cache
- No synchronization conflicts
- Single source of truth for data

## Data Flow

### Create Contact Flow

<!-- Sequence: seq-create-contact.md -->

**Scenario**: User creates a new contact from the list view

**Flow Description**: User navigates to create form, fills in contact details with inline validation, and saves. The service validates, generates ID and timestamps, persists to storage, and returns to list view with success message.

**Sequence**:
```
User → ContactListView: Click "Add Contact"
ContactListView → ContactDetailView: Navigate to create mode
ContactDetailView: Render empty form
User → ContactDetailView: Fill in fields
ContactDetailView → ContactValidator: Validate each field (inline)
User → ContactDetailView: Click "Save"
ContactDetailView → ContactService: createContact(name, email, phone, notes)
ContactService → ContactValidator: validateContact()
ContactService: generateId() → UUID
ContactService: new Contact(id, data, timestamps)
ContactService → ContactStorage: saveContact(contact)
ContactStorage: Save to LocalStorage
ContactService ← ContactStorage: success
ContactDetailView ← ContactService: contact
ContactDetailView → ContactListView: Navigate back
ContactListView: Show success message
User ← ContactListView: Display updated list
```

**Error Handling**:
- Validation errors prevent save and display inline
- Storage errors show user-friendly message
- User input preserved on validation failure

**Key Interactions**:
- Inline validation provides immediate feedback
- Full validation before persistence
- ID and timestamps auto-generated by service
- Atomic save to prevent corruption

### Edit Contact Flow

<!-- Sequence: seq-edit-contact.md -->

**Scenario**: User modifies an existing contact

**Flow Description**: User clicks contact from list, system loads contact data into form, user modifies fields with inline validation and dirty state tracking, saves changes. Service validates, updates modified timestamp, persists to storage, and returns to list with success message.

**Sequence**:
```
User → ContactListView: Click contact
ContactListView → ContactDetailView: Navigate with contact ID
ContactDetailView → ContactService: loadContact(id)
ContactService → ContactStorage: getContact(id)
ContactStorage: Load from LocalStorage
ContactDetailView ← ContactService: contact
ContactDetailView: Render form with data
User → ContactDetailView: Modify fields
ContactDetailView: Set isDirty = true
ContactDetailView → ContactValidator: Validate fields (inline)
User → ContactDetailView: Click "Save"
ContactDetailView → ContactService: updateContact(id, updates)
ContactService → ContactValidator: validateContact()
ContactService: Update modified timestamp
ContactService → ContactStorage: saveContact(contact)
ContactStorage: Update LocalStorage
ContactDetailView ← ContactService: contact
ContactDetailView → ContactListView: Navigate back
ContactListView: Show success message
User ← ContactListView: Display updated list
```

**Error Handling**:
- Unsaved changes prompt if user clicks Cancel
- Validation errors prevent save
- Storage errors handled gracefully

**Key Interactions**:
- Load existing data from storage
- Dirty state tracking for unsaved change warnings
- Modified timestamp auto-updated on save
- Atomic update operation

### Delete Contact Flow

<!-- Sequence: seq-delete-contact.md -->

**Scenario**: User permanently removes a contact

**Flow Description**: User clicks Delete button, confirms deletion in dialog, service removes from storage, and user returns to list with success message.

**Sequence**:
```
User → ContactDetailView: Click "Delete"
ContactDetailView: Show confirmation dialog
User → ContactDetailView: Confirm deletion
ContactDetailView → ContactService: deleteContact(id)
ContactService → ContactStorage: deleteContact(id)
ContactStorage: Remove from LocalStorage
ContactDetailView ← ContactService: success
ContactDetailView → ContactListView: Navigate back
ContactListView: Show success message
User ← ContactListView: Display updated list
```

**Error Handling**:
- Confirmation prevents accidental deletion
- Storage errors show message
- No undo available (future enhancement)

**Key Interactions**:
- Confirmation dialog required
- Atomic deletion from storage
- Success message confirms action

### Load Contacts Flow

<!-- Sequence: seq-load-contacts.md -->

**Scenario**: User opens application or navigates to list view

**Flow Description**: Application initializes storage from LocalStorage, loads all contacts, sorts alphabetically, and renders list or empty state.

**Sequence**:
```
User → ContactListView: Open application
ContactListView → ContactService: Initialize
ContactService → ContactStorage: initialize()
ContactStorage: Load from LocalStorage
ContactService ← ContactStorage: contacts
ContactListView → ContactService: loadContacts()
ContactService → ContactStorage: getAllContacts()
ContactService: sortByName()
ContactListView ← ContactService: sorted contacts
ContactListView: Render list or empty state
User ← ContactListView: Display
```

**Error Handling**:
- Corrupted data detected and handled
- Storage access errors show message
- Empty state for zero contacts

**Key Interactions**:
- Storage initialization on app start
- Alphabetical sorting for predictability
- In-memory cache for performance
- Empty state handling

## UI Architecture

<!-- UI: ui-contact-list-view.md, ui-contact-detail-view.md, manifest-ui.md -->

### Global Patterns

**Source**: manifest-ui.md

**Validation Pattern**:
- Inline validation with immediate feedback
- Field-level error messages below inputs
- Prevent save until all errors corrected
- Preserve user input on validation failure

**Unsaved Change Detection**:
- Track dirty state on field changes
- Confirm before Cancel if dirty
- Confirm before navigation if dirty
- Dialog: "You have unsaved changes. Are you sure you want to leave?"

**Confirmation Dialogs**:
- Delete requires confirmation: "Are you sure you want to delete this contact? This cannot be undone."
- Cancel with unsaved changes requires confirmation

**Success Messages**:
- "Contact created successfully" (auto-dismiss after 3s)
- "Contact updated successfully"
- "Contact deleted successfully"

### Routes

| Route | View | Description |
|-------|------|-------------|
| `/` | ContactListView | Main contact list (default) |
| `/contact/new` | ContactDetailView | Create new contact |
| `/contact/:id` | ContactDetailView | View/edit existing contact |

**Browser Integration**:
- Back button navigates between views
- Direct URL navigation supported
- Page refresh preserves data (LocalStorage)

### View Hierarchy

```
ContactListView (/)
  ├─→ ContactDetailView (/contact/new) - "Add Contact" button
  └─→ ContactDetailView (/contact/:id) - Click contact row
        └─→ ContactListView (/) - Save/Cancel/Delete returns
```

### ContactListView Layout

<!-- UI: ui-contact-list-view.md -->

**Layout Structure**:
```
┌────────────────────────────────────────────────┐
│  Contact Manager                               │
│                                                │
│  [Add Contact]                                 │
├────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────┐ │
│  │ Alice Smith                              │ │
│  │ alice@example.com | 555-1234            │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ Bob Johnson                              │ │
│  │ bob@example.com | 555-5678              │ │
│  └──────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘
```

**Key Elements**:
- Header with application title
- "Add Contact" button (prominent)
- Scrollable contact list
- Each contact shows: name, email, phone
- Empty state: "No contacts yet. Click 'Add Contact' to get started"

**CSS Classes**:
- `.contact-list-container` - Main container
- `.contact-card` - Individual contact (clickable)
- `.contact-card:hover` - Hover state
- `.contact-name` - Name (larger, bold)
- `.contact-info` - Email | Phone (smaller, gray)
- `.empty-state` - Empty state message

### ContactDetailView Layout

<!-- UI: ui-contact-detail-view.md -->

**Layout Structure**:
```
┌────────────────────────────────────────────────┐
│  ← Back to List                                │
│                                                │
│  Edit Contact                                  │
├────────────────────────────────────────────────┤
│  Name *                                        │
│  [John Doe                              ]      │
│                                                │
│  Email                                         │
│  [john@example.com                      ]      │
│                                                │
│  Phone                                         │
│  [555-1234                              ]      │
│                                                │
│  Notes                                         │
│  [                                       ]     │
│  [                                       ]     │
│                                                │
│  [Save]  [Cancel]  [Delete]                    │
└────────────────────────────────────────────────┘
```

**With validation error**:
```
│  Email                                         │
│  [invalid-email                          ]     │
│  ⚠ Invalid email format                       │
```

**Key Elements**:
- Back link to return to list
- Title: "New Contact" or "Edit Contact"
- Form fields with labels (* for required)
- Inline validation error messages
- Action buttons: Save, Cancel, Delete (edit mode only)

**CSS Classes**:
- `.contact-detail-container` - Main container
- `.form-group` - Field group
- `.form-group.has-error` - Field with error
- `input.error` - Input with validation error
- `.field-error` - Error message (red)
- `.btn-save` - Primary save button
- `.btn-delete` - Destructive delete (red)

### Accessibility Requirements

<!-- Source: manifest-ui.md, coding-standards.md -->

**WCAG 2.1 Level AA Compliance**:
- Semantic HTML (`<button>`, `<label>`, `<input>`)
- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- Color contrast 4.5:1 for text
- Visible focus indicators
- Screen reader compatible

**Keyboard Shortcuts**:
- Tab: Navigate between fields/buttons
- Enter: Submit form, activate button, select contact
- Escape: Cancel form, close dialog

## Key Design Decisions

### Decision: Three-Layer Architecture

<!-- CRC: crc-ContactService.md, crc-ContactStorage.md -->

**Context**: Need clear separation between UI, business logic, and data access.

**Decision**: Implement three layers - UI (views), Service (business logic), Storage/Utilities (data access and validation).

**Rationale**:
- Separates concerns for maintainability
- Business logic independent of UI framework
- Easy to test each layer in isolation
- Follows SOLID principles

**Alternatives Considered**:
- Direct UI-to-Storage: Violates separation of concerns
- MVC only: Doesn't separate storage abstraction

**Trade-offs**:
- Gained: Testability, maintainability, flexibility
- Lost: Slight increase in code volume

### Decision: LocalStorage with In-Memory Cache

<!-- CRC: crc-ContactStorage.md -->

**Context**: Need local persistence without server dependency.

**Decision**: Use LocalStorage with in-memory Map cache.

**Rationale**:
- LocalStorage simple and widely supported
- Synchronous API simpler than IndexedDB
- In-memory cache improves read performance
- Suitable for contact-sized datasets

**Alternatives Considered**:
- IndexedDB: More complex, overkill for use case
- No caching: Slower performance
- SessionStorage: Data lost on tab close

**Trade-offs**:
- Gained: Simplicity, performance, persistence
- Lost: Storage size limit (~5-10MB), must sync cache

### Decision: Inline Validation with Dirty State

<!-- CRC: crc-ContactDetailView.md -->

**Context**: Users need immediate feedback on input errors.

**Decision**: Validate each field on change, track dirty state, confirm before discarding changes.

**Rationale**:
- Immediate feedback improves UX
- Dirty state prevents accidental data loss
- Reduces user frustration

**Alternatives Considered**:
- Validate on save only: Poor UX, late feedback
- No dirty tracking: Risk of accidental data loss

**Trade-offs**:
- Gained: Better UX, fewer errors, less frustration
- Lost: Slightly more complex form state management

### Decision: Facade Pattern for Service Layer

<!-- CRC: crc-ContactService.md -->

**Context**: UI components need simple interface to complex operations involving validation, ID generation, timestamps, and storage.

**Decision**: ContactService facade coordinates all operations.

**Rationale**:
- Simplifies UI code significantly
- Centralizes business logic
- Single place to modify workflows
- Easier testing

**Alternatives Considered**:
- UI orchestrates directly: Too complex, duplicated logic
- Multiple services: Adds complexity without benefit

**Trade-offs**:
- Gained: Simple UI, centralized logic, maintainability
- Lost: Additional abstraction layer

### Decision: Repository Pattern for Storage

<!-- CRC: crc-ContactStorage.md -->

**Context**: Storage mechanism might change (LocalStorage → IndexedDB → API).

**Decision**: Abstract storage behind repository interface.

**Rationale**:
- Easy to swap storage implementations
- Business logic independent of storage details
- Centralized error handling
- Easier to mock for testing

**Alternatives Considered**:
- Direct LocalStorage calls: Tight coupling
- No abstraction: Hard to change later

**Trade-offs**:
- Gained: Flexibility, testability, maintainability
- Lost: Additional abstraction

### Decision: UUID for Contact IDs

<!-- CRC: crc-Contact.md -->

**Context**: Need unique IDs without server/database.

**Decision**: Generate UUIDs on client side.

**Rationale**:
- No coordination needed (no database)
- Guaranteed uniqueness
- Works offline
- Standard format

**Alternatives Considered**:
- Auto-increment: Requires coordination
- Timestamp: Not guaranteed unique
- Random numbers: Risk of collisions

**Trade-offs**:
- Gained: Simplicity, uniqueness, offline support
- Lost: Longer IDs than integers

### Decision: Single Form for Create and Edit

<!-- CRC: crc-ContactDetailView.md -->

**Context**: Need UI for both creating and editing contacts.

**Decision**: Use single form component with mode flag.

**Rationale**:
- Reduces code duplication
- Consistent UX
- Single place to modify form
- Easier to maintain

**Alternatives Considered**:
- Separate components: Duplicated code and logic
- Dynamic form generation: Overcomplicated

**Trade-offs**:
- Gained: Less code, consistency, maintainability
- Lost: Slightly more complex mode handling

### Decision: Alphabetical Sorting

<!-- CRC: crc-ContactService.md -->

**Context**: Users need predictable contact order.

**Decision**: Always sort contacts alphabetically by name.

**Rationale**:
- Predictable and expected
- Easy to find contacts
- Standard convention
- Simple to implement

**Alternatives Considered**:
- Sort by created date: Less useful
- Sort by modified date: Confusing
- User-selectable: Adds complexity

**Trade-offs**:
- Gained: Predictability, usability
- Lost: Flexibility (could be future enhancement)

---

*Last updated: 2025-11-15*
*Source: CRC cards, sequences, and UI specifications in design/ directory*
