# ContactStorage

**Source Spec:** main.md (FR6: Data Persistence)

## Responsibilities

### Knows
- `STORAGE_KEY: string` - LocalStorage key for contacts ("contacts")
- `contacts: Map<string, Contact>` - In-memory cache of contacts

### Does
- `initialize(): Promise<void>` - Loads contacts from LocalStorage on startup
- `saveContact(contact: Contact): Promise<void>` - Persists contact to LocalStorage
- `getContact(id: string): Promise<Contact | null>` - Retrieves single contact by ID
- `getAllContacts(): Promise<Contact[]>` - Retrieves all contacts
- `deleteContact(id: string): Promise<void>` - Removes contact from storage
- `handleStorageError(error: Error): void` - Handles quota exceeded and access denied errors

## Collaborators

- **Contact** (src/models/Contact.ts) - Stores and retrieves contact objects
- **ContactService** (src/services/ContactService.ts) - Receives storage operations from service layer

## Sequences

- seq-create-contact.md
- seq-edit-contact.md
- seq-delete-contact.md
- seq-load-contacts.md

## Related CRC Cards

- crc-Contact.md
- crc-ContactService.md

## Design Patterns

- **Repository Pattern** - Abstracts storage mechanism from business logic
- **Singleton** - Single instance manages all storage operations

## Key Design Decisions

1. **LocalStorage choice** - Simple, synchronous API for small dataset
2. **In-memory cache** - Reduces LocalStorage reads for better performance
3. **Atomic operations** - All-or-nothing saves to prevent corruption
4. **Error handling** - Graceful degradation for quota/access errors
