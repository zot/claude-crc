# ContactService

**Source Spec:** main.md (FR2: Create Contact, FR3: View Contact List, FR4: View/Edit Contact, FR5: Delete Contact)

## Responsibilities

### Knows
- `storage: ContactStorage` - Reference to storage layer
- `validator: ContactValidator` - Reference to validator

### Does
- `createContact(name: string, email?: string, phone?: string, notes?: string): Promise<Contact>` - Creates new contact with validation
- `updateContact(id: string, updates: Partial<Contact>): Promise<Contact>` - Updates existing contact with validation
- `deleteContact(id: string): Promise<void>` - Deletes contact with confirmation
- `getContact(id: string): Promise<Contact | null>` - Retrieves single contact
- `getAllContacts(): Promise<Contact[]>` - Retrieves all contacts sorted by name
- `generateId(): string` - Generates unique UUID for new contacts

## Collaborators

- **Contact** (src/models/Contact.ts) - Creates and manipulates contact objects
- **ContactValidator** (src/utils/ContactValidator.ts) - Validates contact data before operations
- **ContactStorage** (src/services/ContactStorage.ts) - Persists and retrieves contacts
- **ContactListView** (src/ui/ContactListView.ts) - Provides data to list view
- **ContactDetailView** (src/ui/ContactDetailView.ts) - Provides data to detail view

## Sequences

- seq-create-contact.md
- seq-edit-contact.md
- seq-delete-contact.md
- seq-load-contacts.md

## Related CRC Cards

- crc-Contact.md
- crc-ContactValidator.md
- crc-ContactStorage.md
- crc-ContactListView.md
- crc-ContactDetailView.md

## Design Patterns

- **Facade Pattern** - Simplifies interaction between UI and storage/validation
- **Dependency Injection** - Receives storage and validator dependencies

## Key Design Decisions

1. **Service layer** - Centralizes business logic and coordinates between components
2. **Validation before storage** - Ensures data integrity at service boundary
3. **Auto-timestamp management** - Service handles created/modified timestamps
4. **Sorted results** - Always returns contacts alphabetically by name
